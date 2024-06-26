/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext} from 'react';
import { Row, Col, Card, Modal,  } from 'react-bootstrap';
import Swal from 'sweetalert2';


import Table from '../../../../../components/Table';

 import ViewPdf from '../Components/ViewPdf';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import BtnSeccionPdf from '../../../../../components/BtnSeccionPdf';
import FormEditarSolicitud from '../EnviarSolicitud/FormEditarSolicitud';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';

const ActionColumn = ({ row }) => {
  const { setCodigoFicha, setModal,getData,query } = useContext(NotificacionesContext)

  const toggleSignUp = (codigoFicha, titulo) => {

    if (row?.cells[1]?.row?.values?.codigoFicha === codigoFicha) {
      if (titulo === 'FORMATO') {
        query('ModuloSolicitudComite', 'EnviarSolicitud', [{ opcion: encodeBasicUrl('ActualicePdfSolicitud'), obj: 'statusPdf', codigoFicha: encodeBasicUrl(codigoFicha) }]);
        //ANTES DE ABRIR EL MODAL UPDATE el pdf del formato
        Swal.fire({
          position:'center',
          icon: 'success',
          title: 'Enviado Solicitud...',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(function () {
          setCodigoFicha({ codigoFicha: codigoFicha, titulo: titulo, idSolicitud: row?.cells[0]?.row?.values?.id })
          setModal(true);
        }, 2000);

      } else {
        setCodigoFicha({ codigoFicha: codigoFicha, titulo: titulo, idSolicitud: row?.cells[0]?.row?.values?.id })
        setModal(true);
      }

      //Swal.fire(`ESTA EN ESPERA DEL CONCEPTO...${codigoFicha}`);
    } else {
      Swal.fire(`ESTA EN ESPERA DEL CONCEPTO...${row?.cells[1]?.row?.values?.codigoFicha}-${titulo}`);
    }
  };

  const EditDelete = (codigoFicha, titulo) => {

    if (row?.cells[1]?.row?.values?.codigoFicha === codigoFicha) {

      if(titulo==='DELETE'){
        const id = row?.cells[0]?.row?.values?.id
        Swal.fire({
            title: 'Desea eliminar el registro? ' + id,
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
             const datosEvent = {
                idSolicitud:id,
                accion: 'ModuloSolicitudComite',
                opcion: 'deleteSolicitud',
                obj: 'deleteSolicitud',
               }
                  const queryDatos = datosEvent
                  ? Object.keys(datosEvent)
                      .map((key) => key + '=' + btoa(datosEvent[key]))
                      .join('&')
                  : '';
                  Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Enviado Solicitud...',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(function () {
                    getData(queryDatos)
                  }, 2000);
            }
          });
      }

      if(titulo==='EDITAR'){

        query('ModuloSolicitudComite', 'EnviarSolicitud', [{ opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitudByCodigo',sw:'6',codigoFicha: encodeBasicUrl(codigoFicha)}]);
        setCodigoFicha({ codigoFicha: codigoFicha, titulo: titulo,idSolicitud: row?.cells[0]?.row?.values?.id })
        setModal(true);
      }

    } else {
      Swal.fire(`ESTA EN ESPERA DEL CONCEPTO...${row?.cells[1]?.row?.values?.codigoFicha}-${titulo}`);
    }
  };
  const obj = {
    toggleSignUp,
    EditDelete,
    codigoFicha:row?.cells[1]?.row?.values?.codigoFicha,
    key:row.cells[0].value,
    row:row.cells[0].value,
  }
  return (
    <React.Fragment>
      <BtnSeccionPdf obj={obj}>
      </BtnSeccionPdf>
    </React.Fragment>
  );
};
const CarSolicitudeEnviadas = (props) => {
  //const permisos = props.permisos || {};
  const {codigoFicha,modal,setModal,itemsConsultarSolicitudByCodigo} = useContext(NotificacionesContext)



  const datos = props?.Solicitudes|| [{id:1,
    codigoFicha:'0001',
    aprendiz:'SR',
    estado:'SR',
    fechaHora:'0000-00-00 00 00',
    fechaHoraAgendada:'0000-00-00 00 00',
    tipoAtencion:'ST'
  }];

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },{
      Header: 'Código',
      accessor: 'codigoFicha',
      sort: true,
    },
    {
      Header: 'Aprendiz',
      accessor: 'aprendiz',
      sort: true,
    },
    {
      Header: 'Estado',
      accessor: 'estado',
      sort: true,
    }
    , {
      Header: 'Fecha Solicitud',
      accessor: 'fechaSolicitud',
      sort: false,
    },
    {
      Header: 'Fecha Agendada',
      accessor: 'fechaHoraAgendada',
      sort: false,
    },
    {
        Header: 'Calificación',
        accessor: 'tipoAtencion',
        sort: false,
      },
    {
      Header: 'Acciones',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
  ];
  const onClose = () => {
    setModal(false);
};
 console.log(datos);
  return (
    <>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {datos?.length > 0 && <Table
                    columns={columns}
                    data={datos}
                    pageSize={5}
                    sizePerPageList={props.sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    theadClass="table-light"
                    searchBoxClass="mt-2 mb-3"
                    isSearchable={true}
                    nametable={'table1'}
                    titleTable={'HISTORIAL DE INCIDENCIAS'}
  />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Modal show={modal} fullscreen={codigoFicha?.titulo==='EDITAR'? false:true} onHide={onClose} >
          <Modal.Body>
          <Modal.Header onClick={onClose}>
                    <h4 className="modal-description">{codigoFicha?.titulo}</h4>
                  </Modal.Header>
            {(() => {
              switch (codigoFicha?.titulo) {
                case 'EVIDENCIAS':
                case 'FORMATO':
                  return (<><ViewPdf codigoFicha={codigoFicha?.codigoFicha} titulo={codigoFicha?.titulo} /> </>)
                case 'EDITAR':
                  return (<><FormEditarSolicitud
                   itemsConsultarSolicitudByCodigo={itemsConsultarSolicitudByCodigo}
                   idAprendiz={props?.idAprendiz}
                   itemsDescripcion={props?.itemsDescripcion}
                   aprendizError={props?.aprendizError}
                   descripcionError={props?.descripcionError}
                   children={props?.children}
                   childrenEvidencias={props?.childrenEvidencias}
                   childrenAprendiz={props?.childrenAprendiz}
                   selectedOption={props?.selectedOption}
                   codigoFicha={codigoFicha?.codigoFicha}
                   idSolicitud={codigoFicha?.idSolicitud}
                   handleClick={props?.handleClick}
                   datosAprendiz={props?.datosAprendiz}
                    /> </>)
                default:
                  return (<>{''}</>)
              }
            })()}
          </Modal.Body>
        </Modal>
      </Row>
    </>
  );
};

export default CarSolicitudeEnviadas;
