// Este módulo define el esquema de datos para los productos mediante Mongoose, un ODM para MongoDB.

const mongoose = require("mongoose");

// Define el esquema para los productos utilizando la API de Schema proporcionada por Mongoose.
const productSchema = new mongoose.Schema({
  // Nombre del producto, obligatorio.
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  // Descripción del producto, obligatoria.
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  // Categoría del producto, obligatoria.
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  // Etiquetas adicionales del producto.
  tags: {
    type: String,
  },
  // Precio original del producto.
  originalPrice: {
    type: Number,
  },
  // Precio del producto con descuento, obligatorio.
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  // Stock disponible del producto, obligatorio.
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  // Imágenes del producto, cada una con un identificador público y una URL.
  images: [
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
  // Reseñas del producto, cada una con información del usuario, calificación, comentario, ID del producto y fecha de creación.
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt:{
        type: Date,
        default: Date.now(),
      }
    },
  ],
  // Calificación global del producto.
  ratings: {
    type: Number,
  },
  // ID de la tienda a la que pertenece el producto, obligatorio.
  shopId: {
    type: String,
    required: true,
  },
  // Información de la tienda a la que pertenece el producto, obligatoria.
  shop: {
    type: Object,
    required: true,
  },
  // Cantidad vendida del producto, con un valor predeterminado de 0.
  sold_out: {
    type: Number,
    default: 0,
  },
  // Fecha y hora de creación del producto, con un valor predeterminado de la fecha actual.
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Exporta el modelo de productos creado a partir del esquema definido.
module.exports = mongoose.model("Product", productSchema);
