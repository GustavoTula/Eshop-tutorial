// Importando React y los componentes necesarios para la página
import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import DashboardMessages from "../../components/Shop/DashboardMessages";

// Definiendo el componente funcional ShopInboxPage
const ShopInboxPage = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Encabezado del panel de control de la tienda */}
      <DashboardHeader />

      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="flex items-start justify-between w-full">
        {/* Contenedor para la barra lateral del panel de control */}
        <div className="w-[80px] 800px:w-[330px]">
          {/* Componente de la barra lateral, con la pestaña activa indicada por 'active={8}' */}
          <DashboardSideBar active={8} />
        </div>

        {/* Componente principal de la página, que muestra los mensajes del panel de control */}
        <DashboardMessages />
      </div>
    </div>
  );
}

// Exportando el componente ShopInboxPage para su uso en otros archivos
export default ShopInboxPage;
