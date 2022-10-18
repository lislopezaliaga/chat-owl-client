import React from 'react'
import edit from '../images/edit.png'
import userAvatarn from '../images/user.png';


export const PerfilUsuario = () => {
    const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

  return (
    <div className='boxPerfilUser'>
        <div className='backImg'>
            <div className='boxWhite'>
                <img  className='imgPerfilUser' src={userAvatarn} alt='imagen del usuario'/>
            </div>
        </div>
        <div className='boxNameEdith'>
        <label>{sessionUser.name}</label>
        <img className='iconEdith' src={ edit } alt='imagen de editar'/> 
        </div>
    </div>
  )
}
