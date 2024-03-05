import { createReducer } from "@reduxjs/toolkit";

// Estado inicial del carrito obtenido del almacenamiento local o un array vacío
const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

// Reductor del carrito creado con createReducer de Redux Toolkit
export const cartReducer = createReducer(initialState, {
  // Acción para agregar al carrito
  addToCart: (state, action) => {
    const item = action.payload;
    // Verifica si el ítem ya está en el carrito
    const isItemExist = state.cart.find((i) => i._id === item._id);
    if (isItemExist) {
      // Si el ítem ya existe, actualiza la cantidad del ítem en el carrito
      return {
        ...state,
        cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
      };
    } else {
      // Si el ítem no existe, agrega el nuevo ítem al carrito
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  },

  // Acción para remover del carrito
  removeFromCart: (state, action) => {
    // Remueve el ítem con el ID proporcionado del carrito
    return {
      ...state,
      cart: state.cart.filter((i) => i._id !== action.payload),
    };
  },
});
