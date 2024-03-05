// Importaciones necesarias de React y estilos para el componente
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

// Componente funcional que muestra los mejores productos en oferta
const BestDeals = () => {
  // Estado local para almacenar los datos de los mejores productos
  const [data, setData] = useState([]);

  // Obtener todos los productos del estado global utilizando el hook useSelector
  const { allProducts } = useSelector((state) => state.products);

  // Efecto secundario que se ejecuta cuando cambian los productos disponibles
  useEffect(() => {
    // Crear una copia del array de todos los productos
    const allProductsData = allProducts ? [...allProducts] : [];

    // Ordenar el array de productos en función de la cantidad vendida de forma descendente
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);

    // Seleccionar los primeros cinco productos después de ordenar
    const firstFive = sortedData && sortedData.slice(0, 5);

    // Actualizar el estado local con los mejores productos
    setData(firstFive);
  }, [allProducts]); // Dependencia para que el efecto se ejecute cuando cambian los productos disponibles

  // Renderizado del componente
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            data && data.length !== 0 && (
              <>
                {/* Mapear y renderizar cada tarjeta de producto en la interfaz */}
                {data && data.map((product, index) => <ProductCard data={product} key={index} />)}
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

// Exportar el componente para su uso en otras partes de la aplicación
export default BestDeals;
