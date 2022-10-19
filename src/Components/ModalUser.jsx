import React from 'react'

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import userAvatarn from '../images/user.png';




export const ModalUser = ({ show, handleClose }) => {

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
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Agrega una imagen</Form.Label>
                            <div className='backImg'>
                                <div className='boxWhite'>
                                    <img className='imgPerfilUser' src={userAvatarn} alt='imagen del usuario' />
                                </div>
                            </div>
                          
                            <Form.Control
                                type="file"
                                placeholder="Tu nombre..."
                                autoFocus
                                className='inputFile'
                            />




                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button className='buttonModal' variant="primary" onClick={handleClose}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
