// Importar módulos necesarios
const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");

// Endpoint para crear una tienda
router.post("/create-shop", catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // Subir la imagen del avatar a Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
    });

    // Crear un objeto para representar la tienda
    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    // Crear un token de activación para la tienda
    const activationToken = createActivationToken(seller);

    // Construir la URL de activación
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    // Enviar un correo electrónico con el enlace de activación
    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email - ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));

// Función para crear un token de activación
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Endpoint para activar la tienda mediante un token
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      // Verificar el token de activación
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      // Extraer la información de la tienda desde el token
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      // Verificar si ya existe un usuario con el mismo correo electrónico
      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      // Crear la tienda
      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      // Enviar el token de la tienda
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para iniciar sesión en la tienda
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields!", 400));
      }

      // Buscar la tienda por correo electrónico
      const user = await Shop.findOne({ email }).select("+password");

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

      // Enviar el token de la tienda
      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para obtener información de la tienda
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener información de la tienda actual
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      // Responder con la información de la tienda
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para cerrar sesión en la tienda
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Limpiar la cookie del token de la tienda
      res.cookie("seller_token", null, {
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

// Endpoint para obtener información de una tienda por su ID
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener información de una tienda por su ID
      const shop = await Shop.findById(req.params.id);

      // Responder con la información de la tienda
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para actualizar la imagen de perfil de la tienda
router.put(
  "/update-shop-avatar",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener la tienda actual
      let existsSeller = await Shop.findById(req.seller._id);

      // Destruir la imagen anterior en Cloudinary
      const imageId = existsSeller.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);

      // Subir la nueva imagen a Cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      // Actualizar la imagen de la tienda
      existsSeller.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      // Guardar los cambios
      await existsSeller.save();

      // Responder con éxito y la tienda actualizada
      res.status(200).json({
        success: true,
        seller: existsSeller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para actualizar la información de la tienda
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener la información actualizada de la tienda desde la solicitud
      const { name, description, address, phoneNumber, zipCode } = req.body;

      // Obtener la tienda actual
      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      // Actualizar la información de la tienda
      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      // Guardar los cambios
      await shop.save();

      // Responder con éxito y la tienda actualizada
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para obtener todas las tiendas (solo para admin)
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todas las tiendas ordenadas por fecha de creación
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });

      // Responder con éxito y la lista de tiendas
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para eliminar una tienda (solo para admin)
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Buscar y eliminar una tienda por su ID
      const seller = await Shop.findByIdAndDelete(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler("Seller is not available with this id", 400)
        );
      }

      // Responder con éxito
      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para actualizar los métodos de retiro del vendedor
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener el método de retiro actualizado desde la solicitud
      const { withdrawMethod } = req.body;

      // Actualizar el método de retiro en la tienda
      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      // Responder con éxito y la tienda actualizada
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para eliminar los métodos de retiro del vendedor (solo para el vendedor)
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener la tienda actual
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      // Eliminar el método de retiro
      seller.withdrawMethod = null;

      // Guardar los cambios
      await seller.save();

      // Responder con éxito y la tienda actualizada
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
