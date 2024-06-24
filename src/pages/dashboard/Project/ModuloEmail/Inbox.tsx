/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-redeclare */
import { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Dropdown, ButtonGroup, Button, OverlayTrigger,Tooltip} from 'react-bootstrap';
import classNames from 'classnames';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Link, useLocation } from 'react-router-dom';
import { Email } from './types';
import LeftSide from './LeftSide';
import { useInbox } from './hooks';
import encodeBasicUrl from '../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';
import EmailDetail from './Detail';


const EmailsList = () => {

  const { querySolicitudByUser,query } = useContext(NotificacionesContext)
  useEffect(() => {
    query('ModuloSolicitudComite', 'querySolicitudByUser', [{ opcion: encodeBasicUrl('querySolicitudByUser'), obj: 'querySolicitudByUser',tipo:encodeBasicUrl('consultar')}]);
}, [query]);
const emails: Email[] = querySolicitudByUser || [{
  'id':1,
  'from_name' : '',
  'from_email': '',
  'subject' : '',
  'number_of_reply' : '',
  'is_important': '',
  'is_read': '',
  'time': '',
  'date': ''}];



    return (

        <ul className="email-list">
            {emails?.map((email, index) => {
                return (
                    <li className={classNames({ unread: !email.is_read })} key={index.toString()}>
                        <div className="email-sender-info">
                            <div className="checkbox-wrapper-mail">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id={'mail' + email.id} />
                                    <label className="form-check-label" htmlFor={'mail' + email.id}></label>
                                </div>
                            </div>

                            <span
                                className={classNames('star-toggle', 'mdi', 'mdi-star-outline', {
                                    'text-warning': email.is_important,
                                })}
                            ></span>
                            <Link to={`/ModuloEmail/details/${email.id}`} className="email-title">
                                {email.from_name}
                                {email.number_of_reply > 1 && <span> ({email.number_of_reply})</span>}
                            </Link>
                        </div>
                        <div className="email-content">
                            <Link to={`/ModuloEmail/details/${email.id}`} className="email-subject">
                                {email.subject}
                            </Link>
                            <div className="email-date">{email.time}</div>
                        </div>
                        <div className="email-action-icons">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <Link to="#">
                                        <i className="mdi mdi-archive email-action-icons-item"></i>
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#">
                                        <i className="mdi mdi-delete email-action-icons-item"></i>
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#">
                                        <i className="mdi mdi-email-open email-action-icons-item"></i>
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#">
                                        <i className="mdi mdi-clock email-action-icons-item"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

const Inbox = () => {
    // handle compose modal
    const location = useLocation();

    const [rutaBase, setRutaBase] = useState('');


    const {
        emails,
        totalEmails,
        startIndex,
        endIndex,
        page,
        totalPages,
        totalUnreadEmails,
        getPrevPage,
        getNextPage,
        showAllEmails,
        showStarredEmails,
    } = useInbox();


    useEffect(() => {
       let partes = location.pathname.split('/');
      let partesFiltradas = partes.filter((part: string) => !(/^\d+$/.test(part)));
      let nuevaRutaBase = partesFiltradas.join('/');
      setRutaBase(nuevaRutaBase);
    }, [location.pathname]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="page-aside-left">
                                <LeftSide
                                    totalUnreadEmails={totalUnreadEmails}
                                    showAllEmails={showAllEmails}
                                    showStarredEmails={showStarredEmails}
                                />
                            </div>
                            <div className="page-aside-right">
                                <ButtonGroup className="me-1 my-1">
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id={'1'}>Archived</Tooltip>}>
                                        <Button variant="secondary">
                                            <i className="mdi mdi-archive font-16"></i>
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id={'2'}>Spam</Tooltip>}>
                                        <Button variant="secondary">
                                            <i className="mdi mdi-alert-octagon font-16"></i>
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger key="bottm" placement="bottom" overlay={<Tooltip id={'3'}>Delete</Tooltip>}>
                                        <Button variant="secondary">
                                            <i className="mdi mdi-delete-variant font-16"></i>
                                        </Button>
                                    </OverlayTrigger>
                                </ButtonGroup>

                                <ButtonGroup as={Dropdown} className="d-inline-block me-1 my-1">
                                    <Dropdown.Toggle variant="secondary" className="arrow-none">
                                        <i className="mdi mdi-folder font-16"></i>
                                        <i className="mdi mdi-chevron-down"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <span className="dropdown-header">Move to:</span>
                                        <Dropdown.Item>Social</Dropdown.Item>
                                        <Dropdown.Item>Promotions</Dropdown.Item>
                                        <Dropdown.Item>Updates</Dropdown.Item>
                                        <Dropdown.Item>Forums</Dropdown.Item>
                                    </Dropdown.Menu>
                                </ButtonGroup>

                                <ButtonGroup as={Dropdown} className="d-inline-block me-1 my-1">
                                    <Dropdown.Toggle variant="secondary" className="arrow-none">
                                        <i className="mdi mdi-label font-16"></i>
                                        <i className="mdi mdi-chevron-down"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <span className="dropdown-header">Label as:</span>
                                        <Dropdown.Item>Social</Dropdown.Item>
                                        <Dropdown.Item>Promotions</Dropdown.Item>
                                        <Dropdown.Item>Updates</Dropdown.Item>
                                        <Dropdown.Item>Forums</Dropdown.Item>
                                    </Dropdown.Menu>
                                </ButtonGroup>

                                <ButtonGroup as={Dropdown} className="d-inline-block me-1 my-1">
                                    <Dropdown.Toggle variant="secondary" className="arrow-none">
                                        <i className="mdi mdi-dots-horizontal font-16"></i> More
                                        <i className="mdi mdi-chevron-down"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <span className="dropdown-header">More Options :</span>
                                        <Dropdown.Item>Mark as Unread</Dropdown.Item>
                                        <Dropdown.Item>Add to Tasks</Dropdown.Item>
                                        <Dropdown.Item>Add Star</Dropdown.Item>
                                        <Dropdown.Item>Mute</Dropdown.Item>
                                    </Dropdown.Menu>
                                </ButtonGroup>
                                {(() => {
                              switch (rutaBase) {
                                case '/':
                                  return <>
                                    <div className="mt-3">

                                      <EmailsList emails={emails} />

                                    </div>

                                    <Row>
                                      <Col sm={7} className="mt-1">
                                        Showing {startIndex} - {endIndex} of {totalEmails}
                                      </Col>
                                      <Col sm={5}>
                                        <ButtonGroup className="float-end">
                                          {page === 1 ? (
                                            <Button variant="light" className="btn-sm" disabled>
                                              <i className="mdi mdi-chevron-left"></i>
                                            </Button>
                                          ) : (
                                            <Button variant="info" className="btn-sm" onClick={getPrevPage}>
                                              <i className="mdi mdi-chevron-left"></i>
                                            </Button>
                                          )}

                                          {page < totalPages ? (
                                            <Button variant="info" className="btn-sm" onClick={getNextPage}>
                                              <i className="mdi mdi-chevron-right"></i>
                                            </Button>
                                          ) : (
                                            <Button variant="light" className="btn-sm" disabled>
                                              <i className="mdi mdi-chevron-right"></i>
                                            </Button>
                                          )}
                                        </ButtonGroup>
                                      </Col>
                                    </Row>
                                  </>
                                  case '/ModuloEmail/details':
                                    return (
                                      <>
                                        <EmailDetail/>
                                      </>)
                                default:
                                  return (
                                    <>
                                      {''}
                                    </>
                                  );
                              }
                            })()
                        }


                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Inbox;
