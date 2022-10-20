import React, { useState } from 'react'

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import userAvatarn from '../images/user.png';
import axios from 'axios';


export const ModalUser = ({ show, handleClose }) => {
    const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

    const [images, setImages ] = useState([]);    
    const [ imageToRemove, setImageToRemove ] = useState(null);

    console.log(images);
    function handleRemoveImg(imgObj){
        setImageToRemove(imgObj.public_id);
        axios.delete(`http://localhost:4000/${imgObj.public_id}`)
        .then((response) => {  
              
            setImages({});
        })
           .catch(error => {
              console.error(error.message);
           })  
    }

    function handleOpenWidget(){
        var myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dv95g7xon', 
            uploadPreset: 'chatOwl'}, (error, result) => { 
              if (!error && result && result.event === "success") { 
                setImages({
                    url: result.info.url,
                    public_id: result.info.public_id 
                });
                console.log('Done! Here is the image info: ', result.info); 
              }
            }
          );
          myWidget.open();
    }

    return (
        <div>           
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tu nombre..."
                                autoFocus
                                defaultValue={sessionUser.name}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Agrega una imagen</Form.Label>
                            <div className='backImg'>
                                <div className='boxWhite'> 

                                    {images.url  &&
                                    <i  className='fa fa-times close-icon iconClose' 
                                        onClick={()=> handleRemoveImg(images)}>
                                    </i>
                                    }     

                                    <img className='imgPerfilUser' src={!images.url ? userAvatarn : images.url } alt='imagen del usuario' />
                                </div>
                            </div>
                          
                            <Button id="upload_widget" className="cloudinary-button" onClick={() =>handleOpenWidget()}>
                                    Upload  Image
                            </Button>  

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button className='buttonModal' variant="primary" onClick={handleOpenWidget}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
