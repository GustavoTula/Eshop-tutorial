// Importando React, useEffect, useSelector y useNavigate desde react-router-dom
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Importando el componente de Login
import Login from "../components/Login/Login.jsx";

// Definiendo el componente funcional LoginPage
const LoginPage = () => {
  // Obteniendo la función navigate para redireccionar
  const navigate = useNavigate();
  
  // Obteniendo el estado de autenticación del usuario desde el store
  const { isAuthenticated } = useSelector((state) => state.user);

  // Efecto secundario que redirige a la página principal si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  // Renderizando el componente de Login
  return (
    <div>
      <Login />
    </div>
  );
}

// Exportando el componente LoginPage para su uso en otros archivos
export default LoginPage;
