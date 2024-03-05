// Importaciones de librerías y componentes necesarios
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

// Componente funcional "AllProducts" que muestra todos los productos
const AllProducts = () => {
  // Obtiene datos de productos y estado de carga del estado global de Redux
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  // Obtiene la función de despacho de Redux
  const dispatch = useDispatch();

  // Efecto que se ejecuta al cargar el componente para obtener todos los productos del vendedor
  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  // Manejador de eventos para borrar un producto
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  // Definición de columnas para el DataGrid
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // Renderiza un botón de enlace a la página de detalles del producto
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // Renderiza un botón para eliminar el producto
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  // Arreglo de datos para el DataGrid
  const row = [];

  // Llena el arreglo de datos con la información de los productos
  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  // Renderizado del componente
  return (
    <>
      {isLoading ? (
        // Muestra un componente de carga si isLoading es true
        <Loader />
      ) : (
        // Muestra el DataGrid con la lista de productos si isLoading es false
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

// Exporta el componente "AllProducts" para que pueda ser utilizado en otros archivos
export default AllProducts;
