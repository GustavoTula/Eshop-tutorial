// Esta clase personalizada, ErrorHandler, extiende la clase Error de JavaScript.
class ErrorHandler extends Error {
    // Constructor de la clase que toma un mensaje de error y un código de estado HTTP.
    constructor(message, statusCode) {
        // Llama al constructor de la clase Error con el mensaje de error proporcionado.
        super(message);
        // Almacena el código de estado HTTP en la instancia de la clase.
        this.statusCode = statusCode;

        // Captura la pila de llamadas para obtener información sobre dónde se originó el error.
        Error.captureStackTrace(this, this.constructor);
    }
}

// Exporta la clase ErrorHandler para que pueda ser utilizada en otros módulos.
module.exports = ErrorHandler;
