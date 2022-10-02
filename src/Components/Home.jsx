import React from 'react';
import buhoLogo from '../images/buhoLogo.png';
import exit from '../images/exit.png';
import user from '../images/user.png';
import paper from '../images/paper.png';
import chanel from '../images/chanel.png';
import { useForm } from 'react-hook-form';

export const Home = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }
  const onCreate = (data) => {
    console.log(data);
  }
  const saveData = (data) => {
    console.log(data);
  }
  
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
            <form onSubmit={handleSubmit(onCreate)}>
              <input className='inputChanel' type='text' {...register('nameChanel', { required: true })} />
              {errors.nameChanel?.type === 'required' && <label>'Este campo es requerido'</label>}
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
            <div className='messageContent'>
              <label className='nameMessage'>Daniela</label>
              <div className='message'>
                <p className='textMessage'>Hola Como estas</p>
              </div>
            </div>

            <div className='messageContent'>
              <label className='nameMessage'>Pao</label>
              <div className='message'>
                <p className='textMessage'>Durmiendo</p>
              </div>
            </div>
            <div className='messageContent'>
              <label className='nameMessage'>Gaby</label>
              <div className='message'>
                <p className='textMessage'>Pero debemos avanzar</p>
              </div>
            </div>
            <div className='messageContent'>
              <label className='nameMessage'>Eli</label>
              <div className='message'>
                <p className='textMessage'>Como siempre Pollys</p>
              </div>
            </div>
            <div className='sendText'>
              
                <input className='inputSend' type='text' />
           
                
                  <div className='boxpaper'>
                  <button type='submit' onClick={saveData()}>
                    <img className="paper" alt='imágen de un avatar' src={paper} />
                    </button>

                  </div>
               


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
