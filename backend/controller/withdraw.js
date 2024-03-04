const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const Withdraw = require("../model/withdraw");
const sendMail = require("../utils/sendMail");
const router = express.Router();

// Crear solicitud de retiro - solo para vendedores
router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;

      // Datos de la solicitud de retiro
      const data = {
        seller: req.seller,
        amount,
      };

      try {
        // Enviar correo electrónico de confirmación al vendedor
        await sendMail({
          email: req.seller.email,
          subject: "Withdraw Request",
          message: `Hello ${req.seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3 to 7 days for processing!`,
        });
        res.status(201).json({
          success: true,
        });
      } catch (error) {
        // Manejar errores al enviar el correo electrónico
        return next(new ErrorHandler(error.message, 500));
      }

      // Crear la solicitud de retiro en la base de datos
      const withdraw = await Withdraw.create(data);

      // Actualizar el saldo disponible en la tienda del vendedor
      const shop = await Shop.findById(req.seller._id);
      shop.availableBalance = shop.availableBalance - amount;
      await shop.save();

      // Responder con éxito y los detalles de la solicitud de retiro
      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      // Manejar otros errores
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Obtener todas las solicitudes de retiro - solo para admin
router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todas las solicitudes de retiro ordenadas por fecha de creación
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      // Responder con éxito y la lista de solicitudes de retiro
      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      // Manejar errores al obtener las solicitudes de retiro
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Actualizar solicitud de retiro - solo para admin
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId } = req.body;

      // Actualizar la solicitud de retiro en la base de datos
      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      // Obtener la tienda del vendedor asociado con la solicitud de retiro
      const seller = await Shop.findById(sellerId);

      // Crear un objeto de transacción para el historial de transacciones del vendedor
      const transection = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      // Agregar la transacción al historial de transacciones del vendedor
      seller.transections = [...seller.transections, transection];
      await seller.save();

      try {
        // Enviar correo electrónico de confirmación al vendedor
        await sendMail({
          email: seller.email,
          subject: "Payment confirmation",
          message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules, usually takes 3 to 7 days.`,
        });
      } catch (error) {
        // Manejar errores al enviar el correo electrónico
        return next(new ErrorHandler(error.message, 500));
      }

      // Responder con éxito y los detalles de la solicitud de retiro actualizada
      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      // Manejar otros errores
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Exportar el router para su uso en la aplicación
module.exports = router;
