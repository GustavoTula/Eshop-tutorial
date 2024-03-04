// Importar módulos necesarios
const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

// Endpoint para crear un nuevo producto
router.post(
  "/create-product",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Validar la existencia de la tienda asociada al producto
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        // Procesar y subir las imágenes del producto a Cloudinary
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
      
        // Crear el producto con la información proporcionada
        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;

        const product = await Product.create(productData);

        // Responder con el éxito y el producto creado
        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para obtener todos los productos de una tienda
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todos los productos de una tienda específica
      const products = await Product.find({ shopId: req.params.id });

      // Responder con el éxito y los productos encontrados
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para eliminar un producto de una tienda
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener y eliminar un producto específico, eliminando también sus imágenes de Cloudinary
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }    

      for (let i = 0; 1 < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          product.images[i].public_id
        );
      }
    
      await product.remove();

      // Responder con el éxito y un mensaje indicando que el producto fue eliminado
      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para obtener todos los productos
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todos los productos, ordenados por fecha de creación
      const products = await Product.find().sort({ createdAt: -1 });

      // Responder con el éxito y los productos encontrados
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para crear una nueva revisión para un producto
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener la información necesaria para crear una revisión
      const { user, rating, comment, productId, orderId } = req.body;

      // Obtener el producto asociado a la revisión
      const product = await Product.findById(productId);

      // Crear la revisión
      const review = {
        user,
        rating,
        comment,
        productId,
      };

      // Verificar si el usuario ya ha revisado el producto y actualizar la revisión si es necesario
      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      // Calcular el nuevo promedio de calificaciones del producto
      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      // Guardar el producto actualizado
      await product.save({ validateBeforeSave: false });

      // Marcar la orden como revisada
      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      // Responder con el éxito y un mensaje indicando que la revisión fue creada exitosamente
      res.status(200).json({
        success: true,
        message: "Reviewed successfully!",
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Endpoint para obtener todos los productos (para administradores)
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Obtener todos los productos, ordenados por fecha de creación
      const products = await Product.find().sort({
        createdAt: -1,
      });
      // Responder con el éxito y los productos encontrados
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      // Manejar errores y devolver una respuesta adecuada
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Exportar el enrutador de Express
module.exports = router;
