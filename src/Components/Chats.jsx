import React, { useState, useEffect, useCallback } from 'react'
import { socket } from './conection';
import paper from '../images/paper.png';
import InputEmoji from "react-input-emoji";

export const Chats = () => {
   const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

   const dataUser = sessionUser;

   const [text, setText] = useState("");

   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState([]);

   const handleSubmitInput = (e) => {
      e.preventDefault();
      socket.emit('chatmessage', { message: message, user: dataUser.name });
      const newMessage = {
         body: message,
         from: "me"
      }
      setMessages([...messages, newMessage])
      setMessage('');
   }

   const receiveMessage = useCallback((message) => {

      setMessages((prevState) => [...prevState, {
         body: message.body,
         from: message.from,
      }])
   }, [setMessages])


   useEffect(() => {
      socket.on('message', receiveMessage)

      return () => {
         socket.off('message', receiveMessage)
         console.log('cerrando socket');
      }
   }, [receiveMessage]);

   function handleOnEnter(text) {
      console.log("enter", text);
    }
   return (
      <div className='boxMessage'>
         <div className='nameChanelHome'>
            <h2 id='chatNames'>#Kittychat</h2>
         </div>
         <div className='messageContainer'>

            {messages.map((message, index) => (
               <div key={index} className='messageContent'>
                  <label className='nameMessage'>{message.from}</label>
                  <div className='message'>
                     <p className='textMessage'>{message.body}</p>
                  </div>
               </div>
            ))}

            <div className='sendText'>
               <form className='sendText' onSubmit={handleSubmitInput}>
                  <InputEmoji
                     className='inputSend'
                     type='text'
                     value={message}
                     onChange={setMessage}
                     cleanOnEnter
                     onEnter={handleSubmitInput}
                     placeholder="Type a message"
                  />
                  {/* <input 
                  className='inputSend'
                   type='text' 
                   onChange={e => setMessage(e.target.value)} value={message} /> */}


                  <div className='boxpaper'>

                     {/* <input type='submit' /> */}
                     <button className='buttonSend' type='submit'>
                        <img className="paper" alt='imágen de un avatar' src={paper} />
                     </button>
                     {/* <img className="paper" alt='imágen de un avatar' src={paper} /> */}

                  </div>

               </form>
            </div>
         </div>
      </div>
   )
}
