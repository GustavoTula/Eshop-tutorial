// Este módulo define el esquema de datos para los mensajes en una conversación mediante Mongoose, un ODM para MongoDB.

const mongoose = require("mongoose");

// Define el esquema para los mensajes utilizando la API de Schema proporcionada por Mongoose.
const messagesSchema = new mongoose.Schema(
  {
    // Identificador de la conversación a la que pertenece el mensaje.
    conversationId: {
      type: String,
    },
    // Contenido del texto del mensaje.
    text: {
      type: String,
    },
    // Remitente del mensaje.
    sender: {
      type: String,
    },
    // Imágenes asociadas al mensaje, incluyendo su identificador público y URL.
    images: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  // Configuración adicional para incluir marcas de tiempo de creación y actualización.
  { timestamps: true }
);

// Exporta el modelo de mensajes creado a partir del esquema definido.
module.exports = mongoose.model("Messages", messagesSchema);
