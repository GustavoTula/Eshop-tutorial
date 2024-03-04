import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'

// Componente funcional que representa la barra de navegación
const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {
        // Mapeo de elementos de la barra de navegación
        navItems && navItems.map((item, index) => (
          <div className="flex" key={index}>
            <Link
              to={item.url}
              // Establecer estilos condicionales para el elemento activo
              className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer`}
            >
              {item.title}
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default Navbar;
