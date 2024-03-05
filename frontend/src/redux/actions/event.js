// Importando dependencias necesarias
import axios from "axios";
import { server } from "../../server";

// Acción para crear un nuevo evento
export const createevent = (data) => async (dispatch) => {
  try {
    // Despachando una acción para indicar la solicitud de creación de evento
    dispatch({
      type: "eventCreateRequest",
    });

    // Realizando una solicitud a la API para crear un nuevo evento
    const { data: responseData } = await axios.post(
      `${server}/event/create-event`,
      data
    );

    // Despachando una acción al crear exitosamente un evento
    dispatch({
      type: "eventCreateSuccess",
      payload: responseData.event,
    });
  } catch (error) {
    // Despachando una acción en caso de error durante la creación del evento
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// Acción para obtener todos los eventos de una tienda específica
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    // Despachando una acción para indicar la solicitud de obtener todos los eventos de una tienda
    dispatch({
      type: "getAlleventsShopRequest",
    });

    // Realizando una solicitud a la API para recuperar todos los eventos de una tienda
    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);

    // Despachando una acción al obtener exitosamente todos los eventos de una tienda
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    // Despachando una acción en caso de error durante la solicitud de obtener todos los eventos de una tienda
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// Acción para eliminar un evento de una tienda
export const deleteEvent = (id) => async (dispatch) => {
  try {
    // Despachando una acción para indicar la solicitud de eliminar un evento
    dispatch({
      type: "deleteeventRequest",
    });

    // Realizando una solicitud a la API para eliminar un evento de una tienda
    const { data } = await axios.delete(`${server}/event/delete-shop-event/${id}`, {
      withCredentials: true,
    });

    // Despachando una acción al eliminar exitosamente un evento
    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
    });
  } catch (error) {
    // Despachando una acción en caso de error durante la solicitud de eliminar un evento
    dispatch({
      type: "deleteeventFailed",
      payload: error.response.data.message,
    });
  }
};

// Acción para obtener todos los eventos
export const getAllEvents = () => async (dispatch) => {
  try {
    // Despachando una acción para indicar la solicitud de obtener todos los eventos
    dispatch({
      type: "getAlleventsRequest",
    });

    // Realizando una solicitud a la API para recuperar todos los eventos
    const { data } = await axios.get(`${server}/event/get-all-events`);

    // Despachando una acción al obtener exitosamente todos los eventos
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    // Despachando una acción en caso de error durante la solicitud de obtener todos los eventos
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};
