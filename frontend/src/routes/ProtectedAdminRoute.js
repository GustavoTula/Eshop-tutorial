import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Componente para rutas protegidas del administrador
const ProtectedAdminRoute = ({ children }) => {
  // Obtener datos del estado global mediante react-redux
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  // Verificar si la carga de datos ha finalizado
  if (loading === false) {
    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    } 
    // Si el usuario no es un administrador, redirigir a la página principal
    else if (user.role !== "Admin") {
      return <Navigate to="/" replace />;
    }
    // Si el usuario es autenticado y es un administrador, renderizar los componentes hijos
    return children;
  }
  // Si la carga de datos aún no ha finalizado, se puede mostrar un spinner de carga o una pantalla de carga
};

// Exportar el componente para su uso en otras partes de la aplicación
export default ProtectedAdminRoute;
