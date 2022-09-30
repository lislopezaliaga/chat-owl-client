import React from 'react';
import logo from '../images/logo.png'

export const Login = () => {
  return (
    <div className="containerGeneral containerCenter">
      <div className="containerRegister containerCenter">
        <img className="logoOwl" src={logo} />
        <h1>Regístrate en chatOwl</h1>
        <form className="boxForm containerCenter">
          <input className="input" type="email" placeholder="Correo" />
          <input className="input" type="password" placeholder="Contraseña" />
          <input className="button input" type="submit" value="Inicia Sesión" />
        </form>
        <p>Si no tienes una cuenta, regístrate <strong>Aquí</strong></p>
      </div>

    </div>
  )
}
