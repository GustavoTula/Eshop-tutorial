// Importación de módulos y estilos
import React from "react";
import ReactDOM from "react-dom";

// Importación del componente principal y la función para la gestión de rendimiento web
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Importación del componente Provider y la tienda (store) de Redux
import { Provider } from "react-redux";
import Store from "./redux/store";

// Renderización del componente principal dentro del Provider para acceder al estado global de Redux
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root") // Montaje del componente en el elemento con el ID "root" del archivo HTML
);

// Función para medir el rendimiento web y enviar los resultados a la consola
reportWebVitals();
