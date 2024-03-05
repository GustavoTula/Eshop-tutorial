// Importando React, useEffect y otros elementos necesarios
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Signup from '../components/Signup/Signup';

// Definiendo el componente funcional SignupPage
const SignupPage = () => {
  // Obtener la función de navegación de React Router
  const navigate = useNavigate();

  // Obteniendo información del estado global utilizando useSelector
  const { isAuthenticated } = useSelector((state) => state.user);

  // Utilizando el efecto para redirigir al usuario a la página principal si ya está autenticado
  useEffect(() => {
    // Verificando si el usuario ya está autenticado
    if (isAuthenticated === true) {
      // Redirigiendo a la página principal
      navigate('/');
    }
  }, []); // Dependencias del efecto

  // Renderizando el componente SignupPage con el componente Signup
  return (
    <div>
      <Signup />
    </div>
  );
};

// Exportando el componente SignupPage para su uso en otros archivos
export default SignupPage;
