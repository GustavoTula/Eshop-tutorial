// Importando React y los componentes necesarios
import React from 'react';
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";

// Definiendo el componente funcional HomePage
const HomePage = () => {
  return (
    // Div principal que envuelve la página de inicio
    <div>
      {/* Componente de encabezado con la categoría activa */}
      <Header activeHeading={1} />
      
      {/* Componentes de diferentes secciones de la página de inicio */}
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      
      {/* Componente de pie de página */}
      <Footer />
    </div>
  );
}

// Exportando el componente HomePage para su uso en otros archivos
export default HomePage;
