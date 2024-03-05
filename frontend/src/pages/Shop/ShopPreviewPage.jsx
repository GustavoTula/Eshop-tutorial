// Importando React y estilos
import React from 'react';
import styles from '../../styles/styles';
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

// Definiendo el componente funcional ShopPreviewPage
const ShopPreviewPage = () => {
  return (
    // Contenedor principal de la página con estilos condicionales
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="w-full 800px:flex py-10 justify-between">
        {/* Contenedor para la información de la tienda */}
        <div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
          {/* Componente que muestra la información de la tienda, indicando que el usuario no es el propietario con 'isOwner={false}' */}
          <ShopInfo isOwner={false} />
        </div>

        {/* Contenedor para los datos del perfil de la tienda */}
        <div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
          {/* Componente que muestra los datos del perfil de la tienda, indicando que el usuario no es el propietario con 'isOwner={false}' */}
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  );
}

// Exportando el componente ShopPreviewPage para su uso en otros archivos
export default ShopPreviewPage;
