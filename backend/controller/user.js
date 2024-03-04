// Importar módulos necesarios
const express = require("express");
const User = require("../model/user");
const router = express.Router();
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Endpoint para crear un usuario
router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // Subir la imagen del avatar a Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    // Crear un objeto para representar al usuario
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    // Crear un token de activación para el usuario
    const activationToken = createActivationToken(user);

    // Construir la URL de activación
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    // Enviar un correo electrónico con el enlace de activación
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Función para crear un token de activación
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Endpoint para activar al usuario mediante un token
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      // Verificar el token de activación
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      // Extraer la información del usuario desde el token
      const { name, email, password, avatar } = newUser;

      // Verificar si ya existe un usuario con el mismo correo electrónico
      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      // Crear el usuario
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      // Enviar el token del usuario
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para iniciar sesión del usuario
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields!", 400));
      }

      // Buscar al usuario por correo electrónico
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      // Verificar la contraseña
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      // Enviar el token del usuario
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para obtener información del usuario
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener información del usuario actual
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      // Responder con la información del usuario
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para cerrar sesión del usuario
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Limpiar la cookie del token del usuario
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      // Responder con éxito
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para actualizar la información del usuario
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener la información actualizada del usuario desde la solicitud
      const { email, password, phoneNumber, name } = req.body;

      // Buscar al usuario por correo electrónico y verificar la contraseña
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      // Actualizar la información del usuario
      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      // Guardar los cambios
      await user.save();

      // Responder con éxito y la información del usuario actualizada
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para actualizar el avatar del usuario
router.put(
  "/update-avatar",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener al usuario actual
      let existsUser = await User.findById(req.user.id);

      // Verificar si se proporcionó un avatar en la solicitud
      if (req.body.avatar !== "") {
        // Eliminar la imagen de avatar anterior de Cloudinary
        const imageId = existsUser.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        // Subir la nueva imagen a Cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
        });

        // Actualizar la imagen de avatar del usuario
        existsUser.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      // Guardar los cambios
      await existsUser.save();

      // Responder con éxito y la información del usuario actualizado
      res.status(200).json({
        success: true,
        user: existsUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para actualizar las direcciones del usuario
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener al usuario actual
      const user = await User.findById(req.user.id);

      // Buscar una dirección con el mismo tipo
      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );

      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      // Buscar una dirección existente por ID
      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        // Actualizar la dirección existente con la nueva información
        Object.assign(existsAddress, req.body);
      } else {
        // Agregar la nueva dirección al array
        user.addresses.push(req.body);
      }

      // Guardar los cambios
      await user.save();

      // Responder con éxito y la información del usuario actualizado
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para eliminar una dirección del usuario
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener el ID del usuario y el ID de la dirección
      const userId = req.user._id;
      const addressId = req.params.id;

      // Actualizar el usuario eliminando la dirección
      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      // Obtener la información actualizada del usuario
      const user = await User.findById(userId);

      // Responder con éxito y la información del usuario actualizado
      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para actualizar la contraseña del usuario
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener al usuario actual y verificar la contraseña anterior
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      // Verificar si las contraseñas nuevas coinciden
      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler(
            "Password doesn't match with each other!",
            400
          )
        );
      }

      // Actualizar la contraseña del usuario
      user.password = req.body.newPassword;

      // Guardar los cambios
      await user.save();

      // Responder con éxito
      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para obtener información de un usuario por su ID
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Buscar y obtener información de un usuario por su ID
      const user = await User.findById(req.params.id);

      // Responder con éxito y la información del usuario
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para obtener todos los usuarios (solo para admin)
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todos los usuarios ordenados por fecha de creación
      const users = await User.find().sort({
        createdAt: -1,
      });

      // Responder con éxito y la lista de usuarios
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para eliminar un usuario (solo para admin)
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Buscar y eliminar un usuario por su ID
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler("User is not available with this id", 400)
        );
      }

      // Eliminar la imagen de avatar de Cloudinary
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);

      // Eliminar el usuario
      await User.findByIdAndDelete(req.params.id);

      // Responder con éxito
      res.status(201).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Exportar el router
module.exports = router;
