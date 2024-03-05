import { createReducer } from "@reduxjs/toolkit";

// Estado inicial del reductor de pedidos
const initialState = {
  isLoading: true,
};

// Reductor de pedidos creado con createReducer de Redux Toolkit
export const orderReducer = createReducer(initialState, {
  // Acciones para obtener todos los pedidos de un usuario
  getAllOrdersUserRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersUserSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  // Acciones para obtener todos los pedidos de una tienda
  getAllOrdersShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersShopSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Acciones para obtener todos los pedidos para el administrador
  adminAllOrdersRequest: (state) => {
    state.adminOrderLoading = true;
  },
  adminAllOrdersSuccess: (state, action) => {
    state.adminOrderLoading = false;
    state.adminOrders = action.payload;
  },
  adminAllOrdersFailed: (state, action) => {
    state.adminOrderLoading = false;
    state.error = action.payload;
  },

  // Acción para limpiar errores
  clearErrors: (state) => {
    state.error = null;
  },
});
