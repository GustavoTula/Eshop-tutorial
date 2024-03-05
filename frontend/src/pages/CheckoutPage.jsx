// Importando React y los componentes necesarios
import React from 'react';
import Header from '../components/Layout/Header';
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Checkout from "../components/Checkout/Checkout";
import Footer from '../components/Layout/Footer';

// Definiendo el componente funcional CheckoutPage
const CheckoutPage = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Componente de encabezado */}
      <Header />
      <br />
      <br />
      {/* Componente de pasos del proceso de pago con la categoría activa indicada por 'active={1}' */}
      <CheckoutSteps active={1} />
      {/* Componente principal del proceso de pago */}
      <Checkout />
      <br />
      <br />
      {/* Componente de pie de página */}
      <Footer />
    </div>
  );
}

// Exportando el componente CheckoutPage para su uso en otros archivos
export default CheckoutPage;
