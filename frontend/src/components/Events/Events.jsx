import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/styles';
import EventCard from './EventCard';

// Componente funcional Events que muestra eventos populares.
const Events = () => {
  // Obtener el estado de los eventos y la carga desde Redux.
  const { allEvents, isLoading } = useSelector((state) => state.events);

  // Renderizado del componente Events.
  return (
    <div>
      {/* Verificar si los eventos están cargando */}
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {/* Verificar si hay eventos disponibles */}
            {allEvents.length !== 0 ? (
              // Renderizar la primera tarjeta de evento si hay eventos disponibles
              <EventCard data={allEvents && allEvents[0]} />
            ) : (
              // Mostrar mensaje si no hay eventos disponibles
              <h4>No Events available!</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Exportar el componente Events.
export default Events;
