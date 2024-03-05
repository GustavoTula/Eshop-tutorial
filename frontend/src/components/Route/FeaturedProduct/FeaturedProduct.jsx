// Importaciones necesarias de React y estilos para el componente
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

// Componente funcional que muestra productos destacados
const FeaturedProduct = () => {
  // Selector que obtiene todos los productos del estado global
  const { allProducts } = useSelector((state) => state.products);

  // Renderizado de la sección de productos destacados
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          {/* Título de la sección de productos destacados */}
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {/* Verificar si hay productos y renderizar las tarjetas de productos */}
          {allProducts && allProducts.length !== 0 && (
            <>
              {allProducts.map((product, index) => (
                <ProductCard data={product} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Exportar el componente para su uso en otras partes de la aplicación
export default FeaturedProduct;
