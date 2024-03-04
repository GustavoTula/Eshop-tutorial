// Este módulo es un controlador de errores personalizado para manejar y formatear errores en la aplicación Express.
// Se ejecuta cada vez que un middleware o controlador llama a 'next(err)'.

const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  // Establece un código de estado predeterminado de 500 y un mensaje de error predeterminado si no se proporcionan.
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // Error de identificación incorrecta de MongoDB
  if (err.name === "CastError") {
    // Formatea un nuevo error usando el ErrorHandler para un manejo consistente.
    const message = `Resource not found with this id. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Error de clave duplicada en MongoDB
  if (err.code === 11000) {
    // Formatea un nuevo error usando el ErrorHandler para un manejo consistente.
    const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Error de token JWT incorrecto
  if (err.name === "JsonWebTokenError") {
    // Formatea un nuevo error usando el ErrorHandler para un manejo consistente.
    const message = `Your URL is invalid, please try again later`;
    err = new ErrorHandler(message, 400);
  }

  // Token JWT expirado
  if (err.name === "TokenExpiredError") {
    // Formatea un nuevo error usando el ErrorHandler para un manejo consistente.
    const message = `Your URL has expired, please try again later`;
    err = new ErrorHandler(message, 400);
  }

  // Responde al cliente con el código de estado y mensaje apropiados.
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
