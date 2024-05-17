import { Pagination, Row } from "react-bootstrap";

import React from "react";
import BtnLink from "../../../components/BtnLink";
import BtnActions from "../../../components/BtnActions";

const BtnActas = (props) => {

  const isbtnLink = props?.obj?.isbtnLink|| 'N';
  const tipo = props?.obj?.tipo || '';
  const descripcionbtnaction = props?.obj?.descripcionbtnaction || '';
  const urlbtnLink =props?.obj?.urlbtnLink || '';

  return (
    <React.Fragment>

      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>

                <BtnActions
                  permisos={'S'}
                  key={`EDITAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'EDITAR'}
                  descripcion={`Editar ${descripcionbtnaction}`}
                  icon={'mdi mdi-square-edit-outline'}
                />
          </Pagination.Item>

          <Pagination.Item>
             <BtnActions
                  permisos={'S'}
                  key={`SOLICITUDES${props?.obj?.key}`}
                  toggleActions={props?.obj?.listarEstudiante}
                  row={props?.obj?.row}
                  titulo={'ASIGNAR'}
                  descripcion={`Asignar Solicitudes de casos al acta del comite`}
                  icon={'mdi mdi-account-alert'}

                />
          </Pagination.Item>
          <Pagination.Item>
             <BtnActions
                  permisos={'S'}
                  key={`ASIGNADOS${props?.obj?.key}`}
                  toggleActions={props?.obj?.listarEstudiante}
                  row={props?.obj?.row}
                  titulo={'ASIGNADOS'}
                  descripcion={`Listado de Solicitudes asignadas al acta del comite`}
                  icon={'mdi mdi-account-check-outline'}

                />
          </Pagination.Item>
          {
        (isbtnLink==='S') ?
        <Pagination.Item>
        <BtnLink
            permisos={'S'}
            key={`${tipo}_${props?.obj?.row}`}
            row={props?.obj?.row}
            url={urlbtnLink}
            titulo={`GENERAR PDF`}
            descripcion={`Genere el Acta en formato pdf`}
            icon={'mdi mdi-file-pdf-box'}
          />
           </Pagination.Item>

        :''
      }
          <Pagination.Item>
             <BtnActions
                  permisos={'S'}
                  key={`ELIMINAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.eliminar}
                  row={props?.obj?.row}
                  titulo={'ELIMINAR'}
                  descripcion={`Eliminar ${descripcionbtnaction}`}
                  icon={'mdi mdi-delete'}

                />
          </Pagination.Item>

      </Pagination>
      </Row>
    </React.Fragment>
  );
}
export default BtnActas;
