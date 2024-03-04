// Importar la biblioteca mongoose para interactuar con MongoDB
const mongoose = require("mongoose");

// Función para conectar la base de datos MongoDB
const connectDatabase = () => {
  // Intentar establecer la conexión con la base de datos usando la URL proporcionada en las variables de entorno
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,          // Configuración para el nuevo intérprete de URL
      useUnifiedTopology: true,       // Configuración para el nuevo motor de administración de conexiones
    })
    .then((data) => {
      // En caso de éxito, imprimir un mensaje indicando que la conexión se ha establecido
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      // En caso de error, imprimir un mensaje indicando que no se pudo establecer la conexión y mostrar el error
      console.error("MongoDB connection failed:", error.message);
    });
};

// Exportar la función connectDatabase para su uso en otros archivos
module.exports = connectDatabase;
