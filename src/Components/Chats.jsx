import React, { useState, useEffect, useCallback } from 'react'
import { socket } from './conection';
import paper from '../images/paper.png';
import InputEmoji from "react-input-emoji";
import axios from 'axios';
import { Emoji, EmojiStyle } from 'emoji-picker-react';

export const Chats = ({chanelUnique, setChanelUnique}) => {
   
   const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

   const dataUser = sessionUser;

   const [text, setText] = useState("");

   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState([]);
   const [messagesFilter, setMessageFilter] = useState([]);

   
   const [messagesBd, setmessagesBd] = useState([]);
   const [messagesBdGrl, setMessagesBdGrl] = useState([]);

   const [messagesChatGnrl, setMessagesChatGnrl] = useState([]);

   
   useEffect(() =>{
      axios.get('http://localhost:4000/channelGrl')
      .then((response) => {

         setChanelUnique(response.data);        

      })
         .catch(error => {
            console.error(error.message);
         })
      
     
   },[])

//    useEffect(() => {

//      if(chanelUnique.length===0){
//       axios.post('http://localhost:4000/general/messages',{ idChannel: 1})
//       .then((response) => {
//          setmessagesBd(response.data); 
//       })
//          .catch(error => {
//             console.error(error.message);
//        }) 
//      }else {
     
//       const a=chanelUnique[0].id_channel
//       axios.post('http://localhost:4000/general/messages',{ idChannel: a})
//       .then((response) => {
//          setmessagesBd(response.data); 

//       })
//          .catch(error => {
//             // setmessagesBd([]); 
//             console.error(error.message);
            
//        }) 
//      }
        
// }, [ chanelUnique]);

   const handleSubmitInput = (e) => {       
     
      const objMessage =  {
         textmessage: message, 
         idUser: dataUser.id, 
         dateTime:new Date(), 
         idChannel: chanelUnique[0].id_channel,
         nameuser: dataUser.name 
      }

      e.preventDefault();
      axios.post('http://localhost:4000/messages', objMessage)
      .then(() =>{
         socket.emit('chatmessage', objMessage);
         const newMessage = {
            textmessage: message, 
            idUser: dataUser.id, 
            dateTime:new Date(), 
            idChannel: chanelUnique[0].id_channel,
            nameuser: "me"            
         }
         setMessages([...messages, newMessage])
         setMessage('');
         })
      .catch((error) => {     
     
      console.log('inicia la conversación')
         console.log(error, 'error');

      });
     
   }


   const receiveMessage = useCallback((message) => {
         // if(message.idChannel===chanelUnique[0].id_channel){
            setMessages((prevState) => [...prevState, message])
            // console.log('golass',message.idChannel,chanelUnique[0].id_channel);
         // }
    
   }, [setMessages])

   // useEffect(() => {
   //    axios.post('http://localhost:4000/get/messages',{ idChannel: chanelUnique[0].id_channel })
   //   .then((response) => {
   //      setmessagesBd(response.data); 
   //      console.log('response', response); 
   //   })
   //      .catch(error => {
   //         console.error(error.message);
   //      })  
  
   //   }, []);
   // console.log('golass',message.idChannel,chanelUnique[0].id_channel)
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


   useEffect(() =>{
   const messagefil=messages.filter((e)=> e.idChannel===chanelUnique[0].id_channel)
      setMessageFilter(messagefil)

     
   },[chanelUnique,messages])
   
   


// console.log('chanel unique',chanelUnique);
// console.log('golsss',messagesFilter);
   return (
      <div className='boxMessage'>
          {chanelUnique.length ===0 ?
          
          messagesChatGnrl.map((channel, index) => (
         <div key={index}  className='nameChanelHome'>
            <h2 id='chatNames'>{channel.namechanel}</h2>
         </div>
           ))          
          : 
          
          chanelUnique.map((channel, index) => (
         <div key={index}  className='nameChanelHome'>
            <h2 id='chatNames'>{channel.namechanel}</h2>
         </div>
           ))}

         <div className='messageContainer'>
         {messagesFilter.map((message, index) => (
               <div key={index} className='messageContent'>
                  <label className='nameMessage'>{message.nameuser}</label>
                  <div className='message'>
                     <p className='textMessage'>{message.textmessage}</p>
                  </div>
               </div>
            ))}


            {/* {messages.map((message, index) => (
               <li
                  key={index}
                  className={`${message.from === "me" ? "messageContentRigth" : "messageContentLeft"}`}

               >
                  <label className='nameMessage'>{message.from}</label>
                     <label className={`${message.from === "me" ? "messageMe" : "messageOther"}`}>
                        {message.body}
                     </label>
                
               </li>
            ))} */}

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
