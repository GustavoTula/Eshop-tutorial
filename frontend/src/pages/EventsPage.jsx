// Importando React y los hooks necesarios
import React from "react";
import { useSelector } from "react-redux";

// Importando componentes y estilos necesarios
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

// Definiendo el componente funcional EventsPage
const EventsPage = () => {
  // Obteniendo la información de los eventos y el estado de carga desde el estado global
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    // Fragmento para envolver los elementos JSX
    <>
      {/* Mostrando un loader si la página está cargando, de lo contrario, renderizando la página */}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* Componente de encabezado con la categoría activa */}
          <Header activeHeading={4} />
          
          {/* Componente de tarjeta de evento, con la propiedad 'active' establecida en 'true' para destacar el primer evento */}
          <EventCard active={true} data={allEvents && allEvents[0]} />
        </div>
      )}
    </>
  );
};

// Exportando el componente EventsPage para su uso en otros archivos
export default EventsPage;

