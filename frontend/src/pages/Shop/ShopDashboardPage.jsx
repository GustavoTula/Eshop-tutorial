// Importando React y los componentes necesarios para la página
import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHero from "../../components/Shop/DashboardHero";

// Definiendo el componente funcional ShopDashboardPage
const ShopDashboardPage = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Encabezado del panel de control de la tienda */}
      <DashboardHeader />

      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="flex items-start justify-between w-full">
        {/* Contenedor para la barra lateral del panel de control */}
        <div className="w-[80px] 800px:w-[330px]">
          {/* Componente de la barra lateral, con la pestaña activa indicada por 'active={1}' */}
          <DashboardSideBar active={1} />
        </div>

        {/* Componente principal del panel de control */}
        <DashboardHero />
      </div>
    </div>
  );
};

// Exportando el componente ShopDashboardPage para su uso en otros archivos
export default ShopDashboardPage;
