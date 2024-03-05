import axios from "axios";
import { server } from "../../server";

// Acción para cargar la información del usuario
export const loadUser = () => async (dispatch) => {
  try {
    // Despacha la acción "LoadUserRequest" indicando que se está realizando la solicitud para cargar la información del usuario
    dispatch({
      type: "LoadUserRequest",
    });

    // Realiza la solicitud para obtener la información del usuario y actualiza el estado en caso de éxito
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    // En caso de error, despacha la acción "LoadUserFail" y proporciona el mensaje de error
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// Acción para cargar la información del vendedor
export const loadSeller = () => async (dispatch) => {
  try {
    // Despacha la acción "LoadSellerRequest" indicando que se está realizando la solicitud para cargar la información del vendedor
    dispatch({
      type: "LoadSellerRequest",
    });

    // Realiza la solicitud para obtener la información del vendedor y actualiza el estado en caso de éxito
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    // En caso de error, despacha la acción "LoadSellerFail" y proporciona el mensaje de error
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

// Acción para actualizar la información del usuario
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      // Despacha la acción "updateUserInfoRequest" indicando que se está realizando la solicitud para actualizar la información del usuario
      dispatch({
        type: "updateUserInfoRequest",
      });

      // Realiza la solicitud para actualizar la información del usuario y actualiza el estado en caso de éxito
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      // En caso de error, despacha la acción "updateUserInfoFailed" y proporciona el mensaje de error
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

// Acción para actualizar la dirección del usuario
export const updatUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      // Despacha la acción "updateUserAddressRequest" indicando que se está realizando la solicitud para actualizar la dirección del usuario
      dispatch({
        type: "updateUserAddressRequest",
      });

      // Realiza la solicitud para actualizar la dirección del usuario y actualiza el estado en caso de éxito
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated successfully!",
          user: data.user,
        },
      });
    } catch (error) {
      // En caso de error, despacha la acción "updateUserAddressFailed" y proporciona el mensaje de error
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

// Acción para eliminar la dirección del usuario
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    // Despacha la acción "deleteUserAddressRequest" indicando que se está realizando la solicitud para eliminar la dirección del usuario
    dispatch({
      type: "deleteUserAddressRequest",
    });

    // Realiza la solicitud para eliminar la dirección del usuario y actualiza el estado en caso de éxito
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    // En caso de error, despacha la acción "deleteUserAddressFailed" y proporciona el mensaje de error
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// Acción para obtener todos los usuarios (admin)
export const getAllUsers = () => async (dispatch) => {
  try {
    // Despacha la acción "getAllUsersRequest" indicando que se está realizando la solicitud para obtener todos los usuarios
    dispatch({
      type: "getAllUsersRequest",
    });

    // Realiza la solicitud para obtener todos los usuarios y actualiza el estado en caso de éxito
    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    // En caso de error, despacha la acción "getAllUsersFailed" y proporciona el mensaje de error
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};
