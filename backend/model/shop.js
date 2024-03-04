// Este módulo define el esquema de datos para las tiendas utilizando Mongoose, un ODM para MongoDB.
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define el esquema para las tiendas utilizando la API de Schema proporcionada por Mongoose.
const shopSchema = new mongoose.Schema({
  // Nombre de la tienda, obligatorio.
  name: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  // Correo electrónico de la tienda, obligatorio.
  email: {
    type: String,
    required: [true, "Please enter your shop email address"],
  },
  // Contraseña de la tienda, obligatoria, con reglas de longitud y no seleccionable para evitar su exposición.
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  // Descripción de la tienda.
  description: {
    type: String,
  },
  // Dirección de la tienda, obligatoria.
  address: {
    type: String,
    required: true,
  },
  // Número de teléfono de la tienda, obligatorio.
  phoneNumber: {
    type: Number,
    required: true,
  },
  // Rol de la tienda, con un valor predeterminado de "Seller".
  role: {
    type: String,
    default: "Seller",
  },
  // Avatar de la tienda con un identificador público y una URL.
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
  // Código postal de la tienda, obligatorio.
  zipCode: {
    type: Number,
    required: true,
  },
  // Método de retiro de fondos de la tienda, almacenado como un objeto.
  withdrawMethod: {
    type: Object,
  },
  // Saldo disponible en la tienda, con un valor predeterminado de 0.
  availableBalance: {
    type: Number,
    default: 0,
  },
  // Transacciones realizadas por la tienda, cada una con información sobre la cantidad, estado y fechas relevantes.
  transections: [
    {
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        default: "Processing",
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
      },
    },
  ],
  // Fecha y hora de creación de la tienda, con un valor predeterminado de la fecha actual.
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // Token para restablecer la contraseña de la tienda.
  resetPasswordToken: String,
  // Tiempo de restablecimiento de la contraseña.
  resetPasswordTime: Date,
});

// Middleware previo a la acción de guardar para cifrar la contraseña antes de almacenarla.
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Método para generar un token JWT para la tienda.
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Método para comparar la contraseña ingresada con la almacenada en la tienda.
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Exporta el modelo de tienda creado a partir del esquema definido.
module.exports = mongoose.model("Shop", shopSchema);
