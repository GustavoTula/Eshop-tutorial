// Importando React y los componentes necesarios
import React from 'react';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import Payment from '../components/Payment/Payment';

// Definiendo el componente funcional PaymentPage
const PaymentPage = () => {
  // Renderizando la estructura de la página con encabezado, pasos de pago, componente Payment, y pie de página
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

// Exportando el componente PaymentPage para su uso en otros archivos
export default PaymentPage;
