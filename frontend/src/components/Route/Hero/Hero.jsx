// Importaciones necesarias de React y estilos para el componente Hero
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

// Componente funcional que representa la sección de héroe con una imagen de fondo
const Hero = () => {
  return (
    <div
      // Configuración del contenedor con una imagen de fondo y estilos flexibles
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        {/* Título principal de la sección */}
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> home Decoration
        </h1>
        {/* Párrafo descriptivo de la sección */}
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        {/* Enlace de "Shop Now" redirige a la página de productos */}
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            {/* Texto del botón de compra */}
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

// Exportar el componente para su uso en otras partes de la aplicación
export default Hero;

