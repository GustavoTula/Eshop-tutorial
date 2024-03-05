// Importando React y los componentes necesarios
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import UserOrderDetails from "../components/UserOrderDetails";

// Definiendo el componente funcional OrderDetailsPage
const OrderDetailsPage = () => {
  // Renderizando la estructura de la página con el encabezado, detalles del pedido y pie de página
  return (
    <div>
      <Header />
      <UserOrderDetails />
      <Footer />
    </div>
  );
}

// Exportando el componente OrderDetailsPage para su uso en otros archivos
export default OrderDetailsPage;
