// Este módulo define el esquema de datos para códigos de cupón utilizando Mongoose, un ODM para MongoDB.

const mongoose = require("mongoose");

// Define el esquema para los códigos de cupón utilizando la API de Schema proporcionada por Mongoose.
const coupounCodeSchema = new mongoose.Schema({
    // Nombre del código de cupón.
    name: {
        type: String,
        required: [true, "Please enter your coupoun code name!"],
        unique: true, // Asegura que el nombre del código de cupón sea único en la base de datos.
    },
    // Valor del cupón, generalmente un monto o porcentaje de descuento.
    value: {
        type: Number,
        required: true,
    },
    // Monto mínimo requerido para que el cupón sea válido.
    minAmount: {
        type: Number,
    },
    // Monto máximo al que se aplica el cupón.
    maxAmount: {
        type: Number,
    },
    // ID de la tienda asociada al cupón.
    shopId: {
        type: String,
        required: true,
    },
    // Producto específico al que se aplica el cupón, si es aplicable.
    selectedProduct: {
        type: String,
    },
    // Fecha de creación del código de cupón, con valor predeterminado de la fecha y hora actual.
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

// Exporta el modelo del código de cupón creado a partir del esquema definido.
module.exports = mongoose.model("CoupounCode", coupounCodeSchema);
