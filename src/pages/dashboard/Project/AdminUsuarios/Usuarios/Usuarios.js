/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect} from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';

import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Swal from 'sweetalert2';


import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';
import Table from '../../../components/Table';

const ActionColumn = ({ row }) => {
  const {
    eliminar,
    validated,
    toggle,
    setOpen,
    setItemsUpdate,
    open, tipo
  } = useContext(DashboardContext);
   const toggleSignUp = (id) => {
    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {

      if(row.cells[0].row.values.id===id)
      setItemsUpdate(row?.cells[0]?.row?.values)
      setOpen(open);
      toggle()
    } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    }
  };

  let permiso = sessionStorage.getItem('PERMISO');
  const localPermiso = JSON.parse(permiso);
  const obj = {
    open,
    toggleSignUp,
    localPermiso,
    validated,
    key:row.cells[0].value,
    row:row.cells[0].value,
    eliminar,
  }
  return (
    <React.Fragment>
      <BtnSeccionAction obj={obj}>
      <FormUpdate
          title={`FORMULARIO PARA LA EDICION DE ${tipo?.toUpperCase()}`}
          validated={validated}
        />
        </BtnSeccionAction>
    </React.Fragment>
  );
};
const Usuarios = (props) => {
  const permisos = props?.permisos || {};
  const {itemsAdminUsuarios,query} = useAdminUsuarios()
  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,
    sizePerPageList,
  } = useContext(DashboardContext);

  const datos = itemsAdminUsuarios?.data?.auteurs || [];
  const roles = itemsAdminUsuarios?.data?.roles || [];


  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Usuarios',
      accessor: 'login',
      sort: true,
    },
    {
      Header: 'Correo Electronico',
      accessor: 'email',
      sort: true,
    }
    , {
      Header: 'Rol',
      accessor: 'rol',
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
  const toggleSignUp = () => {
    {permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION')}
  };
  useEffect(() => {
    query('AdminUsuarios','Usuarios',[{opcion:btoa('listaUsuarios'),obj:'Usuarios'}]);
  }, [query]);


  return (
    <>

      <Row>
        <Col>
          <Card>
            <Card.Body>
            <Row>
                <Col sm={12} className={`${signUpModalAdd ? '' : 'd-lg-none'}`}>
                  <Card>
                    <Card.Body>
                      {/* Sign up Modal */}
                      <Modal show={signUpModalAdd} onHide={setSignUpModalAdd}>
                        <Modal.Body><FormAdd
                            title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                            validated={validated}
                          />
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                </Col>
                <Col sm={8}>
                  <div className="text-sm-end">
                    <Button className="btn btn-dataTable mb-2 me-1" onClick={toggleSignUp}>
                      <i className="mdi mdi-account-plus"> Agregar Usuario</i>
                    </Button>
                  </div>
                </Col>
              </Row>
              {datos?.length > 0 && permisos?.query === 'S' ? (
              localStorage.setItem('roles',JSON.stringify(roles)),


              <Table
                columns={columns}
                data={datos}
                pageSize={25}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-1 mb-2"
                isSearchable={true}
                isVisible={true}
                nametable={props.accion}
                titulo={'LISTADO DE USUARIOS REGISTRADOS'}
                permisos={permisos}
                icons={'dripicons-user'}
              />

          ) : <PermisoAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Usuarios;
