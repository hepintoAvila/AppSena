// @flow
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Button,  Row, Col, Card, Modal } from 'react-bootstrap';

// components
 
import { useTranslation } from 'react-i18next';
 
import NavbarBuscaAprendiz from '../Components/NavbarBuscaAprendiz';
import { VerticalForm,FormInput } from '../../../../../components';
import HeaderForm from '../Components/HeaderForm';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
 
 
const FormDatosAprendiz = (): React$Element<React$FragmentType> => {
 
    const { t } = useTranslation();
    const { setitemsMenuPrincipal } = useContext(DashboardContext)
    const toggleModal= () => {
   
        const menuitems = window.location.hash.split('#/')[1];
        const [seccion] = menuitems?.split('/');
        const obj = { principal: seccion.length === 0 ? `dashboard/ModuloIncidentes/ConsultarAprendiz` : `dashboard/ModuloIncidentes/ConsultarAprendiz`, seccion: `dashboard/ModuloIncidentes/ConsultarAprendiz` }  
        const urls = seccion.length===0 ? `dashboard/${obj.principal}/`+seccion+''+obj.principal:'/'+seccion+'/'+obj.principal
        
        setitemsMenuPrincipal(seccion)
        return window.location.hash = `dashboard/ModuloIncidentes/ConsultarAprendiz`;   
      }
    return (
        <>
        <Card className={classNames('widget-flat')}>
        <NavbarBuscaAprendiz/>
        <HeaderForm title={'DATOS DEL APRENDIZ'}/>
            <Card.Body>
            
                <Row className="align-items-center">
                    <Col className="col-12">
                <VerticalForm>
                    <FormInput
                        label={t('Nombres')}
                        type="text"
                        name="Nombres"
                        placeholder={t('Nombres')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Apellidos')}
                        type="text"
                        name="Apellidos"
                        placeholder={t('Apellidos')}
                        containerClass={'mb-3'}
                    />
                     <FormInput
                        label={t('Identificacion')}
                        type="text"
                        name="Identificacion"
                        placeholder={t('Identificacion')}
                        containerClass={'mb-3'}
                    />    
                      <FormInput
                        label={t('Celular')}
                        type="text"
                        name="Celular"
                        placeholder={t('Celular')}
                        containerClass={'mb-3'}
                    />                                    
                    <FormInput
                        label={t('Email address')}
                        type="email"
                        name="email"
                        placeholder={t('Enter your email')}
                        containerClass={'mb-3'}
                    />


                </VerticalForm>
                </Col>
                </Row>
                <Row>
                <Col className="col-12">
                <Button variant="primary" type="submit" onClick={() =>toggleModal()}>{'Consultar Historial'}</Button> 
                </Col>
                </Row>
            </Card.Body>
        </Card>
        </>
    );
};

export default FormDatosAprendiz;
