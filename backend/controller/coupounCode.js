// Importar módulos necesarios
const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCode");

// Crear un enrutador de Express
const router = express.Router();

// Endpoint para crear un código de cupón
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Verificar si el código de cupón ya existe
      const isCoupounCodeExists = await CoupounCode.find({
        name: req.body.name,
      });

      if (isCoupounCodeExists.length !== 0) {
        // Si ya existe, devolver un error
        return next(new ErrorHandler("Coupon code already exists!", 400));
      }

      // Crear el código de cupón
      const coupounCode = await CoupounCode.create(req.body);

      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para obtener todos los cupones de una tienda
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todos los códigos de cupón de una tienda
      const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para eliminar un código de cupón de una tienda
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Eliminar un código de cupón por su ID
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        // Si el código de cupón no existe, devolver un error
        return next(new ErrorHandler("Coupon code doesn't exist!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para obtener el valor de un código de cupón por su nombre
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener el valor de un código de cupón por su nombre
      const couponCode = await CoupounCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Exportar el enrutador de Express
module.exports = router;
