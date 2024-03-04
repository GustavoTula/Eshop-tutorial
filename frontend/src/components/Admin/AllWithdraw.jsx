import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

// Componente funcional que muestra todas las solicitudes de retiro.
const AllWithdraw = () => {
  const [data, setData] = useState([]); // Estado para almacenar los datos de las solicitudes de retiro.
  const [open, setOpen] = useState(false); // Estado para controlar la visibilidad del modal de actualización.
  const [withdrawData, setWithdrawData] = useState(); // Estado para almacenar datos específicos de una solicitud de retiro seleccionada.
  const [withdrawStatus, setWithdrawStatus] = useState('Processing'); // Estado para el estado de la solicitud de retiro seleccionada.

  // Obtener las solicitudes de retiro al cargar el componente.
  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-all-withdraw-request`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  // Definición de columnas para la tabla de solicitudes de retiro.
  const columns = [
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Shop Name", minWidth: 180, flex: 1.4 },
    { field: "shopId", headerName: "Shop Id", minWidth: 180, flex: 1.4 },
    { field: "amount", headerName: "Amount", minWidth: 100, flex: 0.6 },
    { field: "status", headerName: "Status", type: "text", minWidth: 80, flex: 0.5 },
    { field: "createdAt", headerName: "Request Given At", type: "number", minWidth: 130, flex: 0.6 },
    {
      field: " ",
      headerName: "Update Status",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          // Icono de lápiz para actualizar el estado de la solicitud de retiro.
          <BsPencil
            size={20}
            className={`${params.row.status !== "Processing" ? 'hidden' : '' } mr-5 cursor-pointer`}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
  ];

  // Manejar la actualización del estado de la solicitud de retiro.
  const handleSubmit = async () => {
    await axios
      .put(`${server}/withdraw/update-withdraw-request/${withdrawData.id}`,{
        sellerId: withdrawData.shopId,
        status: withdrawStatus,
      },{withCredentials: true})
      .then((res) => {
        toast.success("Withdraw request updated successfully!");
        setData(res.data.withdraws);
        setOpen(false);
      });
  };

  // Construcción de filas de datos para la tabla de solicitudes de retiro.
  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        shopId: item.seller._id,
        name: item.seller.name,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  // Renderiza la tabla de solicitudes de retiro.
  return (
    <div className="w-full flex items-center pt-5 justify-center">
      <div className="w-[95%] bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
      {open && (
        // Modal para actualizar el estado de la solicitud de retiro.
        <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
          <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-4">
            <div className="flex justify-end w-full">
              <RxCross1 size={25} onClick={() => setOpen(false)} />
            </div>
            <h1 className="text-[25px] text-center font-Poppins">
              Update Withdraw Status
            </h1>
            <br />
            {/* Selector para actualizar el estado de la solicitud de retiro. */}
            <select
              name=""
              id=""
              onChange={(e) => setWithdrawStatus(e.target.value)}
              className="w-[200px] h-[35px] border rounded"
            >
              <option value={withdrawStatus}>{withdrawData.status}</option>
              <option value={withdrawStatus}>Succeed</option>
            </select>
            {/* Botón para confirmar la actualización del estado. */}
            <button
              type="submit"
              className={`block ${styles.button} text-white !h-[42px] mt-4 text-[18px]`}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWithdraw;
