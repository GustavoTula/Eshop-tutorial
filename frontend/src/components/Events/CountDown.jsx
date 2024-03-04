import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";

// Componente funcional CountDown que muestra la cuenta regresiva para un evento.
const CountDown = ({ data }) => {
  // Estado para almacenar el tiempo restante del evento.
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Efecto secundario que se ejecuta para actualizar el tiempo restante cada segundo.
  useEffect(() => {
    // Configuración de un temporizador para actualizar el tiempo restante cada segundo.
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Verificar si el tiempo ha alcanzado cero y eliminar el evento si es así.
    if (
      typeof timeLeft.days === "undefined" &&
      typeof timeLeft.hours === "undefined" &&
      typeof timeLeft.minutes === "undefined" &&
      typeof timeLeft.seconds === "undefined"
    ) {
      axios.delete(`${server}/event/delete-shop-event/${data._id}`);
    }

    // Limpiar el temporizador cuando el componente se desmonta.
    return () => clearTimeout(timer);
  });

  // Función para calcular el tiempo restante del evento.
  function calculateTimeLeft() {
    const difference = +new Date(data.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  // Mapeo de los componentes del temporizador para cada intervalo de tiempo.
  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  // Renderizado del componente CountDown.
  return (
    <div>
      {/* Mostrar componentes del temporizador si hay tiempo restante, de lo contrario, mostrar "Time's Up". */}
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's Up</span>
      )}
    </div>
  );
};

// Exportar el componente CountDown.
export default CountDown;
