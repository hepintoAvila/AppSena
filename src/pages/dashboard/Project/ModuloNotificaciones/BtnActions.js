// @flow
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
import { useContext } from 'react';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const BtnActions = (props) => {
  const {itemUrl,tipo} = useContext(DashboardContext);
  const popover = (
    <Popover id={props.key}>
      <Popover.Header as="h3">{props.titulo}</Popover.Header>
      <Popover.Body>{props.descripcion}</Popover.Body>
    </Popover>
  );
 
 

  return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover} key={props.key}>
          {
            props.permisos === 'N' ? (
              <Link key={props.key} to={props.url} className="action-icon " onClick={() => props.toggleActions(props.row, props.titulo)}>
                <i className={`${props.icon} pt-2`}></i>
              </Link>) : ''
          }
        </OverlayTrigger>
  );
};
export default BtnActions;