// Importar módulos y bibliotecas necesarias
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

// Middleware para verificar si el usuario está autenticado
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    // Obtener el token de las cookies de la solicitud
    const { token } = req.cookies;

    // Verificar si el token no está presente en las cookies
    if (!token) {
        // Lanzar un error indicando que el usuario debe iniciar sesión para continuar
        return next(new ErrorHandler("Please login to continue", 401));
    }

    // Decodificar el token usando la clave secreta JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Buscar al usuario correspondiente en la base de datos utilizando el ID extraído del token
    req.user = await User.findById(decoded.id);

    // Llamar a la función next() para pasar al siguiente middleware o ruta
    next();
});

// Middleware para verificar si el usuario es un vendedor
exports.isSeller = catchAsyncErrors(async (req, res, next) => {
    // Obtener el token de vendedor de las cookies de la solicitud
    const { seller_token } = req.cookies;

    // Verificar si el token de vendedor no está presente en las cookies
    if (!seller_token) {
        // Lanzar un error indicando que el vendedor debe iniciar sesión para continuar
        return next(new ErrorHandler("Please login to continue", 401));
    }

    // Decodificar el token de vendedor usando la clave secreta JWT
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    // Buscar al vendedor correspondiente en la base de datos utilizando el ID extraído del token
    req.seller = await Shop.findById(decoded.id);

    // Llamar a la función next() para pasar al siguiente middleware o ruta
    next();
});

// Middleware para verificar si el usuario tiene un rol de administrador
exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        // Verificar si el rol del usuario no está incluido en la lista de roles permitidos
        if (!roles.includes(req.user.role)) {
            // Lanzar un error indicando que el usuario no tiene acceso a estos recursos
            return next(new ErrorHandler(`${req.user.role} can not access this resources!`));
        }
        // Llamar a la función next() para pasar al siguiente middleware o ruta
        next();
    };
};
