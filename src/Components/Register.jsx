import React from 'react';
import logo from '../images/logo.png';
import buhoAvion from '../images/buhoAvion.png';


export const Register = () => {
  return (
    <div className="generalContainer">

      <div className='leftContainer'>
        <img className="imgBuhoAvion" src={buhoAvion}/>
      </div>

      <div className="containerRegister">
        <img className="imgLogo" src={logo}/>
        <h1>ChatOwl</h1>
          <form className="boxForm">
              <input className="input"  type="text" placeholder="Nombre" />
              <input  className="input" type="email" placeholder="Correo"/>
              <input  className="input" type="password" placeholder="Contraseña"/>
              <input className="button"  type="submit" value="Registrarse"/>
          </form>
          <p>Si ya tienes una cuenta, inicia sesión <strong>Aquí</strong></p>

      </div>
        
    </div>
  )
}
