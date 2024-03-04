import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

// Componente funcional EventCard que representa una tarjeta de producto de evento.
const EventCard = ({ active, data }) => {
  // Obtener el estado del carrito utilizando el hook useSelector de Redux.
  const { cart } = useSelector((state) => state.cart);

  // Obtener la función dispatch de Redux para realizar acciones en el estado.
  const dispatch = useDispatch();

  // Función para manejar la adición de un artículo al carrito.
  const addToCartHandler = (data) => {
    // Verificar si el artículo ya está en el carrito.
    const isItemExists = cart && cart.find((i) => i._id === data._id);

    // Si el artículo ya está en el carrito, mostrar un mensaje de error.
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      // Si el artículo no está en el carrito, verificar si hay stock disponible.
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        // Crear un objeto de datos del carrito y despachar la acción para agregarlo al carrito.
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  // Renderizado del componente EventCard.
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      {/* Sección de imagen del producto */}
      <div className="w-full lg:-w[50%] m-auto">
        <img src={`${data.images[0]?.url}`} alt="" />
      </div>
      
      {/* Sección de detalles del producto */}
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        
        {/* Sección de precios y cantidad vendida */}
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>
        
        {/* Sección del contador de tiempo restante */}
        <CountDown data={data} />
        <br />
        
        {/* Sección de botones para ver detalles y agregar al carrito */}
        <div className="flex items-center">
          {/* Botón para ver detalles del producto */}
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          
          {/* Botón para agregar al carrito */}
          <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div>
        </div>
      </div>
    </div>
  );
};

// Exportar el componente EventCard.
export default EventCard;
