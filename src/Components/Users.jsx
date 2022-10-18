import React, { useState, useEffect, useCallback } from 'react';
import userAvatarn from '../images/user.png';
import { socket } from './conection';

export const Users = () => {
   const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

   const [nameUser, setNameUsers] = useState([]);
   // const [nameUserStatus, setNameUsersStatus] = useState(false);

   useEffect(() =>{
      socket.emit('userConected', sessionUser); 
      setNameUsers([sessionUser]);
   }, []);


   const receiveUser = useCallback((user) => {

      setNameUsers(user)
   }, [setNameUsers])   


   useEffect(() => {
      // socket.on('users', receiveUser);
      socket.on('allUsers', receiveUser)
      return () => {
         socket.off('allUsers', receiveUser)
         // socket.emit('leave',receiveUser)
       
         console.log('cerrando socket');
      }
   }, [receiveUser]);

console.log(nameUser);

   return (
      <div className='boxBodyUsers'>
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
