// Importando React, useEffect, y otros elementos necesarios
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopLogin from '../components/Shop/ShopLogin';

// Definiendo el componente funcional ShopLoginPage
const ShopLoginPage = () => {
  // Obtener la función de navegación de React Router
  const navigate = useNavigate();

  // Obteniendo información del estado global utilizando useSelector
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  // Utilizando el efecto para redirigir al vendedor al dashboard si ya es un vendedor
  useEffect(() => {
    // Verificando si el usuario ya es un vendedor y si la carga ha finalizado
    if (isSeller === true && !isLoading) {
      // Redirigiendo a la página del dashboard del vendedor
      navigate(`/dashboard`);
    }
  }, [isLoading, isSeller]); // Dependencias del efecto

  // Renderizando el componente ShopLoginPage con el componente ShopLogin
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

// Exportando el componente ShopLoginPage para su uso en otros archivos
export default ShopLoginPage;
