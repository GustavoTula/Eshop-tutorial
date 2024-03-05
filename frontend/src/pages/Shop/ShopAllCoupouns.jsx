// Importando React y los componentes necesarios para la página
import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllCoupons from "../../components/Shop/AllCoupons";

// Definiendo el componente funcional ShopAllCoupouns
const ShopAllCoupouns = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Encabezado del panel de control de la tienda */}
      <DashboardHeader />

      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="flex justify-between w-full">
        {/* Contenedor para la barra lateral del panel de control */}
        <div className="w-[80px] 800px:w-[330px]">
          {/* Componente de la barra lateral, con la pestaña activa indicada por 'active={9}' */}
          <DashboardSideBar active={9} />
        </div>

        {/* Contenedor para la sección principal de la página */}
        <div className="w-full justify-center flex">
          {/* Componente que muestra todos los cupones disponibles */}
          <AllCoupons />
        </div>
      </div>
    </div>
  );
}

// Exportando el componente ShopAllCoupouns para su uso en otros archivos
export default ShopAllCoupouns;
