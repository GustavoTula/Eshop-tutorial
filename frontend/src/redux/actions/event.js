import axios from "axios";
import { server } from "../../server";

// Acción para crear un evento
export const createEvent = (data) => async (dispatch) => {
  try {
    // Despacha la acción "eventCreateRequest" indicando que se está realizando la solicitud de creación de evento
    dispatch({
      type: "eventCreateRequest",
    });

    // Realiza la solicitud para crear un evento y actualiza el estado en caso de éxito
    const { data: responseData } = await axios.post(`${server}/event/create-event`, data);
    dispatch({
      type: "eventCreateSuccess",
      payload: responseData.event,
    });
  } catch (error) {
    // En caso de error, despacha la acción "eventCreateFail" con el mensaje de error
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// Acción para obtener todos los eventos de una tienda
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    // Despacha la acción "getAlleventsShopRequest" indicando que se está realizando la solicitud de obtener todos los eventos de una tienda
    dispatch({
      type: "getAlleventsShopRequest",
    });

    // Realiza la solicitud para obtener todos los eventos de una tienda y actualiza el estado en caso de éxito
    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    // En caso de error, despacha la acción "getAlleventsShopFailed" con el mensaje de error
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// Acción para eliminar un evento de una tienda
export const deleteEvent = (id) => async (dispatch) => {
  try {
    // Despacha la acción "deleteeventRequest" indicando que se está realizando la solicitud de eliminación de evento
    dispatch({
      type: "deleteeventRequest",
    });

    // Realiza la solicitud para eliminar un evento de una tienda y actualiza el estado en caso de éxito
    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
    });
  } catch (error) {
    // En caso de error, despacha la acción "deleteeventFailed" con el mensaje de error
    dispatch({
      type: "deleteeventFailed",
      payload: error.response.data.message,
    });
  }
};

// Acción para obtener todos los eventos
export const getAllEvents = () => async (dispatch) => {
  try {
    // Despacha la acción "getAlleventsRequest" indicando que se está realizando la solicitud de obtener todos los eventos
    dispatch({
      type: "getAlleventsRequest",
    });

    // Realiza la solicitud para obtener todos los eventos y actualiza el estado en caso de éxito
    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    // En caso de error, despacha la acción "getAlleventsFailed" con el mensaje de error
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};
