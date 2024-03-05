import { createReducer } from "@reduxjs/toolkit";

// Estado inicial del reductor de eventos
const initialState = {
  isLoading: true,
};

// Reductor de eventos creado con createReducer de Redux Toolkit
export const eventReducer = createReducer(initialState, {
  // Acciones para la creación de eventos
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  eventCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Acciones para obtener todos los eventos de una tienda
  getAlleventsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAlleventsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Acciones para eliminar un evento de una tienda
  deleteeventRequest: (state) => {
    state.isLoading = true;
  },
  deleteeventSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteeventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Acciones para obtener todos los eventos
  getAlleventsRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAlleventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Acción para limpiar errores
  clearErrors: (state) => {
    state.error = null;
  },
});
