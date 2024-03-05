// Importando React y los componentes necesarios para la página
import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';

// Definiendo el componente funcional ShopWithDrawMoneyPage
const ShopWithDrawMoneyPage = () => {
  return (
    // Contenedor principal de la página
    <div>
      {/* Encabezado del panel de control de la tienda */}
      <DashboardHeader />

      {/* Contenedor flex para organizar la estructura de la página */}
      <div className="flex items-start justify-between w-full">
        {/* Contenedor para la barra lateral del panel de control */}
        <div className="w-[80px] 800px:w-[330px]">
          {/* Componente de la barra lateral, con la pestaña activa indicada por 'active={7}' */}
          <DashboardSideBar active={7} />
        </div>

        {/* Componente principal de la página, que permite retirar dinero de la tienda */}
        <WithdrawMoney />
      </div>
    </div>
  );
}

// Exportando el componente ShopWithDrawMoneyPage para su uso en otros archivos
export default ShopWithDrawMoneyPage;
