/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MenuBtn from '../../components/BtnMenu/MenuBtn';
import avatar1 from '../../../../assets/images/4.png';
import avatar2 from '../../../../assets/images/6.png';
import avatar3 from '../../../../assets/images/5.png';
const ModuloIncidentes = (props) => {

  return (
    <React.Fragment>
           <Row className="justify-content-center">
        <Col lg={7} md={10} sm={11}>
        <div class="grid_contenedor">
                  <div class="grid_btn1 col-xl-3 col-lg-4 col-sm-6">
                    <MenuBtn texto='Enviar Solicitud' image={avatar3} handleClick={props.handleClick} menuRef={'EnviarSolicitud'}/>
                  </div>
                  <div class="grid_btn2 col-xl-3 col-lg-4 col-sm-6" >
                    <MenuBtn texto='Consulta de incidente' image={avatar2} handleClick={props.handleClick} menuRef={'ConsultaIncidente'}/>

                  </div>
                  <div class="grid_btn3 col-xl-3 col-lg-4 col-sm-6">
                    <MenuBtn texto='Reportes' image={avatar1} handleClick={props.handleClick} menuRef={'ReporteIncidente'}/>
                  </div>
                </div> 
        </Col>
      </Row>
    </React.Fragment>
  );
};
ModuloIncidentes.defaultProps = {
  itemsmenu: '/dashboard/ModuloIncidentes/',
};
export default ModuloIncidentes;