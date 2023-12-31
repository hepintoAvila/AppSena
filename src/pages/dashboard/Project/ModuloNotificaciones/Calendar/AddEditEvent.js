// @flow
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../../../components/FormInput';

// components
 
type AddEditEventProps = {
    isOpen?: boolean,
    onClose?: () => void,
    isEditable?: boolean,
    eventData?: any,
    onRemoveEvent?: () => void,
    onUpdateEvent: (value: any) => void,
    onAddEvent: (value: any) => void,
};

const AddEditEvent = ({
    isOpen,
    onClose,
    isEditable,
    eventData,
    onRemoveEvent,
    onUpdateEvent,
    onAddEvent,
}: AddEditEventProps): React$Element<any> => {
    // event state
    const [event] = useState(eventData);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            title: yup.string().required('Please enter event name'),
            className: yup.string().required('Please select category'),
        })
    );

    /*
     * form methods
     */
    const methods = useForm({ defaultValues: event, resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    /*
     * handle form submission
     */
    const onSubmitEvent = (data) => {
        isEditable ? onUpdateEvent(data) : onAddEvent(data);
    };

    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
            <Modal.Header className="pb-2 px-4 border-bottom-0" closeButton>
                <Modal.Title id="modal-title">
                    <h5> {isEditable ? 'Edit Cita' : 'Nueva Cita'} </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 pb-4 pt-0">
                <form noValidate name="chat-form" id="chat-form" onSubmit={handleSubmit(onSubmitEvent)}>
                <Row>
                    <Col md={6}>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                 <p className="text-muted mb-1 font-13">
                                 <h5>CÓDIGO: 0001</h5>
                                </p>
                            </li>
                            <li className="mb-2">
                                <p className="text-muted mb-1 font-13">
                                <h5>Instructor: MARIA BUITRAGO</h5>
                                </p>
                            </li>
                            <li className="mb-2">
                                <p className="text-muted mb-1 font-13">
                                <h5>Aprendiz: HOSMMER EDUARDO PINTO ROJAS</h5>
                                </p>
                            </li>
                            <li className="mb-2">
                                <p className="text-muted mb-1 font-13">
                                <h5>Fecha del Incidente: 2023-02-23 10:55:00</h5>
                                </p>
                            </li>
                        </ul>
                    </Col>
                    <Col md={6}>
                    <FormInput
                                    label="Observaciones"
                                    type="textarea"
                                    name="Observaciones"
                                    rows="5"
                                    containerClass={'mb-3'}
                                    key="Observaciones"
                                />
                    </Col>
                </Row>
                    <Row>
                        <Col sm={12}>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                 <p className="text-muted mb-1 font-13">
                                 <h5>DATOS DE LA REUNIÓN</h5>
                                </p>
                            </li>
                        </ul>      
                            <FormInput
                                type="date"
                                label="Fecha de la Cita"
                                name="fechaCita"
                                className="form-control"
                                placeholder="Insert Event Name"
                                containerClass={'mb-3'}
                                key="fechaCita"
                            />
                             <FormInput
                                type="time"
                                label="Hora de la Cita"
                                name="horaCita"
                                className="form-control"
                                placeholder="Insert Event Name"
                                containerClass={'mb-3'}
                                key="horaCita"
                            />
                        </Col>
                        <Col sm={12}>
                            <FormInput
                                type="select"
                                label="Tiempo estipulado de la reunión"
                                name="className"
                                className="form-control"
                                containerClass={'mb-3'}
                                register={register}
                                key="className"
                                errors={errors}
                                control={control}>
                                <option value="bg-danger">15 minutos</option>
                                <option value="bg-success">30 minutos</option>
                                <option value="bg-primary">45 minutos</option>
                                <option value="bg-info">1 Hora</option>
                                <option value="bg-dark">2 Horas</option>
                                <option value="bg-warning">3 Horas</option>
                            </FormInput>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={4}>
                            {isEditable ? (
                                <Button variant="danger" onClick={onRemoveEvent}>
                                    Eliminar
                                </Button>
                            ) : null}
                        </Col>
                        <Col xs={8} className="text-end">
                            <Button className="btn btn-light me-1" onClick={onClose}>
                                Cerrar
                            </Button>
                            <Button variant="success" type="submit" className="btn btn-success">
                                Enviar
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEditEvent;
