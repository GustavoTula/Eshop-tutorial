// Importando axios para realizar solicitudes HTTP y otros módulos necesarios
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

// Definiendo el componente funcional ActivationPage
const ActivationPage = () => {
  // Extrayendo el token de activación de los parámetros de la URL
  const { activation_token } = useParams();

  // Estado para manejar errores durante la activación
  const [error, setError] = useState(false);

  // Efecto secundario que se ejecuta al montar el componente
  useEffect(() => {
    // Verificando si hay un token de activación presente
    if (activation_token) {
      // Función asíncrona para enviar la solicitud de activación
      const sendRequest = async () => {
        try {
          // Enviando una solicitud POST al servidor con el token de activación
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          
          // Registrando la respuesta en la consola
          console.log(res);
        } catch (err) {
          // Manejando errores y actualizando el estado de error si ocurre alguno
          setError(true);
        }
      };

      // Llamando a la función para enviar la solicitud
      sendRequest();
    }
  }, [activation_token]);

  // Renderizando la interfaz de usuario
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Mostrando un mensaje según si hubo un error o si la activación fue exitosa */}
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

// Exportando el componente ActivationPage para su uso en otros archivos
export default ActivationPage;
