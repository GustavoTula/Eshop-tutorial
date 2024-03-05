// Importando React y los componentes necesarios
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import TrackOrder from '../components/Profile/TrackOrder';

// Definiendo el componente funcional TrackOrderPage
const TrackOrderPage = () => {
  // Renderizando el componente TrackOrderPage con los componentes Header, TrackOrder y Footer
  return (
    <div>
      <Header />
      <TrackOrder />
      <Footer />
    </div>
  );
};

// Exportando el componente TrackOrderPage para su uso en otros archivos
export default TrackOrderPage;
