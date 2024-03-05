import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";

// Componente funcional "DashboardHeader" que representa la barra superior del panel de control
const DashboardHeader = () => {
  // Obtiene el estado del vendedor desde Redux
  const { seller } = useSelector((state) => state.seller);

  return (
    // Contenedor principal de la barra superior con estilos y propiedades visuales
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      {/* Logo de la aplicación con enlace a la página principal del panel de control */}
      <div>
        <Link to="/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>
      
      {/* Sección de iconos y enlaces para diversas secciones del panel de control */}
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {/* Icono y enlace para cupones */}
          <Link to="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          {/* Icono y enlace para ofertas */}
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          {/* Icono y enlace para productos */}
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          {/* Icono y enlace para pedidos */}
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>

          {/* Icono y enlace para mensajes */}
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          {/* Enlace al perfil del vendedor con su avatar */}
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Exporta el componente "DashboardHeader" para que pueda ser utilizado en otros archivos
export default DashboardHeader;
