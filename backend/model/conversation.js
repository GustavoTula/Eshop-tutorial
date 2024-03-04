// Este módulo define el esquema de datos de las conversaciones utilizando Mongoose, un ODM para MongoDB.
const mongoose = require("mongoose");

// Define el esquema de la conversación utilizando la API de Schema proporcionada por Mongoose.
const conversationSchema = new mongoose.Schema(
  {
    // Título del grupo de conversación, si es un chat grupal.
    groupTitle: {
      type: String,
    },
    // Lista de miembros/participantes en la conversación, almacenados como un array.
    members: {
      type: Array,
    },
    // Último mensaje enviado en la conversación.
    lastMessage: {
      type: String,
    },
    // ID del último mensaje enviado en la conversación.
    lastMessageId: {
      type: String,
    },
  },
  { timestamps: true } // Habilita el registro automático de las marcas de tiempo createdAt y updatedAt.
);

// Exporta el modelo de la conversación creado a partir del esquema definido.
module.exports = mongoose.model("Conversation", conversationSchema);
