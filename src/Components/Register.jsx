import React from 'react'

export const Register = () => {
  return (
    <div className="containerGeneral containerCenter">
      <div className="containerRegister containerCenter">
        <img src=''/>
        <h1>Regístrate en chatOwl</h1>
          <form className="boxForm containerCenter">
              <input className="input"  type="text" placeholder="Nombre" />
              <input  className="input" type="email" placeholder="Correo"/>
              <input  className="input" type="password" placeholder="Contraseña"/>
              <input className="button input"  type="submit" value="Registrarse"/>
          </form>
          <p>Si ya tienes una cuenta, inicia sesión <strong>Aqui</strong></p>
      </div>
        
    </div>
  )
}
