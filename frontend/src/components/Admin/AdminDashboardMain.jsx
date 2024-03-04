import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";

// Componente funcional que representa la sección principal del panel de administrador.
const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  // Obtiene datos del estado global usando Redux.
  const { adminOrders, adminOrderLoading } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);

  // Realiza llamadas a la API para obtener datos al cargar el componente.
  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

  // Calcula las ganancias del administrador a partir de las órdenes.
  const adminEarning = adminOrders && adminOrders.reduce((acc, item) => acc + item.totalPrice * .10, 0);

  // Redondea el balance del administrador a dos decimales.
  const adminBalance = adminEarning?.toFixed(2);

  // Define las columnas para la tabla de órdenes.
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    // ... otras columnas ...
  ];

  // Construye las filas de datos para la tabla de órdenes.
  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  // Renderiza el componente principal del panel de administrador.
  return (
    <>
      {adminOrderLoading ? (
        // Muestra un indicador de carga mientras se obtienen los datos.
        <Loader />
      ) : (
        // Muestra la sección de resumen y últimas órdenes una vez cargados los datos.
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          
          {/* Sección de resumen con estadísticas clave */}
          <div className="w-full block 800px:flex items-center justify-between">
            {/* Total Earning */}
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Total Earning
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">$ {adminBalance}</h5>
            </div>

            {/* All Sellers */}
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Sellers
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{sellers && sellers.length}</h5>
              <Link to="/admin-sellers">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
              </Link>
            </div>

            {/* All Orders */}
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Orders
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{adminOrders && adminOrders.length}</h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
              </Link>
            </div>
          </div>

          <br />

          {/* Sección de últimas órdenes con tabla */}
          <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;

