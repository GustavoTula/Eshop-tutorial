// Importando React, módulos de Material-UI y los componentes necesarios
import React, { useEffect } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";

// Definiendo el componente funcional AdminDashboardOrders
const AdminDashboardOrders = () => {
  // Obteniendo el dispatch y el estado del store usando useSelector
  const dispatch = useDispatch();
  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );

  // Efecto secundario para obtener todas las órdenes del administrador al cargar la página
  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, []);

  // Definiendo las columnas de la tabla de datos
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
        field: "createdAt",
        headerName: "Order Date",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
  ];

  // Creando las filas para la tabla de datos
  const rows = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0,10),
      });
    });

  // Renderizando la interfaz de usuario
  return (
    <div>
      {/* Encabezado del panel de control del administrador */}
      <AdminHeader />

      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="w-full flex">
        {/* Contenedor flex adicional para la disposición de la barra lateral y la sección principal */}
        <div className="flex items-start justify-between w-full">
          {/* Contenedor para la barra lateral del panel de control del administrador */}
          <div className="w-[80px] 800px:w-[330px]">
            {/* Componente de la barra lateral, con la pestaña activa indicada por 'active={2}' */}
            <AdminSideBar active={2} />
          </div>

          {/* Contenedor principal de la sección de órdenes con tabla de datos */}
          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center">
              {/* Componente DataGrid de Material-UI que muestra la información de las órdenes */}
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportando el componente AdminDashboardOrders para su uso en otros archivos
export default AdminDashboardOrders;
