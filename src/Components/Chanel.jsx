import React, { useState, useEffect,useCallback } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import chanelImg from '../images/chanel.png';
import { socket } from './conection';



export const Chanel = () => {
  const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

  const { register, handleSubmit, reset } = useForm();

  const [nameChanel, setNameChanels] = useState([]);

  const [nameChanelBd, setNameChanelsBd] = useState([]);

  const [nameChanelGn, setNameChanelsGn] = useState([]);
  // const [loading, setLoading] = useState(true);


  const onSubmitChanel = async (objectChanel) => {
    console.log(' 123',objectChanel);
    const chanelUser = {
      namechanel: "#" + objectChanel.namechanel,
      idDueño: sessionUser.id
    }
  
    const res = await axios.post('http://localhost:4000/chanel', chanelUser);
    
    socket.emit('nameChanel', chanelUser);
    reset();
  }

  useEffect(() => {

    const fetchData = async () => {

      try {
        const { data: response } = await axios.get('http://localhost:4000/chanel');

        setNameChanelsBd(response);
   
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  },[ ]);


  const receiveChanel = useCallback((chanelSocket) => {

    setNameChanels(chanelSocket);
    // setNameChanels((prevState) => [...prevState, chanelSocket]);
    setNameChanels([...nameChanel,...nameChanelBd]);
 
   
    //  this.setNameChanelsBd(state => [...state, nameChanel]);

  }, [setNameChanels])


  useEffect(() => {

    socket.on('namesChanels', receiveChanel)
  }, [receiveChanel]);




console.log('wwwwww',nameChanel);
  return (

    <div className='boxBodyHome'>
      <h2>Canales</h2>
      <div className='createChanel'>
        <form onSubmit={handleSubmit(onSubmitChanel)}>
          <input className='inputChanel' type='text' {...register('namechanel', { required: true })} />
          {/* {errors.nameChanel?.type === 'required' && <label>'Este campo es requerido'</label>} */}
          <input className='buttonChanel' type='submit' value='crear' />
        </form>

      </div>
      <div className='boxChanel'>
        {nameChanelBd.map((chanel, index) => (
          <div key={index} className='nameChanel' >
            <img className="avatar" alt='imágen de un avatar' src={chanelImg} />
            <p className='nameChanelP'>{chanel.namechanel}</p>
          </div>
        ))}

      </div>

    </div>

  )
}
