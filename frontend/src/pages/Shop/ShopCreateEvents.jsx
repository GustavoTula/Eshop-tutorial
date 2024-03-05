// Importando React y los componentes necesarios para la página
import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import CreateEvent from "../../components/Shop/CreateEvent";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';

// Definiendo el componente funcional ShopCreateEvents
const ShopCreateEvents = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Encabezado del panel de control de la tienda */}
      <DashboardHeader />

      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="flex items-center justify-between w-full">
        {/* Contenedor para la barra lateral del panel de control */}
        <div className="w-[330px]">
          {/* Componente de la barra lateral, con la pestaña activa indicada por 'active={6}' */}
          <DashboardSideBar active={6} />
        </div>

        {/* Contenedor para la sección principal de la página */}
        <div className="w-full justify-center flex">
          {/* Componente para la creación de eventos */}
          <CreateEvent />
        </div>
      </div>
    </div>
  );
}

// Exportando el componente ShopCreateEvents para su uso en otros archivos
export default ShopCreateEvents;
