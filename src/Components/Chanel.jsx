import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import chanelImg from '../images/chanel.png';
import imgPinguino from '../images/pinguino.gif';
import Dropdown from 'react-bootstrap/Dropdown';

import { socket } from './conection';
import { MenuMessage } from './MenuMessage';



export const Chanel = ({setChanelUnique}) => {

   // const setChanelUnique = props.setChanelUnique

   // const { setChanelUnique } = props

   const sessionUser = JSON.parse(sessionStorage.getItem('USER'));


   const { register, handleSubmit, reset } = useForm();

   const [nameChanel, setNameChanels] = useState([]);

   const [errorChanel, errorChanels] = useState("");

   const [nameChanelBd, setNameChanelsBd] = useState([]);

   const [nameChanelGn, setNameChanelsGn] = useState([]);

   // const [chanelUnique, setChanelUnique] = useState([]);



   const onSubmitChanel = async (objectChanel) => {

      const chanelUser = {
         namechanel: "#" + objectChanel.namechanel,
         idDueño: sessionUser.id
      }

      axios.post('http://localhost:4000/chanel', chanelUser)
      .then((res) => {
         // console.log(res);
         socket.emit('nameChanel', chanelUser);
         setNameChanels([...nameChanel, chanelUser]);
         reset();
      }).catch((error) => {
         errorChanels(error.response.data.message);
         setTimeout(() => {
            errorChanels('');
         }, 2000)


      });


   }

   useEffect(() => {
      axios.get('http://localhost:4000/chanel').then((response) => {

         setNameChanelsBd(response.data);
         setChanelUnique(nameChanelBd.filter((e)=>e.namechanel==='#channelGeneral'))
    

      })
         .catch(error => {
            console.error(error.message);
         })

   }, []);

   const receiveChanel = useCallback((chanelSocket) => {
      setNameChanels((prevState) => [...prevState, chanelSocket]);
   }, [setNameChanels])


   useEffect(() => {

      socket.on('namesChanels', receiveChanel)
      return () => {
         socket.off('namesChanels', receiveChanel)
         // console.log('cerrando socket');
      }
   }, [receiveChanel]);

   useEffect(() => {
      setNameChanelsGn([...nameChanelBd, ...nameChanel])  

   }, [nameChanelBd, nameChanel])


   const changeChanel = (name) => {
      setChanelUnique(nameChanelGn.filter((e)=>e.namechanel===name))
      // return () => {
      //    socket.off('chatmessage')
      //    console.log('cerrando socket');
      // }
   }
   return (

      <div className='boxBodyHome' >
         <h2>Canales</h2>
         <div className='createChanel'>

            <form className='formChanel' onSubmit={handleSubmit(onSubmitChanel)}>
               <input className='inputChanel' type='text' {...register('namechanel', { required: true })} />

               {/* {errors.nameChanel?.type === 'required' && <label>'Este campo es requerido'</label>} */}
               <input className='buttonChanel' type='submit' value='Crear' />

            </form>

            <label className='errorChanel'>{errorChanel}</label>
         </div>
         <div className='boxChanel'>
            {nameChanelGn.map((chanel, index) => (
               <div key={index} className='nameChanel' onClick={(e) => changeChanel(chanel.namechanel)}>
                  <img className="avatar" alt='imágen de un avatar' src={chanelImg} />
                  <p className='nameChanelP'>{chanel.namechanel}</p>
                  {chanel.id_creator === sessionUser.id && 
                  <MenuMessage 
                     idChannel = {chanel.id_channel} 
                     nameChannel = {chanel.namechanel}
                 />
                  // <img className='menuMessage' alt='img de menú' src={menuMessage} />                               
                  }
                 
               </div>
            ))}

         </div>
         <div>
            <img className='imgPinguino' src={imgPinguino} alt='img de pinguino'/>
         </div>

      </div>

   )
}
