// Importando React y los hooks necesarios desde React y Redux
import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import Loader from '../components/Layout/Loader';
import ProfileSideBar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';
import { useSelector } from 'react-redux';

// Definiendo el componente funcional ProfilePage
const ProfilePage = () => {
  // Obteniendo datos del estado global utilizando el hook useSelector de Redux
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  // Renderizando el componente con condicionales para mostrar un loader mientras se carga y la estructura de la página con encabezado, barra lateral de perfil y contenido de perfil
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
      )}
    </div>
  );
};

// Exportando el componente ProfilePage para su uso en otros archivos
export default ProfilePage;
