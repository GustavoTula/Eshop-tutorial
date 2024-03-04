import React from "react";
import Lottie from "react-lottie";
import animationData from "../../Assests/animations/24151-ecommerce-animation.json";

// Componente funcional para mostrar un cargador animado
const Loader = () => {
  // Configuración predeterminada para la animación Lottie
  const defaultOptions = {
    loop: true, // Repetir la animación
    autoplay: true, // Iniciar la animación automáticamente
    animationData: animationData, // Datos de animación JSON
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Ajustar el aspecto de la animación
    },
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* Componente Lottie que renderiza la animación con opciones predeterminadas */}
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export default Loader;
