import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  // Obtener datos del estado global mediante react-redux
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  // Verificar si la carga de datos ha finalizado
  if (loading === false) {
    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    // Si el usuario está autenticado, renderizar los componentes hijos
    return children;
  }
  // Si la carga de datos aún no ha finalizado, se puede mostrar un spinner de carga o una pantalla de carga
};

// Exportar el componente para su uso en otras partes de la aplicación
export default ProtectedRoute;
