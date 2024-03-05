import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

// Componente funcional para mostrar la calificación en forma de estrellas
const Ratings = ({ rating }) => {
  // Array que contendrá los componentes de estrellas
  const stars = [];

  // Bucle para crear las estrellas según la calificación
  for (let i = 1; i <= 5; i++) {
    // Si la posición actual es menor o igual a la calificación, mostrar estrella completa
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          color="#f6b100"
          className="mr-2 cursor-pointer"
        />
      );
    } 
    // Si la posición actual es igual a la parte entera de la calificación y la calificación no es un número entero, mostrar estrella media
    else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={17}
          color="#f6ba00"
          className="mr-2 cursor-pointer"
        />
      );
    } 
    // En otros casos, mostrar estrella vacía
    else {
      stars.push(
        <AiOutlineStar
          key={i}
          size={20}
          color="#f6ba00"
          className="mr-2 cursor-pointer"
        />
      );
    }
  }

  // Renderizar el componente con las estrellas
  return <div className="flex"> {stars}</div>;
};

// Exportar el componente Ratings
export default Ratings;
