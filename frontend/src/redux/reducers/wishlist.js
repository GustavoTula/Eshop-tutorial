import { createReducer } from "@reduxjs/toolkit";

// Estado inicial del reductor de lista de deseos
const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

// Reductor de lista de deseos creado con createReducer de Redux Toolkit
export const wishlistReducer = createReducer(initialState, {
  // Acción para agregar a la lista de deseos
  addToWishlist: (state, action) => {
    const item = action.payload;
    const isItemExist = state.wishlist.find((i) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        wishlist: state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        ),
      };
    } else {
      return {
        ...state,
        wishlist: [...state.wishlist, item],
      };
    }
  },

  // Acción para eliminar de la lista de deseos
  removeFromWishlist: (state, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((i) => i._id !== action.payload),
    };
  },
});
