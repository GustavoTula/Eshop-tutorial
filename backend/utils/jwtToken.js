// Función para crear un token y guardarlo en las cookies
const sendToken = (user, statusCode, res) => {
  // Obtiene el token utilizando el método getJwtToken del objeto de usuario.
  const token = user.getJwtToken();

  // Opciones para las cookies
  const options = {
    // Configura la expiración del token en 90 días a partir de la fecha actual.
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    // Establece la propiedad httpOnly para mejorar la seguridad al acceder a las cookies solo a través de HTTP.
    httpOnly: true,
    // Configura sameSite como "none" para permitir el envío de cookies en solicitudes desde diferentes sitios.
    sameSite: "none",
    // Establece la propiedad secure para garantizar que las cookies solo se envíen a través de conexiones seguras (HTTPS).
    secure: true,
  };

  // Envía una respuesta con el código de estado proporcionado, establece la cookie "token" y devuelve información adicional.
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

// Exporta la función sendToken para que pueda ser utilizada en otros módulos.
module.exports = sendToken;
