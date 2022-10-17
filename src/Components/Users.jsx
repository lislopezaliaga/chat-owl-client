import React, { useState, useEffect, useCallback } from 'react';
import userAvatarn from '../images/user.png';
import { socket } from './conection';

export const Users = () => {
   const [nameUser, setNameUsers] = useState([]);

   const receiveUser = useCallback((user) => {

      setNameUsers((prevState) => [...prevState, user])
   }, [setNameUsers])


   useEffect(() => {
      socket.on('users', receiveUser);
      socket.on('allUsers', console.log)
      return () => {
         socket.off('users', receiveUser)
         // socket.emit('leave',receiveUser)
       
         console.log('cerrando socket');
      }
   }, [receiveUser]);



   return (
      <div className='boxBodyHome'>
         <h2>Conectados</h2>

         <div className='userContent'>
            {nameUser.map((user, index) =>
              <div key={index} className='userboxContent'>
                <div className='imgAvatar'>
                  <img className="avatarUser" alt='imágen de un avatar' src={userAvatarn} />
                </div>

                <p className='nameuserconect'>{user.name}</p>
                <div className='divstatus'>
                  <div className='status'></div>
                </div>

              </div>
            )}
         </div>

      </div>
   )
}
