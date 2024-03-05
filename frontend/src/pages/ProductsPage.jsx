// Importando React y los hooks necesarios desde React Router y Redux
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import Loader from '../components/Layout/Loader';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import styles from '../styles/styles';

// Definiendo el componente funcional ProductsPage
const ProductsPage = () => {
  // Obteniendo datos del estado global utilizando el hook useSelector de Redux
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get('category');
  const { allProducts, isLoading } = useSelector((state) => state.products);

  // Definiendo estados locales para almacenar los datos de productos basados en la categoría y para manejar la presencia de la categoría
  const [data, setData] = useState([]);

  // Efecto secundario para actualizar el estado local "data" basado en la presencia de la categoría y la búsqueda en el array de productos
  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts, categoryData]);

  // Renderizando la estructura de la página con encabezado, lista de productos, y mensaje de "No products Found!" si no hay productos
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

// Exportando el componente ProductsPage para su uso en otros archivos
export default ProductsPage;
