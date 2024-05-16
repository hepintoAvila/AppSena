/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
//import Swal from 'sweetalert2';


import Table from '../../../../../components/Table';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import BtnSeccionAction from './BtnSeccionAction';

const ActionColumnAgendada = ({ row }) => {

  const {
    isChecked, isCheckedItem,
    validated, SelectItmeSolicitud
  } = useContext(DashboardContext);

  let permiso = sessionStorage.getItem('PERMISO');
  const localPermiso = JSON.parse(permiso);
  const obj = {
    isChecked,
    isCheckedItem,
    SelectItmeSolicitud,
    localPermiso,
    validated,
    key: row.cells[0].value,
    row: row.cells[0].value,
    name: row.cells[1].value,
    email: row.cells[2].value,
  }
  return (
    <React.Fragment>
      <BtnSeccionAction obj={obj}>
      </BtnSeccionAction>
    </React.Fragment>
  );
};
const ListSolicitudes = (props): React$Element<React$FragmentType> => {
  const colAgendar = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Aprendiz',
      accessor: 'aprendiz',
      sort: true,
    },
    {
      Header: 'Tipo Solicitud',
      accessor: 'tipoSolicitud',
      sort: true,
    }
    , {
      Header: 'Tipo de Atención',
      accessor: 'tipoAtencion',
      sort: false,
    },
    {
      Header: 'Fecha Solicitud',
      accessor: 'fechaSolicitud',
      sort: false,
    },
    {
      Header: 'Fecha Hora Agendada',
      accessor: 'fechaHoraAgendada',
      sort: false,
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumnAgendada,
    },

  ];
  const [agendada, setAgendada] = useState([])
  const { itemsSolicitudes, query } = useContext(NotificacionesContext)
  const {
    sizePerPageList
  } = useContext(DashboardContext);

  const datos = itemsSolicitudes?.data?.Solicitudes || [{}];

  useEffect(() => {
    query('ModuloSolicitudComite', 'EnviarSolicitud', [{ opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitud', sw: '1' }]);
  }, [query])

  useEffect(() => {
    const filteredAgendada = datos?.filter((row) => {
      return row?.estado === 'AGENDADA';
    });
    setAgendada(filteredAgendada)
  }, [datos])

  return (
    <>
      <Row>
        <Col sm="12">
          {agendada?.length > 0 && <Table
            columns={colAgendar}
            data={agendada}
            pageSize={5}
            sizePerPageList={sizePerPageList}
            isSortable={true}
            pagination={true}
            theadClass="table-light"
            searchBoxClass="mt-2 mb-3"
            isSearchable={true}
            nametable={'table_1'}
            titleTable={'LISTADO DE NOTIFICACIONES'}
          />}
        </Col>
      </Row>

    </>
  );
};

export default ListSolicitudes;
