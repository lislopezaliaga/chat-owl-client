import React, { useState, useEffect, useCallback } from 'react';
import buhoLogo from '../images/buhoLogo.png';
import exit from '../images/exit.png';
import userAvatarn from '../images/user.png';
import paper from '../images/paper.png';
import chanelImg from '../images/chanel.png';
import { get, useForm } from 'react-hook-form';

import axios from 'axios';
import { json } from 'react-router-dom';
import { Chanel } from './Chanel';
import {  socket } from './conection';



export const Home = () => {

  const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

  const dataUser = sessionUser;

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

 const  onSubmitChanel=()=>{
  }
  
  return (
    <div>
      <div className='nav'>
        <div className='boxBuhoLogo'>
          <img className="buhoLogo" alt='imágen de un buho con un avión' src={buhoLogo} />
        </div>
        <div className='boxMenu'>
          <div className='boxUser'>
            <p className='nameUser'>{dataUser.name}</p>
            <img className="avatar" alt='imágen de un avatar' src={userAvatarn} />

          </div>
          <img className="cerrarSesion" alt='imágen de cerrarSesion' src={exit} />
        </div>
      </div>

      <div className='generalBoxBodyHome'>
       <Chanel></Chanel>
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
                <input className='inputSend' type='text' onChange={e => setMessage(e.target.value)} value={message} />


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
        <div className='boxBodyHome'>
          <h2>Conectados</h2>

          <div className='userContent'>
            {/* {users.map((user, index) =>
              <div key={index} className='userboxContent'>
                <div className='imgAvatar'>
                  <img className="avatarUser" alt='imágen de un avatar' src={userAvatarn} />
                </div>

                <p className='nameuserconect'>{user.name_user}</p>
                <div className='divstatus'>
                  <div className='status'></div>
                </div>

              </div>
            )} */}
          </div>

        </div>
      </div>

    </div>
  )
}
