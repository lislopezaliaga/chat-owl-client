import React, { useState, useEffect } from 'react';
import buhoLogo from '../images/buhoLogo.png';
import exit from '../images/exit.png';
import user from '../images/user.png';
import paper from '../images/paper.png';
import chanelImg from '../images/chanel.png';
import { get, useForm } from 'react-hook-form';
import io from "socket.io-client";
import axios from 'axios';
import { json } from 'react-router-dom';

const socket = io('http://localhost:4000');

export const Home = () => {

  const userData = JSON.parse(localStorage.getItem('USER'));

  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([])


  const handleSubmitInput = (e) => {
    e.preventDefault();
    // console.log(message);
    socket.emit('chatmessage', message);
    const newMessage = {
      body: message,
      from: "me"
    }
    setMessages([...messages, newMessage])
    setMessage('');
  }


  useEffect(() => {
    const receiveMessage = message => {
      // console.log(message)
      setMessages([...messages, {
        body: message.body,
        from: message.from,
      }])
    }
    socket.on('message', receiveMessage)
    return () => {
      socket.off('message', receiveMessage)
    }
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('http://localhost:4000/chanel');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, [data]);
  // all user
  useEffect(() => {
    const fetchDataUser = async () => {
      setLoadingUsers(true);
      try {
        const { data: response } = await axios.get('http://localhost:4000/allUsers');
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoadingUsers(false);
    }

    fetchDataUser();
  }, [data]);

  // console.log(users);
  const onSubmitChanel = async (datUser) => {
    const objUser = {
      nameChanel: "#" + datUser.nameChanel,
      idDueño: userData.id
    }
    const res = await axios.post('http://localhost:4000/chanel', objUser)
    console.log(res);
  }


  // const chanelsDate = async( ) => {
  //   const res =  await axios.get('http://localhost:4000/allUsers');
  //   console.log(res);

  // }
  // chanelsDate();

  return (
    <div>
      <div className='nav'>
        <div className='boxBuhoLogo'>
          <img className="buhoLogo" alt='imágen de un buho con un avión' src={buhoLogo} />
        </div>
        <div className='boxMenu'>
          <div className='boxUser'>
            <img className="avatar" alt='imágen de un avatar' src={user} />
            <p className='nameUser'>{userData.name}</p>
          </div>
          <img className="cerrarSesion" alt='imágen de cerrarSesion' src={exit} />
        </div>
      </div>

      <div className='generalBoxBodyHome'>
        <div className='boxBodyHome'>
          <h2>Canales</h2>
          <div className='createChanel'>
            <form onSubmit={handleSubmit(onSubmitChanel)}>
              <input className='inputChanel' type='text'  {...register('nameChanel', { required: true })} />
              {/* {errors.nameChanel?.type === 'required' && <label>'Este campo es requerido'</label>} */}
              <input className='buttonChanel' type='submit' value='crear' />
            </form>

          </div>
          <div className='boxChanel'>
            {data.map((chanel, index) => (
              <div key={index} className='nameChanel' >
                <img className="avatar" alt='imágen de un avatar' src={chanelImg} />
                <p className='nameChanelP'>{chanel.name}</p>
              </div>
            ))}

          </div>

        </div>
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
              {users.map((user, index) =>
              <div>
                <div  key={index} className='imgAvatar'>
                  <img className="avatarUser" alt='imágen de un avatar' src={user} />
                </div>
                <p>{user.name_user}</p>
                <div className='status'></div>
                </div>
                )}                
            </div>
        
        </div>
      </div>

    </div>
  )
}
