// Importando axios para realizar peticiones HTTP y otros elementos necesarios
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { server } from '../server';

// Definiendo el componente funcional SellerActivationPage
const SellerActivationPage = () => {
  // Obteniendo el token de activación de los parámetros de la URL
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  // Utilizando el efecto para realizar la activación del vendedor al cargar el componente
  useEffect(() => {
    // Verificando si existe el token de activación
    if (activation_token) {
      // Función asincrónica para enviar la solicitud de activación
      const sendRequest = async () => {
        try {
          // Realizando una solicitud POST al servidor con el token de activación
          const res = await axios.post(`${server}/shop/activation`, {
            activation_token,
          });

          // Registrando la respuesta en la consola (puedes modificar esto según tus necesidades)
          console.log(res);
        } catch (err) {
          // Manejando errores y estableciendo el estado de error en caso de fallo
          setError(true);
        }
      };

      // Invocando la función de envío de solicitud
      sendRequest();
    }
  }, [activation_token]); // La dependencia del efecto es activation_token

  // Renderizando la interfaz del componente, mostrando un mensaje de éxito o error
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

// Exportando el componente SellerActivationPage para su uso en otros archivos
export default SellerActivationPage;

