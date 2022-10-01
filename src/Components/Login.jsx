import React from 'react';
import logo from '../images/logo.png'
import buhoAvion from '../images/buhoAvion.png';

export const Login = () => {
  return (
    <div className="generalContainer">

      <div className='leftContainer'>
        <img className="imgBuhoAvion" alt='imágen de un buho con un avión' src={buhoAvion}/>
      </div>

      <div className="containerRegister">
        <img className="imgLogo" alt="imagen de un búho" src={logo}/>
        <h1>ChatOwl</h1>
          <form className="boxForm">           
              <input  className="input" type="email" placeholder="Correo"/>
              <input  className="input" type="password" placeholder="Contraseña"/>
              <input className="button"  type="submit" value="Registrarse"/>
          </form>
          <p>Si no tienes una cuenta, regístrate <strong>Aquí</strong></p>

      </div>
        
    </div>
  )
}
