// Importar módulos necesarios
const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Importar la biblioteca de Stripe y configurarla con la clave secreta
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Endpoint para procesar el pago utilizando Stripe
router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    // Crear un objeto de pago con la información proporcionada
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Becodemy",
      },
    });

    // Devolver la respuesta con el secreto del cliente para confirmar el pago en el lado del cliente
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

// Endpoint para obtener la clave de la API de Stripe
router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    // Devolver la clave de la API de Stripe en la respuesta
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

// Exportar el enrutador de Express
module.exports = router;
