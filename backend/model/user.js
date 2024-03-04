// Este módulo define el esquema de datos para los usuarios utilizando Mongoose, un ODM para MongoDB.
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define el esquema para los usuarios utilizando la API de Schema proporcionada por Mongoose.
const userSchema = new mongoose.Schema({
  // Nombre del usuario, obligatorio.
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  // Correo electrónico del usuario, obligatorio.
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  // Contraseña del usuario, obligatoria, con reglas de longitud y no seleccionable para evitar su exposición.
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  // Número de teléfono del usuario.
  phoneNumber: {
    type: Number,
  },
  // Direcciones del usuario, almacenadas como un array de objetos con información detallada sobre cada dirección.
  addresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
      addressType: {
        type: String,
      },
    }
  ],
  // Rol del usuario con un valor predeterminado de "user".
  role: {
    type: String,
    default: "user",
  },
  // Avatar del usuario con un identificador público y una URL.
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  // Fecha y hora de creación del usuario, con un valor predeterminado de la fecha actual.
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // Token para restablecer la contraseña del usuario.
  resetPasswordToken: String,
  // Tiempo de restablecimiento de la contraseña.
  resetPasswordTime: Date,
});

// Middleware previo a la acción de guardar para cifrar la contraseña antes de almacenarla.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Método para generar un token JWT para el usuario.
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Método para comparar la contraseña ingresada con la almacenada en el usuario.
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Exporta el modelo de usuario creado a partir del esquema definido.
module.exports = mongoose.model("User", userSchema);
