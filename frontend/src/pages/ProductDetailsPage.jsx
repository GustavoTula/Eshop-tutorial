// Importando React y los hooks necesarios desde React Router y Redux
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import ProductDetails from '../components/Products/ProductDetails';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useSelector } from 'react-redux';

// Definiendo el componente funcional ProductDetailsPage
const ProductDetailsPage = () => {
  // Obteniendo datos del estado global utilizando el hook useSelector de Redux
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);

  // Obteniendo el parámetro de la URL correspondiente al ID del producto o evento
  const { id } = useParams();

  // Definiendo estados locales para almacenar los datos del producto o evento y para manejar la presencia del parámetro "isEvent"
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get('isEvent');

  // Efecto secundario para actualizar el estado local "data" basado en la presencia del parámetro "isEvent" y la búsqueda en los arrays de productos o eventos
  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents, eventData, id]);

  // Renderizando la estructura de la página con encabezado, detalles del producto, productos sugeridos (si no es un evento) y pie de página
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};

// Exportando el componente ProductDetailsPage para su uso en otros archivos
export default ProductDetailsPage;
