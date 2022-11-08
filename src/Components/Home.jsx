import React, { useState, useEffect, useCallback } from 'react';
import buhoLogo from '../images/buhoLogo.png';
import exit from '../images/exit.png';

import { Chanel } from './Chanel';
import { Chats } from './Chats';
import { PerfilUsuario } from './PerfilUsuario';
import { Users } from './Users';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { socket } from './conection';
import { Burger } from './Burger';
export const Home = () => {

  const navigate = useNavigate();
  const [perfilUser, setperfilUser] = useState(false);
  const [chanelUnique, setChanelUnique] = useState([{
    id_channel: 1,
    id_creator: 0,
    namechanel: "#channelGeneral"
  }]);
  const sessionUser = JSON.parse(sessionStorage.getItem('USER'));
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    }
  };

  async function signOut() {
    const res = await axios.put('https://chatowl-2l34.onrender.com/user/active', { statusUser: 0, idUser: sessionUser.id }, axiosConfig);
    socket.emit('userDisconnected', sessionUser);
    navigate('/login')
  }

  return (
    <div>
      <div className='nav'>
        <div className='boxBuhoLogo'>
          <img className="buhoLogo" alt='imágen de un buho con un avión' src={buhoLogo} />
          <h2 className='titleChat'>ChatOwl</h2>
        </div>

        <div className='boxMenu'>


          <img className="cerrarSesion" onClick={signOut} alt='imágen de cerrarSesion' src={exit} />
        </div>
        <div className='menuHamburger'>
          <Burger setperfilUser={setperfilUser}></Burger>
        </div>
      </div>

      <div className='generalBoxBodyHome'>
        {!perfilUser &&
          <Chanel setChanelUnique={setChanelUnique}></Chanel>
        }

        <Chats chanelUnique={chanelUnique} setChanelUnique={setChanelUnique} ></Chats>
        {perfilUser &&
          <div className='boxUsersConected'>

            <PerfilUsuario />
            {!perfilUser &&
            <Users setChanelUnique={setChanelUnique}></Users>
            }
           
          </div>
        }

      </div>
      <div className='footer'>

      </div>
    </div>
  )
}
