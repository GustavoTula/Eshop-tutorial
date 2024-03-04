import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

// Componente funcional DropDown que muestra una lista de categorías para seleccionar.
// Se utiliza para la navegación del usuario a diferentes categorías de productos.
const DropDown = ({ categoriesData, setDropDown }) => {
  // Hook para navegar a diferentes rutas en la aplicación React.
  const navigate = useNavigate();

  // Manejador de eventos para manejar la selección de una categoría.
  const submitHandle = (category) => {
    // Navegar a la ruta de productos filtrada por la categoría seleccionada.
    navigate(`/products?category=${category.title}`);
    // Cerrar el menú desplegable después de la selección.
    setDropDown(false);
    // Recargar la página para mostrar los productos de la categoría seleccionada.
    window.location.reload();
  };

  // Renderiza el menú desplegable con las categorías disponibles.
  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((category, index) => (
          // Elemento de la lista para cada categoría con su respectivo icono y título.
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(category)}
          >
            {/* Icono de la categoría */}
            <img
              src={category.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            {/* Título de la categoría */}
            <h3 className="m-3 cursor-pointer select-none">{category.title}</h3>
          </div>
        ))}
    </div>
  );
};

// Exportar el componente DropDown.
export default DropDown;
