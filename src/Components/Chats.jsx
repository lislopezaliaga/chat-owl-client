import React, { useState, useEffect, useCallback } from 'react'
import { socket } from './conection';
import paper from '../images/paper.png';
import InputEmoji from "react-input-emoji";
import axios from 'axios';
import { Emoji, EmojiStyle } from 'emoji-picker-react';

export const Chats = ({ chanelUnique, setChanelUnique }) => {

   const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

   const dataUser = sessionUser;

   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState([]);
   const [messagesFilter, setMessageFilter] = useState([]);


   const [messagesBd, setmessagesBd] = useState([]);
   const [messagesBdGrl, setMessagesBdGrl] = useState([]);


   useEffect(() => {
      axios.get('http://localhost:4000/channelGrl')
         .then((response) => {

            setChanelUnique(response.data);

         })
         .catch(error => {
            console.error(error.message);
         })

   }, [])

   const handleSubmitInput = (e) => {
      const date=new Date();
      
      const hour=date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const minutes=date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    


        const objMessage = {
         textmessage: message,
         idUser: dataUser.id,
         dateTime: hour+':'+minutes ,
         idChannel: chanelUnique[0].id_channel,
         nameuser: dataUser.name
      }

      e.preventDefault();
      axios.post('http://localhost:4000/messages', objMessage)
         .then(() => {
            console.log(objMessage);
            socket.emit('chatmessage', objMessage);
            const newMessage = {
               textmessage: message,
               idUser: dataUser.id,
               dateTime: hour+':'+minutes ,
               idChannel: chanelUnique[0].id_channel,
               nameuser: "Yo"
            }
            setMessages([...messages, newMessage])
            setMessage('');
            // if(screen.width > 900) {
            //    window.scrollTo(0, 1200);

            // }
         })
         .catch((error) => {


            console.log(error, 'error');

         });

   }

   const receiveMessage = useCallback((message) => {
      setMessages((prevState) => [...prevState, message])

   }, [setMessages])

   useEffect(() => {
      socket.on('message', receiveMessage)

      return () => {
         socket.off('message', receiveMessage)
         console.log('cerrando socket');
      }
   }, [receiveMessage]);

   useEffect(() => {
      setMessagesBdGrl([...messagesBd, ...messages])

   }, [messagesBd, messages])


   useEffect(() => {
      const messagefil = messages.filter((e) => e.idChannel === chanelUnique[0].id_channel)
      setMessageFilter(messagefil)
      // console.log(messagesFilter[0].dateTime.getHours()+':'+ messagesFilter[0].dateTime.getMinutes());


   }, [chanelUnique, messages])

   console.log(messagesFilter);
   return (
      <div className='boxMessage'>
         {
            chanelUnique.map((channel, index) => (
               <div key={index} className='nameChanelHome'>
                  <h2 id='chatNames'>{channel.namechanel}</h2>
               </div>
            ))

         }
         <div className='messageContainer'>
            {messagesFilter.map((message, index) => (
               <div key={index}
                  className={`${message.nameuser === "Yo" ? "messageContentRigth" : "messageContentLeft"}`}>
                  <label
                     className='nameMessage'>{message.nameuser}:


                  </label>

                  <div className='message'>
                     <label className='textMessage'>{message.textmessage}</label>
                   
                  </div>
                  <span>
                       {message.dateTime}

                     </span>
               </div>
            ))}

            <div className='sendText'>
               <form className='sendText' onSubmit={handleSubmitInput}>
                  <InputEmoji
                     // className='inputSend'
                     type='text'
                     value={message}
                     onChange={setMessage}
                     cleanOnEnter
                     onEnter={handleSubmitInput}
                     placeholder="Escribe un mensaje..."
                  />

                  <button className='boxpaper' type='submit'>
                     <img className="paper" alt='imágen de un avatar' src={paper} />
                  </button>


               </form>
            </div>
         </div>
      </div>
   )
}
