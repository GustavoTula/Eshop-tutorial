// Este módulo define el esquema de datos para los pedidos mediante Mongoose, un ODM para MongoDB.

const mongoose = require("mongoose");

// Define el esquema para los pedidos utilizando la API de Schema proporcionada por Mongoose.
const orderSchema = new mongoose.Schema({
    // Contenido del carrito de compras asociado al pedido.
    cart:{
        type: Array,
        required: true,
    },
    // Información de la dirección de envío del pedido.
    shippingAddress:{
        type: Object,
        required: true,
    },
    // Información del usuario que realizó el pedido.
    user:{
        type: Object,
        required: true,
    },
    // Precio total del pedido.
    totalPrice:{
        type: Number,
        required: true,
    },
    // Estado actual del pedido, con un valor predeterminado de "Processing" (Procesando).
    status:{
        type: String,
        default: "Processing",
    },
    // Información relacionada con el pago del pedido, incluyendo identificador, estado y tipo.
    paymentInfo:{
        id:{
            type: String,
        },
        status: {
            type: String,
        },
        type:{
            type: String,
        },
    },
    // Fecha y hora de pago del pedido, con un valor predeterminado de la fecha actual.
    paidAt:{
        type: Date,
        default: Date.now(),
    },
    // Fecha y hora de entrega del pedido.
    deliveredAt: {
        type: Date,
    },
    // Fecha y hora de creación del pedido, con un valor predeterminado de la fecha actual.
    createdAt:{
        type: Date,
        default: Date.now(),
    },
});

// Exporta el modelo de pedidos creado a partir del esquema definido.
module.exports = mongoose.model("Order", orderSchema);
