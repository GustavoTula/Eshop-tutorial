// Importando React y los hooks necesarios
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// Importando componentes y estilos necesarios
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";

// Definiendo el componente funcional BestSellingPage
const BestSellingPage = () => {
  // Estado local para almacenar y gestionar los datos de los productos
  const [data, setData] = useState([]);

  // Obteniendo la información de los productos y el estado de carga desde el estado global
  const { allProducts, isLoading } = useSelector((state) => state.products);

  // Efecto secundario que ordena los productos por cantidad vendida cuando se actualiza la lista de productos
  useEffect(() => {
    // Creando una copia de la lista de todos los productos
    const allProductsData = allProducts ? [...allProducts] : [];
    
    // Ordenando la lista de productos por cantidad vendida de forma descendente
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    
    // Actualizando el estado local con la lista ordenada
    setData(sortedData);
  }, [allProducts]);

  return (
    // Fragmento para envolver los elementos JSX
    <>
      {/* Mostrando un loader si la página está cargando, de lo contrario, renderizando la página */}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* Componente de encabezado con la categoría activa */}
          <Header activeHeading={2} />
          <br />
          <br />
          {/* Sección principal de la página con una cuadrícula de tarjetas de productos */}
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {/* Mapeando la lista de productos ordenados y renderizando cada tarjeta de producto */}
              {data && data.map((product, index) => <ProductCard data={product} key={index} />)}
            </div>
          </div>
          {/* Componente de pie de página */}
          <Footer />
        </div>
      )}
    </>
  );
};

// Exportando el componente BestSellingPage para su uso en otros archivos
export default BestSellingPage;
