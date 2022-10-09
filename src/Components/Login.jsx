import React from 'react';
import logo from '../images/logo.png'
import buhoAvion from '../images/buhoAvion.png';
import {useForm} from 'react-hook-form';
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';

export const Login = () => {
  const { register , handleSubmit,formState:{errors} } = useForm ( ) ;
  let navigate = useNavigate();

  const onSubmit = async( datUser ) => {
    
    const res =  await axios.post('http://localhost:4000/auth/logIn', datUser, { withCredentials: true })
    
    // const res = await fetch('http://localhost:4000/auth/logIn', {
    //   method: "POST",
    //   body: JSON.stringify(datUser),
    //   headers: { "Content-Type": "application/json" },
    // });
    // const data = await res.json();
    console.log(res);
    console.log(document.cookie);
    navigate('/home')
   
    }
    
  return (
    <div className="generalContainer">

      <div className='leftContainer'>
        <img className="imgBuhoAvion" alt='imágen de un buho con un avión' src={buhoAvion}/>
      </div>

      <div className="containerRegister">
        <img className="imgLogo" alt="imagen de un búho" src={logo}/>
        <h1>ChatOwl</h1>
          <form className="boxForm" onSubmit = { handleSubmit(onSubmit) }>           
              <input  className="input" type="email" placeholder="Correo" {...register('emailUser',{required:true})}/>
              {errors.email?.type==='required'&& <label>'Este campo es requerido'</label>}
              <input  className="input" type="password" placeholder="Contraseña" {...register('passwordUser',{required:true})}/>
              {errors.password?.type==='required'&& <label>'Este campo es requerido'</label>}
              <input className="button"  type="submit" value="Inicia Sesión"/>
          </form>
          <p>Si no tienes una cuenta, regístrate <Link to="/register">Aquí</Link></p>

      </div>
        
    </div>
  )
}
