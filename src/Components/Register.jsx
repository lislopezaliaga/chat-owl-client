import React from 'react'

export const Register = () => {
  return (
    <div id ="" className="containerCenter ">
        <h1>Register</h1>
        <form>
            <input  type="text" placeholder="Nombre" />
            <input  type="email" placeholder="Correo"/>
            <input  type="password" placeholder="Contraseña"/>
            <input  type="submit" value="Registrarse"/>
        </form>
    </div>
  )
}
