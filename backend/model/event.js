// Este módulo define el esquema de datos para eventos de productos utilizando Mongoose, un ODM para MongoDB.

const mongoose = require("mongoose");

// Define el esquema para los eventos de productos utilizando la API de Schema proporcionada por Mongoose.
const eventSchema = new mongoose.Schema({
    // Nombre del evento del producto.
    name:{
        type: String,
        required:[true,"Please enter your event product name!"],
    },
    // Descripción del evento del producto.
    description:{
        type: String,
        required:[true,"Please enter your event product description!"],
    },
    // Categoría del evento del producto.
    category:{
        type: String,
        required:[true,"Please enter your event product category!"],
    },
    // Fecha de inicio del evento.
    start_Date: {
        type: Date,
        required: true,
    },
    // Fecha de finalización del evento.
    Finish_Date: {
        type: Date,
        required: true,
    },
    // Estado actual del evento, por defecto "Running".
    status: {
        type: String,
        default: "Running",
    },
    // Etiquetas del evento del producto.
    tags:{
        type: String,
    },
    // Precio original del producto antes del descuento.
    originalPrice:{
        type: Number,
    },
    // Precio del producto durante el evento, obligatorio.
    discountPrice:{
        type: Number,
        required: [true,"Please enter your event product price!"],
    },
    // Stock disponible del producto durante el evento, obligatorio.
    stock:{
        type: Number,
        required: [true,"Please enter your event product stock!"],
    },
    // Imágenes asociadas al evento del producto.
    images:[
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    // ID de la tienda asociada al evento, obligatorio.
    shopId:{
        type: String,
        required: true,
    },
    // Datos de la tienda asociada al evento, obligatorio.
    shop:{
        type: Object,
        required: true,
    },
    // Cantidad de productos agotados durante el evento, por defecto 0.
    sold_out:{
        type: Number,
        default: 0,
    },
    // Fecha de creación del evento, con valor predeterminado de la fecha y hora actual.
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

// Exporta el modelo del evento creado a partir del esquema definido.
module.exports = mongoose.model("Event", eventSchema);
