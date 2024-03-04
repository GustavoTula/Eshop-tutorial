// Importar módulos necesarios
const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const cloudinary = require("cloudinary");

// Endpoint para crear un evento
router.post(
  "/create-event",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener el ID de la tienda desde la solicitud
      const shopId = req.body.shopId;
      
      // Verificar si la tienda existe
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        // Procesar las imágenes utilizando Cloudinary
        let images = [];
        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        // Actualizar la información del evento con los enlaces de las imágenes y la tienda
        const eventData = req.body;
        eventData.images = imagesLinks;
        eventData.shop = shop;

        // Crear el evento
        const event = await Event.create(eventData);

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para obtener todos los eventos
router.get("/get-all-events", async (req, res, next) => {
  try {
    // Obtener todos los eventos
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    // Manejar errores y devolver una respuesta adecuada
    return next(new ErrorHandler(error, 400));
  }
});

// Endpoint para obtener todos los eventos de una tienda
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todos los eventos de una tienda
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para eliminar un evento de una tienda
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener el evento por su ID
      const event = await Event.findById(req.params.id);

      if (!event) {
        // Si el evento no existe, devolver un error
        return next(new ErrorHandler("Event is not found with this id", 404));
      }

      // Eliminar las imágenes de Cloudinary
      for (let i = 0; i < event.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          event.images[i].public_id
        );
      }

      // Eliminar el evento
      await event.remove();

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para obtener todos los eventos (solo para el administrador)
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todos los eventos ordenados por fecha de creación
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Exportar el enrutador de Express
module.exports = router;

