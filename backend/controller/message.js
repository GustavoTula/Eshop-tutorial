// Importar módulos necesarios
const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const cloudinary = require("cloudinary");
const router = express.Router();

// Endpoint para crear un nuevo mensaje
router.post(
  "/create-new-message",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener los datos del mensaje desde la solicitud
      const messageData = req.body;

      // Subir imágenes a Cloudinary si están presentes en la solicitud
      if (req.body.images) {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
          folder: "messages",
        });
        messageData.images = {
          public_id: myCloud.public_id,
          url: myCloud.url,
        };
      }

      // Crear un nuevo mensaje
      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      // Guardar el mensaje en la base de datos
      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

// Endpoint para obtener todos los mensajes con un ID de conversación dado
router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todos los mensajes con un ID de conversación dado
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

// Exportar el enrutador de Express
module.exports = router;

