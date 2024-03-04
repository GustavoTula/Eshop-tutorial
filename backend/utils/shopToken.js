// Módulo para crear un token y guardarlo en las cookies del vendedor
const sendShopToken = (user, statusCode, res) => {
  // Obtiene el token utilizando el método getJwtToken del objeto de usuario
  const token = user.getJwtToken();

  // Opciones para las cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  // Establece la respuesta con el código de estado, guarda la cookie llamada "seller_token" con el token y envía la respuesta JSON
  res.status(statusCode).cookie("seller_token", token, options).json({
    success: true,
    user,
    token,
  });
};

// Exporta la función sendShopToken para que pueda ser utilizada en otros módulos
module.exports = sendShopToken;

