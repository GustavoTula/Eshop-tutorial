// Acción para agregar un elemento al carrito
export const addTocart = (data) => async (dispatch, getState) => {
  // Despacha la acción "addToCart" con el nuevo elemento
  dispatch({
    type: "addToCart",
    payload: data,
  });

  // Actualiza el almacenamiento local con el carrito actualizado
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  
  // Devuelve el nuevo elemento agregado al carrito
  return data;
};

// Acción para remover un elemento del carrito
export const removeFromCart = (data) => async (dispatch, getState) => {
  // Despacha la acción "removeFromCart" con el id del elemento a eliminar
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });

  // Actualiza el almacenamiento local con el carrito actualizado
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  
  // Devuelve el elemento eliminado del carrito
  return data;
};

