import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { ModalEliminar } from './ModalEliminar';

export const MenuMessage = ({idChannel, nameChannel }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <div>
         <Dropdown>
                     <Dropdown.Toggle className='menuMessage' variant="success" id="dropdown-basic">
                        {/* <img className='menuMessage' alt='img de menú' src={menuMessage} />                   */}
                     </Dropdown.Toggle>
               
                     <Dropdown.Menu>
                     <Dropdown.Item href="#/action-1">Editar</Dropdown.Item>
                     <Dropdown.Item href="#/action-2"  onClick={handleShow}>Eliminar</Dropdown.Item>
                     </Dropdown.Menu>
        </Dropdown> 
        <ModalEliminar 
        show={show} 
        handleClose={handleClose} 
        idChannel = {idChannel} 
        nameChannel = {nameChannel} />
      
    </div>
  )
}
