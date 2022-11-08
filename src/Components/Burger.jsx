import React, { useState, useEffect, useCallback } from 'react'

import Dropdown from 'react-bootstrap/Dropdown';


export const Burger = () => {
  //   const [menu, setmenu] = useState(false);
  function menuResponsive() {

  }
  return (
    <div onClick={menuResponsive}>
      <Dropdown className='menuResponsive'>
        <Dropdown.Toggle  variant="success" id="dropdown-basic">
          <div className="hamburger" id="hamburger-3">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1"  >Perfil</Dropdown.Item>
          <Dropdown.Item href="#/action-2"  >Cerrar Sessión</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </div>
  )
}
