// Importa los módulos necesarios para la aplicación
const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// Configura CORS para permitir solicitudes desde http://localhost:3000 y permitir cookies
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Configura el uso de JSON en las solicitudes
app.use(express.json());

// Configura el uso de cookie-parser para manejar cookies en las solicitudes
app.use(cookieParser());

// Configura una ruta de prueba
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

// Configura el uso de body-parser para manejar datos codificados en la solicitud y establece un límite de 200mb
app.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));

// Configuración para cargar variables de entorno desde el archivo .env en desarrollo
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// Importa las rutas de los controladores
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");

// Configura las rutas para cada controlador
app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);

// Configuración para manejar errores utilizando el middleware ErrorHandler
app.use(ErrorHandler);

// Exporta la aplicación para su uso en otros módulos
module.exports = app;
