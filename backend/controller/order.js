// Importar módulos necesarios
const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");

// Endpoint para crear una nueva orden
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener datos de la solicitud
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      // Agrupar los elementos del carrito por shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // Crear una orden para cada tienda
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para obtener todas las órdenes de un usuario
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todas las órdenes de un usuario
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para obtener todas las órdenes de un vendedor
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todas las órdenes de un vendedor
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para actualizar el estado de la orden para el vendedor
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener la orden por su ID
      const order = await Order.findById(req.params.id);

      if (!order) {
        // Si la orden no existe, devolver un error
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        // Actualizar el stock y la cantidad vendida para cada producto en la orden
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      // Actualizar el estado de la orden
      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        // Actualizar la fecha de entrega y el estado del pago
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        // Calcular la comisión del servicio y actualizar el saldo del vendedor
        const serviceCharge = order.totalPrice * 0.10;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      // Guardar la orden actualizada en la base de datos
      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      // Función para actualizar el stock y la cantidad vendida de un producto
      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      // Función para actualizar la información del vendedor
      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);
        
        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para solicitar un reembolso (usuario)
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener la orden por su ID
      const order = await Order.findById(req.params.id);

      if (!order) {
        // Si la orden no existe, devolver un error
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      // Actualizar el estado de la orden
      order.status = req.body.status;

      // Guardar la orden actualizada en la base de datos
      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para aceptar el reembolso (vendedor)
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener la orden por su ID
      const order = await Order.findById(req.params.id);

      if (!order) {
        // Si la orden no existe, devolver un error
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      // Actualizar el estado de la orden
      order.status = req.body.status;

      // Guardar la orden actualizada en la base de datos
      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successful!",
      });

      if (req.body.status === "Refund Success") {
        // Actualizar el stock y la cantidad vendida para cada producto en la orden
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      // Función para actualizar el stock y la cantidad vendida de un producto
      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint para obtener todas las órdenes (admin)
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todas las órdenes, ordenadas por fecha de entrega y creación
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Exportar el enrutador de Express
module.exports = router;
