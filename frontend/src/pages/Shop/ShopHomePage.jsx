// Importando React, estilos y los componentes necesarios para la página
import React from 'react';
import styles from '../../styles/styles';
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

// Definiendo el componente funcional ShopHomePage
const ShopHomePage = () => {
  return (
    // Contenedor principal de la página con estilos condicionales
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="w-full flex py-10 justify-between">
        {/* Contenedor para la información de la tienda */}
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          {/* Componente que muestra la información de la tienda, indicando si el usuario es el propietario con 'isOwner={true}' */}
          <ShopInfo isOwner={true} />
        </div>

        {/* Contenedor para los datos del perfil de la tienda */}
        <div className="w-[72%] rounded-[4px]">
          {/* Componente que muestra los datos del perfil de la tienda, indicando si el usuario es el propietario con 'isOwner={true}' */}
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
}

// Exportando el componente ShopHomePage para su uso en otros archivos
export default ShopHomePage;
