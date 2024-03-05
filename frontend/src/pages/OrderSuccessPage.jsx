// Importando React y los componentes necesarios
import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/107043-success.json";

// Definiendo el componente funcional OrderSuccessPage
const OrderSuccessPage = () => {
  // Renderizando la estructura de la página con el encabezado, componente Success y pie de página
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

// Definiendo el componente funcional Success
const Success = () => {
  // Opciones por defecto para la animación de Lottie
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Renderizando la animación de Lottie, un mensaje y espacio en blanco
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

// Exportando el componente OrderSuccessPage para su uso en otros archivos
export default OrderSuccessPage;
