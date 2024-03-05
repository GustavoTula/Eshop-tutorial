import { createReducer } from "@reduxjs/toolkit";

// Estado inicial del reductor de vendedores
const initialState = {
  isLoading: true,
};

// Reductor de vendedores creado con createReducer de Redux Toolkit
export const sellerReducer = createReducer(initialState, {
  // Acciones para cargar la información del vendedor
  LoadSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSeller = false;
  },

  // Acciones para obtener todos los vendedores (administrador)
  getAllSellersRequest: (state) => {
    state.isLoading = true;
  },
  getAllSellersSuccess: (state, action) => {
    state.isLoading = false;
    state.sellers = action.payload;
  },
  getAllSellerFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Acción para limpiar errores
  clearErrors: (state) => {
    state.error = null;
  },
});
