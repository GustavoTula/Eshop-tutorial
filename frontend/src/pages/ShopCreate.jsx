// Importando React, useEffect, y otros elementos necesarios
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopCreate from '../components/Shop/ShopCreate';

// Definiendo el componente funcional ShopCreatePage
const ShopCreatePage = () => {
  // Obtener la función de navegación de React Router
  const navigate = useNavigate();
  
  // Obteniendo información del estado global utilizando useSelector
  const { isSeller, seller } = useSelector((state) => state.seller);

  // Utilizando el efecto para redirigir al vendedor a su tienda si ya es un vendedor
  useEffect(() => {
    // Verificando si el usuario ya es un vendedor
    if (isSeller === true) {
      // Redirigiendo a la página de la tienda del vendedor
      navigate(`/shop/${seller._id}`);
    }
  }, [isSeller, seller]); // Dependencias del efecto

  // Renderizando el componente ShopCreatePage con el componente ShopCreate
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

// Exportando el componente ShopCreatePage para su uso en otros archivos
export default ShopCreatePage;
