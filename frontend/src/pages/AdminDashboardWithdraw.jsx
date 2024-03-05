// Importando React y los componentes necesarios para la página
import React from 'react';
import AdminHeader from '../components/Layout/AdminHeader';
import AdminSideBar from '../components/Admin/Layout/AdminSideBar';
import AllWithdraw from "../components/Admin/AllWithdraw";

// Definiendo el componente funcional AdminDashboardWithdraw
const AdminDashboardWithdraw = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Encabezado del panel de control del administrador */}
      <AdminHeader />

      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="w-full flex">
        {/* Contenedor flex adicional para la disposición de la barra lateral y la sección principal */}
        <div className="flex items-start justify-between w-full">
          {/* Contenedor para la barra lateral del panel de control del administrador */}
          <div className="w-[80px] 800px:w-[330px]">
            {/* Componente de la barra lateral, con la pestaña activa indicada por 'active={7}' */}
            <AdminSideBar active={7} />
          </div>

          {/* Componente principal de la página, que muestra todas las transacciones de retiro */}
          <AllWithdraw />
        </div>
      </div>
    </div>
  );
}

// Exportando el componente AdminDashboardWithdraw para su uso en otros archivos
export default AdminDashboardWithdraw;
