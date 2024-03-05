// Acción para agregar a la lista de deseos
export const addToWishlist = (data) => async (dispatch, getState) => {
  // Despacha la acción "addToWishlist" con los datos proporcionados
  dispatch({
    type: "addToWishlist",
    payload: data,
  });

  // Actualiza la información en el almacenamiento local con los elementos de la lista de deseos actualizados
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
  
  // Retorna los datos agregados a la lista de deseos
  return data;
};

// Acción para remover de la lista de deseos
export const removeFromWishlist = (data) => async (dispatch, getState) => {
  // Despacha la acción "removeFromWishlist" con el ID proporcionado
  dispatch({
    type: "removeFromWishlist",
    payload: data._id,
  });

  // Actualiza la información en el almacenamiento local con los elementos de la lista de deseos actualizados
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));

  // Retorna los datos removidos de la lista de deseos
  return data;
};
