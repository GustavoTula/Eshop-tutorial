// Importaciones de React y los hooks necesarios para la funcionalidad del componente
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Importación de la acción que obtiene todas las órdenes de un usuario
import { getAllOrdersOfUser } from "../../redux/actions/order";

// Componente funcional que muestra el estado de seguimiento de una orden
const TrackOrder = () => {
  // Obtener las órdenes y el usuario del estado global utilizando el hook useSelector
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  // Inicializar el despachador de acciones de Redux
  const dispatch = useDispatch();

  // Obtener el parámetro de la URL que representa el ID de la orden a rastrear
  const { id } = useParams();

  // Efecto secundario que se ejecuta cuando el componente se monta
  useEffect(() => {
    // Llamar a la acción que obtiene todas las órdenes del usuario actual
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]); // Dependencia vacía para asegurar que el efecto se ejecute solo una vez al montar el componente

  // Filtrar la orden actual basándose en el ID proporcionado en la URL
  const data = orders && orders.find((item) => item._id === id);

  // Renderizado condicional basado en el estado de la orden actual
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {/* Mostrar mensajes según el estado de la orden */}
        {data && data?.status === "Processing" ? (
          <h1 className="text-[20px]">Your Order is processing in the shop.</h1>
        ) : data?.status === "Transferred to delivery partner" ? (
          <h1 className="text-[20px]">
            Your Order is on the way to the delivery partner.
          </h1>
        ) : data?.status === "Shipping" ? (
          <h1 className="text-[20px]">
            Your Order is on the way with our delivery partner.
          </h1>
        ) : data?.status === "Received" ? (
          <h1 className="text-[20px]">
            Your Order is in your city. Our Delivery man will deliver it.
          </h1>
        ) : data?.status === "On the way" ? (
          <h1 className="text-[20px]">
            Our Delivery man is going to deliver your order.
          </h1>
        ) : data?.status === "Delivered" ? (
          <h1 className="text-[20px]">Your order is delivered!</h1>
        ) : data?.status === "Processing refund" ? (
          <h1 className="text-[20px]">Your refund is processing!</h1>
        ) : data?.status === "Refund Success" ? (
          <h1 className="text-[20px]">Your Refund is success!</h1>
        ) : null}
      </>
    </div>
  );
};

// Exportar el componente para su uso en otras partes de la aplicación
export default TrackOrder;
