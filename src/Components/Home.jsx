import React, { useState, useEffect, useCallback } from 'react';
import buhoLogo from '../images/buhoLogo.png';
import exit from '../images/exit.png';
import userAvatarn from '../images/user.png';
import { Chanel } from './Chanel';
import { Chats } from './Chats';
import { PerfilUsuario } from './PerfilUsuario';
import { Users } from './Users';

export const Home = () => {

  const [chanelUnique, setChanelUnique] = useState([]);


  const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

  const dataUser = sessionUser;
  
  return (
    <div>
      <div className='nav'>
        <div className='boxBuhoLogo'>
          <img className="buhoLogo" alt='imágen de un buho con un avión' src={buhoLogo} />
          <h2 className='titleChat'>ChatOwl</h2>
        </div>
        <div className='boxMenu'>
        
          <img className="cerrarSesion" alt='imágen de cerrarSesion' src={exit} />
        </div>
      </div>

      <div className='generalBoxBodyHome'>
       <Chanel  setChanelUnique={setChanelUnique}></Chanel>
       <Chats chanelUnique={chanelUnique} setChanelUnique={setChanelUnique} ></Chats>
       <div className='boxUsersConected'>
          <PerfilUsuario />
          <Users></Users>
       </div>
      </div>
      <div className='footer'>

      </div>
    </div>
  )
}
