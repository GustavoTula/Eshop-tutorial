// Importar los módulos necesarios
const Conversation = require("../model/conversation");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { isSeller, isAuthenticated } = require("../middleware/auth");

// Crear un enrutador de Express
const router = express.Router();

// Endpoint para crear una nueva conversación
router.post(
  "/create-new-conversation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener datos de la solicitud
      const { groupTitle, userId, sellerId } = req.body;

      // Verificar si la conversación ya existe
      const isConversationExist = await Conversation.findOne({ groupTitle });

      if (isConversationExist) {
        // Si existe, devolver la conversación existente
        const conversation = isConversationExist;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        // Si no existe, crear una nueva conversación
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.response.message), 500);
    }
  })
);

// Endpoint para obtener conversaciones del vendedor
router.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todas las conversaciones del vendedor
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error), 500);
    }
  })
);

// Endpoint para obtener conversaciones del usuario
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todas las conversaciones del usuario
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error), 500);
    }
  })
);

// Endpoint para actualizar el último mensaje de una conversación
router.put(
  "/update-last-message/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener datos de la solicitud
      const { lastMessage, lastMessageId } = req.body;

      // Actualizar el último mensaje de la conversación
      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error), 500);
    }
  })
);

// Exportar el enrutador de Express
module.exports = router;

