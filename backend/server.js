// Importa la aplicación Express y las funciones necesarias
const app = require("./app");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");

// Manejo de excepciones no capturadas
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
});

// Configuración en entorno de desarrollo
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// Conecta con la base de datos
connectDatabase();

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Crea el servidor
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});

// Rechazo de promesa no manejado
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  // Cierra el servidor y finaliza el proceso
  server.close(() => {
    process.exit(1);
  });
});
