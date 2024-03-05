// Importaciones de librerías y componentes necesarios
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";

// Componente funcional "AllRefundOrders" que muestra todos los pedidos con reembolso
const AllRefundOrders = () => {
  // Obtiene datos de pedidos y estado de carga del estado global de Redux
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  // Obtiene la función de despacho de Redux
  const dispatch = useDispatch();

  // Efecto que se ejecuta al cargar el componente para obtener todos los pedidos del vendedor
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  // Filtra los pedidos para mostrar solo los que están en proceso de reembolso o tienen un reembolso exitoso
  const refundOrders = orders && orders.filter((item) => item.status === "Processing refund"  || item.status === "Refund Success");

  // Definición de columnas para el DataGrid
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      // Clase de celda condicional basada en el estado del pedido
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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      // Renderiza un botón de enlace a la página de detalles del pedido
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  // Arreglo de datos para el DataGrid
  const row = [];

  // Llena el arreglo de datos con la información de los pedidos con reembolso
  refundOrders &&
  refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  // Renderizado del componente
  return (
    <>
      {isLoading ? (
        // Muestra un componente de carga si isLoading es true
        <Loader />
      ) : (
        // Muestra el DataGrid con la lista de pedidos con reembolso si isLoading es false
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

// Exporta el componente "AllRefundOrders" para que pueda ser utilizado en otros archivos
export default AllRefundOrders;
