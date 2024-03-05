// Importando React y los componentes necesarios para la página
import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import CreateProduct from "../../components/Shop/CreateProduct";

// Definiendo el componente funcional ShopCreateProduct
const ShopCreateProduct = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Encabezado del panel de control de la tienda */}
      <DashboardHeader />

      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="flex items-center justify-between w-full">
        {/* Contenedor para la barra lateral del panel de control */}
        <div className="w-[80px] 800px:w-[330px]">
          {/* Componente de la barra lateral, con la pestaña activa indicada por 'active={4}' */}
          <DashboardSideBar active={4} />
        </div>

        {/* Contenedor para la sección principal de la página */}
        <div className="w-full justify-center flex">
          {/* Componente para la creación de productos */}
          <CreateProduct />
        </div>
      </div>
    </div>
  );
}

// Exportando el componente ShopCreateProduct para su uso en otros archivos
export default ShopCreateProduct;
