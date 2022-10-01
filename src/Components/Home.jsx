import React from 'react';
import buhoLogo from '../images/buhoLogo.png';


export const Home = () => {
  return (
    <div className='generalContainerHome'>
      <div className='nav'>
        <div className='boxBuhoLogo'>
          <img className="buhoLogo" alt='imágen de un buho con un avión' src={buhoLogo} />
        </div>
        <div className='boxMenu'>
          <div className='boxUser'>
            <img className="avatar" alt='imágen de un avatar' src={buhoLogo} />
            <p className='nameUser'>Lis</p>
          </div>
          <img className="cerrarSesion" alt='imágen de cerrarSesion' src={buhoLogo} />
        </div>
      </div>

      <div className='generalBoxBodyHome'>
        <div className='boxBodyHome'> dfsv 
          
        </div>
        <div className='boxBodyHome'>asfadf</div>
        <div className='boxBodyHome'>sdcsd</div>
      </div>

    </div>
  )
}
