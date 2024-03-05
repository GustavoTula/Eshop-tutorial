import axios from "axios";
import { server } from "../../server";

// Acción para obtener todos los vendedores (admin)
export const getAllSellers = () => async (dispatch) => {
  try {
    // Despacha la acción "getAllSellersRequest" indicando que se está realizando la solicitud para obtener todos los vendedores
    dispatch({
      type: "getAllSellersRequest",
    });

    // Realiza la solicitud para obtener todos los vendedores y actualiza el estado en caso de éxito
    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    // En caso de error, despacha la acción "getAllSellerFailed"
    dispatch({
      type: "getAllSellerFailed",
      // payload: error.response.data.message,
    });
  }
};

