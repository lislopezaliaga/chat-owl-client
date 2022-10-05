import React, { useState, useEffect } from 'react';
import buhoLogo from '../images/buhoLogo.png';
import exit from '../images/exit.png';
import user from '../images/user.png';
import paper from '../images/paper.png';
import chanel from '../images/chanel.png';
import { useForm } from 'react-hook-form';
import io from "socket.io-client";

const socket = io('http://localhost:4000');
export const Home = () => {

  const { register, handleSubmit } = useForm();

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);

  const handleSubmitInput = (e) => {
    e.preventDefault();
    // console.log(message);
    socket.emit('chatmessage', message);
    const newMessage={
      body:message,
      from:"me"
    }
    setMessages([...messages,newMessage])
    setMessage('');
  }
  useEffect(() => {
    const receiveMessage = message => {
      console.log(message)
      setMessages([...messages,{
        body:message.body,
        from:message.from,
      }])
    }
    socket.on('message', receiveMessage)
    return () => {
      socket.off('message', receiveMessage)
    }
  }, [messages])
  // socket.on('chat message', function(msg) {
  //   // const item = document.createElement('li');
  //   // item.textContent = msg;
  //   // messages.appendChild(item);
  //   // window.scrollTo(0, document.body.scrollHeight);
  //   console.log(msg);
  // });
  // const onCreate = (data) => {
  //   console.log(data);
  // }
  // const saveData = (data) => {
  //   if (input.value) {
  //     socket.emit('chat message', input.value);
  //     input.value = '';
  //   }
  //   console.log(data);
  // }

  // function App(props){
  //   let [inputValue, setInputValue] = useState("")
  //   console.log(inputValue)
  //   return <input type="text"
  //             onChange={(event) => setInputValue(event.target.value)}>
  //          </input>;
  // }

  return (
    <div className='generalContainerHome'>
      <div className='nav'>
        <div className='boxBuhoLogo'>
          <img className="buhoLogo" alt='imágen de un buho con un avión' src={buhoLogo} />
        </div>
        <div className='boxMenu'>
          <div className='boxUser'>
            <img className="avatar" alt='imágen de un avatar' src={user} />
            <p className='nameUser'>Lis</p>
          </div>
          <img className="cerrarSesion" alt='imágen de cerrarSesion' src={exit} />
        </div>
      </div>

      <div className='generalBoxBodyHome'>
        <div className='boxBodyHome'>
          <h2>Canales</h2>
          <div className='createChanel'>
            <form >
              <input className='inputChanel' type='text' />
              {/* {errors.nameChanel?.type === 'required' && <label>'Este campo es requerido'</label>} */}
              <input className='buttonChanel' type='submit' value='crear' />
            </form>

          </div>
          <div className='boxChanel'>
            <div className='nameChanel' >
              <img className="avatar" alt='imágen de un avatar' src={chanel} />
              <p className='nameChanelP'>#Kittychat</p>
            </div>
            <div className='nameChanel' >
              <img className="avatar" alt='imágen de un avatar' src={chanel} />
              <p className='nameChanelP'>#Chanchitos</p>
            </div>
            <div className='nameChanel' >
              <img className="avatar" alt='imágen de un avatar' src={chanel} />
              <p className='nameChanelP'>#Conejitos</p>
            </div>
            <div className='nameChanel' >
              <img className="avatar" alt='imágen de un avatar' src={chanel} />
              <p className='nameChanelP'>#Pulguitas</p>
            </div>
          </div>

        </div>
        <div className='boxMessage'>
          <div className='nameChanelHome'>
            <h2 id='chatNames'>#Kittychat</h2>
          </div>
          <div className='messageContainer'>

            {messages.map((message,index) => (
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
            <div className='imgAvatar'>
              <img className="avatarUser" alt='imágen de un avatar' src={user} />
            </div>
            <p>Pamela Sanchez</p>
            <div className='status'></div>
          </div>
          <div className='userContent'>
            <div className='imgAvatar'>
              <img className="avatarUser" alt='imágen de un avatar' src={user} />
            </div>
            <p>Pamela Sanchez</p>
            <div className='status'></div>
          </div>
          <div className='userContent'>
            <div className='imgAvatar'>
              <img className="avatarUser" alt='imágen de un avatar' src={user} />
            </div>
            <p>Pamela Sanchez</p>
            <div className='status'></div>
          </div>
          <div className='userContent'>
            <div className='imgAvatar'>
              <img className="avatarUser" alt='imágen de un avatar' src={user} />
            </div>
            <p>Pamela Sanchez</p>
            <div className='status'></div>
          </div>



        </div>
      </div>

    </div>
  )
}
