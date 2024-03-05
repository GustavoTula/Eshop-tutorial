// Importando React y los componentes necesarios para la página
import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllEvents from "../../components/Shop/AllEvents";

// Definiendo el componente funcional ShopAllEvents
const ShopAllEvents = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Encabezado del panel de control de la tienda */}
      <DashboardHeader />

      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="flex justify-between w-full">
        {/* Contenedor para la barra lateral del panel de control */}
        <div className="w-[80px] 800px:w-[330px]">
          {/* Componente de la barra lateral, con la pestaña activa indicada por 'active={5}' */}
          <DashboardSideBar active={5} />
        </div>

        {/* Contenedor para la sección principal de la página */}
        <div className="w-full justify-center flex">
          {/* Componente que muestra todos los eventos disponibles */}
          <AllEvents />
        </div>
      </div>
    </div>
  );
}

// Exportando el componente ShopAllEvents para su uso en otros archivos
export default ShopAllEvents;
