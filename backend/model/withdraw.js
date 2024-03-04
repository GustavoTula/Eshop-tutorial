// Este módulo define el esquema de datos para las solicitudes de retiro utilizando Mongoose, un ODM para MongoDB.
const mongoose = require("mongoose");

// Define el esquema para las solicitudes de retiro utilizando la API de Schema proporcionada por Mongoose.
const withdrawSchema = new mongoose.Schema({
  // Objeto que representa al vendedor asociado con la solicitud de retiro, es obligatorio.
  seller: {
    type: Object,
    required: true,
  },
  // Monto de la solicitud de retiro, es obligatorio.
  amount: {
    type: Number,
    required: true,
  },
  // Estado de la solicitud de retiro con un valor predeterminado de "Processing".
  status: {
    type: String,
    default: "Processing",
  },
  // Fecha y hora de creación de la solicitud de retiro, con un valor predeterminado de la fecha actual.
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // Fecha y hora de actualización de la solicitud de retiro.
  updatedAt: {
    type: Date,
  }
});

// Exporta el modelo de solicitud de retiro creado a partir del esquema definido.
module.exports = mongoose.model("Withdraw", withdrawSchema);
