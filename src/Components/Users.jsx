import React, { useState, useEffect, useCallback } from 'react';
import userAvatarn from '../images/user.png';
import { socket } from './conection';
import axios from 'axios';

export const Users = () => {

   const sessionUser = JSON.parse(sessionStorage.getItem('USER'));
   const [nameUser, setNameUsers] = useState([]);

   useEffect(() =>{
      axios.get('http://localhost:4000/usersConnected')
      .then((response) => {
         const users=[];
         response.data.forEach(e=>{
            const datauser={
               id: e.id_user, 
               name: e.name_user, 
               status: e.status_user
            }  
            users.push(datauser)
         })
         setNameUsers(users);        

      })
         .catch(error => {
            console.error(error.message);
         })      
     
   },[])


   const receiveUser = useCallback((user) => {
      setNameUsers(user)
   }, [setNameUsers])


   useEffect(() => {

      socket.on('allUsers', receiveUser);

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
            {nameUser.map((user, index) => (user.id !== sessionUser.id &&
               <div key={index} className='userboxContent'>
                  <div className='imgAvatar'>
                     <img className="avatarUser" alt='imágen de un avatar' src={userAvatarn} />
                  </div>

                  <p className='nameuserconect'>{user.name}</p>
                  <div className='divstatus'>
                     <div className='status'></div>
                  </div>

               </div>
            ))}
         </div>

      </div>
   )
}
