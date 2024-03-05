import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

// Componente para rutas protegidas del vendedor
const SellerProtectedRoute = ({ children }) => {
  // Obtener datos del estado global mediante react-redux
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  // Verificar si la carga de datos está en progreso
  if (isLoading === true) {
    // Si la carga está en progreso, mostrar un componente de carga
    return <Loader />;
  } else {
    // Si la carga ha finalizado, verificar si el usuario es un vendedor
    if (!isSeller) {
      // Si no es un vendedor, redirigir a la página de inicio de sesión del vendedor
      return <Navigate to={`/shop-login`} replace />;
    }
    // Si es un vendedor, renderizar los componentes hijos
    return children;
  }
};

// Exportar el componente para su uso en otras partes de la aplicación
export default SellerProtectedRoute;
