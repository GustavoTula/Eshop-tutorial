// Importando React y los componentes necesarios para la página
import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import Footer from '../../components/Layout/Footer';
import OrderDetails from "../../components/Shop/OrderDetails";

// Definiendo el componente funcional ShopOrderDetails
const ShopOrderDetails = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Encabezado del panel de control de la tienda */}
      <DashboardHeader />

      {/* Componente que muestra los detalles del pedido */}
      <OrderDetails />

      {/* Componente del pie de página */}
      <Footer />
    </div>
  );
}

// Exportando el componente ShopOrderDetails para su uso en otros archivos
export default ShopOrderDetails;
