import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../static/data";  // Importación de datos estáticos, asegúrate de que estos datos estén disponibles o importados correctamente.
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

// Componente funcional que muestra productos relacionados
const SuggestedProduct = ({ data }) => {
  // Obtener todos los productos del estado global
  const { allProducts } = useSelector((state) => state.products);

  // Estado local para almacenar los datos de productos relacionados
  const [productData, setProductData] = useState();

  // Efecto de cambio para filtrar productos relacionados por categoría
  useEffect(() => {
    // Filtrar los productos por categoría del producto actual
    const filteredProducts =
      allProducts && allProducts.filter((i) => i.category === data.category);
    
    // Actualizar el estado local con los productos filtrados
    setProductData(filteredProducts);
  }, [allProducts, data.category]);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          {/* Renderizar la cuadrícula de productos relacionados */}
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {productData &&
              productData.map((product, index) => (
                <ProductCard data={product} key={index} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

// Exportar el componente SuggestedProduct
export default SuggestedProduct;
