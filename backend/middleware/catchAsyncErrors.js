module.exports = (theFunc) => (req, res, next) => {
  // Promise.resolve() envuelve la llamada a 'theFunc' en una Promesa.
  // Esto asegura que cualquier valor devuelto por 'theFunc' se maneje como una Promesa.

  Promise.resolve(theFunc(req, res, next)).catch(next);
  // La función se ejecuta, y si hay algún error en la Promesa resultante, se envía al siguiente middleware o controlador de errores (next).
  // Esto garantiza un manejo adecuado de errores para funciones asíncronas.
};