import React from 'react';
import logo from '../images/logo.png';
import buhoAvion from '../images/buhoAvion.png';
import {useForm} from 'react-hook-form';



export const Register = () => {
  const { register , handleSubmit,formState:{errors}  } = useForm ( ) ;

  const onSubmit = ( data ) => {
    console.log( data ) ;
  }
  return (
    <div className="generalContainer">

      <div className='leftContainer'>
        <img className="imgBuhoAvion" alt='buho' src={buhoAvion}/>
      </div>

      <div className="containerRegister">
        <img className="imgLogo" alt='buho' src={logo}/>
        <h1>ChatOwl</h1>
          <form className="boxForm" onSubmit = { handleSubmit(onSubmit) }>
              <input className="input"  type="text" placeholder="Nombre" {...register('name',{required:true})}/>
                {errors.name?.type==='required'&& <label>'Este campo es requerido'</label>}
              <input  className="input" type="email" placeholder="Correo" {...register('email',{required:true})}/>
                {errors.email?.type==='required'&& <label>'Este campo es requerido'</label>}
              <input  className="input" type="password" placeholder="Contraseña"{...register('password',{required:true})}/>
                {errors.password?.type==='required'&& <label>'Este campo es requerido'</label>}
              <input className="button"  type="submit" value="Registrarse"/>
          </form>
          <p>Si ya tienes una cuenta, inicia sesión <strong>Aquí</strong></p>

      </div>
        
    </div>
  )
}
