import axios from "axios";
import { server } from "../../server";

// Acción para obtener todas las órdenes de un usuario
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    // Despacha la acción "getAllOrdersUserRequest" indicando que se está realizando la solicitud de obtener todas las órdenes de un usuario
    dispatch({
      type: "getAllOrdersUserRequest",
    });

    // Realiza la solicitud para obtener todas las órdenes de un usuario y actualiza el estado en caso de éxito
    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    // En caso de error, despacha la acción "getAllOrdersUserFailed" con el mensaje de error
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data.message,
    });
  }
};

// Acción para obtener todas las órdenes de una tienda
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    // Despacha la acción "getAllOrdersShopRequest" indicando que se está realizando la solicitud de obtener todas las órdenes de una tienda
    dispatch({
      type: "getAllOrdersShopRequest",
    });

    // Realiza la solicitud para obtener todas las órdenes de una tienda y actualiza el estado en caso de éxito
    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`
    );

    dispatch({
      type: "getAllOrdersShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    // En caso de error, despacha la acción "getAllOrdersShopFailed" con el mensaje de error
    dispatch({
      type: "getAllOrdersShopFailed",
      payload: error.response.data.message,
    });
  }
};

// Acción para obtener todas las órdenes de un administrador
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    // Despacha la acción "adminAllOrdersRequest" indicando que se está realizando la solicitud de obtener todas las órdenes de un administrador
    dispatch({
      type: "adminAllOrdersRequest",
    });

    // Realiza la solicitud para obtener todas las órdenes de un administrador y actualiza el estado en caso de éxito
    const { data } = await axios.get(`${server}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    // En caso de error, despacha la acción "adminAllOrdersFailed" con el mensaje de error
    dispatch({
      type: "adminAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};
