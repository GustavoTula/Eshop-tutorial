// Importando React y los componentes necesarios para la página
import React from "react";
import Footer from "../../components/Layout/Footer";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

// Definiendo el componente funcional ShopSettingsPage
const ShopSettingsPage = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Encabezado del panel de control de la tienda */}
      <DashboardHeader />

      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="flex items-start justify-between w-full">
        {/* Contenedor para la barra lateral del panel de control */}
        <div className="w-[80px] 800px:w-[330px]">
          {/* Componente de la barra lateral, con la pestaña activa indicada por 'active={11}' */}
          <DashboardSideBar active={11} />
        </div>

        {/* Componente principal de la página, que muestra la configuración de la tienda */}
        <ShopSettings />
      </div>

      {/* Componente del pie de página */}
      <Footer />
    </div>
  );
};

// Exportando el componente ShopSettingsPage para su uso en otros archivos
export default ShopSettingsPage;
