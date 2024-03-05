// Importaciones necesarias de React y estilos para el componente
import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

// Componente funcional que muestra la sección de marcas y categorías
const Categories = () => {
  // Hook useNavigate para navegar a otras páginas
  const navigate = useNavigate();

  // Renderizado de la sección de marcas y descripciones
  return (
    <>
      {/* Sección de marcas */}
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {/* Mapear y renderizar cada marca con su respectiva descripción */}
          {brandingData &&
            brandingData.map((brand, index) => (
              <div className="flex items-start" key={index}>
                {brand.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{brand.title}</h3>
                  <p className="text-xs md:text-sm">{brand.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Sección de categorías */}
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {/* Mapear y renderizar cada categoría con su imagen */}
          {categoriesData &&
            categoriesData.map((category) => {
              // Función que maneja el clic en una categoría y navega a la página de productos filtrada por esa categoría
              const handleSubmit = () => {
                navigate(`/products?category=${category.title}`);
              };
              
              // Renderizar cada elemento de categoría en la interfaz
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                  key={category.id}
                  onClick={handleSubmit}
                >
                  <h5 className={`text-[18px] leading-[1.3]`}>{category.title}</h5>
                  <img
                    src={category.image_Url}
                    className="w-[120px] object-cover"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

// Exportar el componente para su uso en otras partes de la aplicación
export default Categories;
