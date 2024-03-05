import axios from "axios";
import { server } from "../../server";

// Acción para crear un producto
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      // Despacha la acción "productCreateRequest" indicando que se está realizando la solicitud para crear un producto
      dispatch({
        type: "productCreateRequest",
      });

      // Realiza la solicitud para crear un producto y actualiza el estado en caso de éxito
      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      // En caso de error, despacha la acción "productCreateFail" con el mensaje de error
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// Acción para obtener todos los productos de una tienda
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    // Despacha la acción "getAllProductsShopRequest" indicando que se está realizando la solicitud para obtener todos los productos de una tienda
    dispatch({
      type: "getAllProductsShopRequest",
    });

    // Realiza la solicitud para obtener todos los productos de una tienda y actualiza el estado en caso de éxito
    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    // En caso de error, despacha la acción "getAllProductsShopFailed" con el mensaje de error
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// Acción para eliminar un producto de una tienda
export const deleteProduct = (id) => async (dispatch) => {
  try {
    // Despacha la acción "deleteProductRequest" indicando que se está realizando la solicitud para eliminar un producto de una tienda
    dispatch({
      type: "deleteProductRequest",
    });

    // Realiza la solicitud para eliminar un producto de una tienda y actualiza el estado en caso de éxito
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    // En caso de error, despacha la acción "deleteProductFailed" con el mensaje de error
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// Acción para obtener todos los productos
export const getAllProducts = () => async (dispatch) => {
  try {
    // Despacha la acción "getAllProductsRequest" indicando que se está realizando la solicitud para obtener todos los productos
    dispatch({
      type: "getAllProductsRequest",
    });

    // Realiza la solicitud para obtener todos los productos y actualiza el estado en caso de éxito
    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    // En caso de error, despacha la acción "getAllProductsFailed" con el mensaje de error
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
