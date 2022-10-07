import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import buhoAvion from '../images/buhoAvion.png';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";



export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

const navigate=useNavigate();
  // const [user,setUser]=useState({
  //   user:""
  // })
  // const handleChange=(e)=>{
  //   console.log(e.target.name, e.target.value)
  // }
  const onSubmit = async (r) => {
    console.log(r);
    const res = await fetch('http://localhost:4000/messages', {
      method: "POST",
      body: JSON.stringify(r),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    navigate('/login')
  }
  return (
    <div className="generalContainer">

      <div className='leftContainer'>
        <img className="imgBuhoAvion" alt='buho' src={buhoAvion} />
      </div>

      <div className="containerRegister">
        <img className="imgLogo" alt='buho' src={logo} />
        <h1>ChatOwl</h1>
        <form className="boxForm" onSubmit={handleSubmit(onSubmit)}>
          <input className="input" type="text" placeholder="Nombre" {...register('textMessage', { required: true })} />
          {errors.name?.type === 'required' && <label>'Este campo es requerido'</label>}
          <input className="input" type="email" placeholder="Correo" {...register('email', { required: true })} />
          {errors.email?.type === 'required' && <label>'Este campo es requerido'</label>}
          <input className="input" type="password" placeholder="Contraseña"{...register('password', { required: true })} />
          {errors.password?.type === 'required' && <label>'Este campo es requerido'</label>}
          <input className="button" type="submit" value="Registrarse" />
        </form>
        <p>Si ya tienes una cuenta, inicia sesión <Link to="/login">Aquí</Link></p>

      </div>

    </div>
  )
}
