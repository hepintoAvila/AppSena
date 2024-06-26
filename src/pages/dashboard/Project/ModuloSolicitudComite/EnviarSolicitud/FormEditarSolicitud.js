// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Row, Col, Card, Collapse } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
// components
import { VerticalForm, FormInput } from '../../../../../components';
import HyperDatepicker from '../../../../../components/Datepicker';
import FileUploader from '../../../../../components/FileUploader';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import FormDatosAprendiz from './FormDatosAprendiz';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';

const FormEditarSolicitud = (props): React$Element<React$FragmentType> => {
    const children = props.children || null;
    const childrenEvidencias = props.childrenEvidencias || null;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [options, setOptions] = useState(0);

    const { openFormAprendiz,convertirFecha } = useContext(NotificacionesContext);
    const {getData} = useContext(NotificacionesContext)
    const { validateError, setError, queryFile, loading, nombrePrograma, descripcion, fallas } =
        useContext(SearchContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const datosAprendiz = props?.itemsConsultarSolicitudByCodigo?.data?.Solicitudes || [];
    const [documentos, setAttachments] = useState({
        attachments: [
            { id: 1, name: 'Cargando...', size: '', ext: '.pdf' },
        ],
    });
    const [open, setOpen] = useState(false);

    const toggle = (id) => {
        setOptions(id)
        setOpen((prevState) => !prevState);
    };

    const update = (e,opcion) => {
        const datosEvent = {
            idSolicitud:props?.idSolicitud,
            opcionUpdate:opcion,
            nombrePrograma,
            ...items[0],
            ...fallas[0],
            e:e,
            codigoFicha:props?.codigoFicha,
            accion: 'ModuloSolicitudComite',
            opcion: 'updateSolicitud',
            tipo: 'updateSolicitud',
        }
        //console.log('datosEvent',datosEvent)
        Swal.fire({
            title: 'Desea actualizar este registro',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
                  const queryDatos = datosEvent
                  ? Object.keys(datosEvent)
                      .map((key) => key + '=' + btoa(datosEvent[key]))
                      .join('&')
                  : '';
                  Swal.fire({
                    position: 'center',
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

    };

    const deleteDocumento = (id) => {

        Swal.fire({
            title: id==='1' ? 'Desea eliminar los hechos' : 'Desea eliminar el formato de solicitud',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
             const datosEvent = {
                idOpcion:id,
                codigoFicha:props?.codigoFicha,
                accion: 'ModuloSolicitudComite',
                opcion: 'deleteSolicitud',
                obj: 'deleteFile',
               }
                  const queryDatos = datosEvent
                  ? Object.keys(datosEvent)
                      .map((key) => key + '=' + btoa(datosEvent[key]))
                      .join('&')
                  : '';
                  Swal.fire({
                    position: 'center',
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
    const [items, setItems] = useState([
        {
            idAprendiz: '',
            tipoComite: '',
            tipoAtencion: '',
            fechaIncidente: '',
            accion: 'ModuloSolicitudComite',
            opcion: 'add_solicitud',
            tipo: 'EnviarSolicitud',
            selectedFile: '',
            base64String: '',
            descripcion: '',
            nombrePrograma: '',
        },
    ]);


    const schemaResolver = yupResolver(yup.object().shape({}));




    const onDateChangefechaIncidente = (e, fechaError) => {

  //console.log(e);
        if (e) {
            setSelectedDate(e);
            setError({ ...validateError, fechaError: fechaError });

            setItems([
                {
                    ...items[0],
                    fechaIncidente:convertirFecha(`${e}`),
                    e: convertirFecha(`${e}`),
                    idAprendiz: props?.idAprendiz,
                    descripcion: descripcion,
                    nombrePrograma: nombrePrograma,
                },
            ]);

        }

    };

    const onDateChangeFile = (file, base64String, filesError, base64StringsError,options) => {
        if (file) {
            setError({ ...validateError, filesError: filesError, base64StringsError: base64StringsError });
            Swal.fire({
                title: 'Desea subir este documento?',
                showCancelButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                    const datosfiles = {
                        codigoFicha:props?.codigoFicha,
                        idSolicitud:props?.idSolicitud,
                        options: options,
                        accion: 'ModuloSolicitudComite',
                        opcion: 'add_documentos',
                        tipo: 'add_documentos',
                        selectedFile: file,
                    };
                    const queryDatos = datosfiles
                    ? Object.keys(datosfiles)
                          .map((key) => key + '=' + btoa(datosfiles[key]))
                          .join('&')
                    : '';
                    queryFile(queryDatos, base64String);

                }
              });
        }
    };
    const onChangeTipoAtencion = (value, tipoAtencionError) => {
        if (value) {
            setError({ ...validateError, tipoAtencionError: tipoAtencionError });
            setItems([
                {
                    ...items[0],
                    tipoAtencion: value,
                    idAprendiz: props?.idAprendiz,
                    descripcion: descripcion,
                    nombrePrograma: nombrePrograma,
                },
            ]);
        }
    };
    const onChangeTipoComite = (value, comiteError) => {
        if (value) {
            setError({ ...validateError, comiteError: comiteError });
            setItems([
                {
                    ...items[0],
                    tipoComite: value,
                    idAprendiz: props?.idAprendiz,
                    descripcion: descripcion,
                    nombrePrograma: nombrePrograma,
                },
            ]);
        }
    };
    useEffect(() => {
        const obj = [
            {
                ...items[0],
                descripcion: descripcion,
            },
        ];
        setItems(obj);
    }, [descripcion, items]);

    useEffect(() => {
        const objnombrePrograma = [
            {
                ...items[0],
                nombrePrograma: nombrePrograma,
            },
        ];
        setItems(objnombrePrograma);
    }, [items, nombrePrograma]);

    useEffect(() => {
        if (datosAprendiz.length === 1) {
            const objet = [
                {
                    idAprendiz: datosAprendiz[0]?.idAprendiz,
                    aprendiz: datosAprendiz[0]?.aprendiz,
                    tipoComite: datosAprendiz[0]?.tipoSolicitud,
                    tipoAtencion: datosAprendiz[0]?.tipoAtencion,
                    fechaIncidente: datosAprendiz[0]?.fechaSolicitud,
                    fechaHora: datosAprendiz[0]?.fechaHora,
                    accion: 'ModuloSolicitudComite',
                    opcion: 'add_solicitud',
                    tipo: 'EnviarSolicitud',
                    selectedFile: '',
                    base64String: '',
                    descripcion: datosAprendiz[0]?.hechos,
                    nombrePrograma: datosAprendiz[0]?.nombrePrograma,
                    sancionesAprendiz: datosAprendiz[0]?.sancionesAprendiz,
                },
            ];

            setAttachments({ attachments: datosAprendiz[0]?.attachments });
            setItems(objet);
        }
    }, [datosAprendiz]);

 //console.log({...items[0]})
    return (
        <>
            {loading ? (
                <Redirect to={`/ModuloSolicitudComite/EnviarSolicitud?p=${items[0]?.idAprendiz}`}></Redirect>
            ) : null}
            <VerticalForm
                resolver={schemaResolver}
                defaultValues={{}}
                className={classNames('col-4')}>
                            <label className={classNames('editTitulos')}>
                                <i class="mdi mdi-account-check mb-4"></i>
                                {items[0]?.aprendiz}
                            </label>
                            <Row>
                            <div className="mb-0 col-8">{children}</div><div className="uploadSolicitudAprendiz col-4 avatar-sm"><span className="avatar-title bg-primary-lighten text-primary rounded"><i className="mdi dripicons-cloud-upload" onClick={()=>{update(props?.idAprendiz,'datosAprendiz')}}></i></span></div>
                            </Row>
                            <Collapse in={openFormAprendiz}>
                                <div>
                                    {!props?.aprendizError ? (
                                        <div className="isinvalid">SELECCIONE EL APRENDIZ</div>
                                    ) : null}
                                    <FormDatosAprendiz
                                        handleClick={props.handleClick}
                                        datosAprendiz={props.datosAprendiz}
                                        swEdit={1}
                                        edit={items}
                                    />
                                </div>
                            </Collapse>
                <Row>
                    <Card className={classNames('widget-flat')}>
                        <Card.Body>
                                <br />
                                <label> Seleccione el tipo de falta:</label>
                                <label className={classNames('editTitulos')}>
                                    <i class="mdi mdi-account-check"></i>
                                    {items[0]?.tipoComite}
                                </label>
                                <Row className="align-items-center">
                                <div className="mb-0 col-8">
                                <FormInput
                                    name="tipoComite"
                                    label=""
                                    type="select"
                                    containerClass="mb-3"
                                    className="form-select"
                                    key="tipoComite"
                                    isInvalid={!validateError.comiteError}
                                    onChange={(e) => onChangeTipoComite(e.target.value, true)}>
                                    <option>Seleccione...</option>
                                    <option value="ACADEMICO"> ACADEMICO</option>
                                    <option value="DISCIPLINARIO">DISCIPLINARIO</option>
                                    <option value="ACADEMICO Y DISCIPLINARIO">ACADEMICO Y DISCIPLINARIO</option>
                                </FormInput></div><div className="uploadSolicitud col-4 avatar-sm"><span className="avatar-title bg-primary-lighten text-primary rounded"><i className="mdi dripicons-cloud-upload" onClick={()=>{update(items[0]?.tipoComite,'datosTipoComite')}}></i></span></div>
                                </Row>
                                <hr />
                                <Row className="align-items-center">
                                <label>Seleccione la calificación de la falta:</label>
                                <label className={classNames('editTitulos')}>
                                    <i class="mdi mdi-account-check"></i>
                                    {items[0]?.tipoAtencion}
                                </label>
                                <div className="mb-0 col-8">
                                <FormInput
                                    name="tipoAtencion"
                                    label=""
                                    type="select"
                                    containerClass="mb-3 font-weight-bold"
                                    className="form-select"
                                    key="tipoAtencion"
                                    isInvalid={!validateError.tipoAtencionError}
                                    onChange={(e) => onChangeTipoAtencion(e.target.value, true)}>
                                    <option>Seleccione...</option>
                                    <option value="Leve">Leve</option>
                                    <option value="Grave">Grave</option>
                                    <option value="Gravisimas">Gravísimas</option>
                                </FormInput></div><div className="uploadSolicitud col-4 avatar-sm"><span className="avatar-title bg-primary-lighten text-primary rounded"><i className="mdi dripicons-cloud-upload" onClick={()=>{update(items[0]?.tipoAtencion,'datosTipoAtencion')}}></i></span></div>
                                </Row>
                                <hr />
                                <Row className="align-items-center">
                                <label>Fecha y Hora de los Hechos:</label>
                                <label className={classNames('editTitulos')}>
                                    <i class="mdi mdi-account-check"></i>
                                    {items[0]?.fechaIncidente}
                                </label>
                                <div className="mb-0 col-8">
                                    <HyperDatepicker
                                        label=""
                                        name="fechaIncidente"
                                        hideAddon={true}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        tI={60}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                        className="form-control"
                                        value={selectedDate}
                                        onChange={(date) => onDateChangefechaIncidente(date, true)}
                                    /></div><div className="uploadSolicitud col-4 avatar-sm"><span className="avatar-title bg-primary-lighten text-primary rounded"><i className="mdi dripicons-cloud-upload" onClick={()=>{update(items[0]?.fechaIncidente,'datosFechaIncidente')}}></i></span></div>
                                    <div className="mb-0 col-8">
                                    {!validateError.fechaError ? (
                                        <div className="isinvalid text-100">SELECCIONE LA FECHA Y HORA HECHOS</div>
                                    ) : (
                                        ''
                                    )}</div>
                                    </Row>


                            <hr />

                            <h5 className="mb-3">Documentos Cargados</h5>
                            <Row>
                                {documentos?.attachments?.map((f, idx) => {
                                    return (
                                        <Col xl={4} key={idx}>
                                            <Card className="mb-1 shadow-none border">
                                                <div className="p-2">
                                                    <Row className="align-items-center">

                                                        <Col className="col-auto">

                                                                {f.size === '1' ? (
                                                                    <div className="avatar-sm">
                                                                    <span className="avatar-title bg-primary-lighten text-primary rounded">
                                                                    <Link
                                                                    to="#"
                                                                    className="custom-accordion-title d-block pt-2 pb-2"
                                                                    onClick={()=>{deleteDocumento(f.id)}}
                                                                    >
                                                                    <i className="mdi mdi-delete-sweep"></i>
                                                                </Link>
                                                                </span>
                                                            </div>
                                                                ) : (
                                                                    <div className="avatar-sm">
                                                                    <span className="avatar-title bg-primary-lighten text-primary rounded">
                                                                    <Link
                                                                        to="#"
                                                                        className="custom-accordion-title d-block pt-2 pb-2"
                                                                        onClick={()=>{toggle(f.id)}}
                                                                        aria-controls={'collapse 1'}
                                                                        aria-expanded={open}>
                                                                        <i className="mdi mdi-file-upload-outline"></i>
                                                                    </Link>
                                                                    </span>
                                                                    </div>
                                                                )}

                                                        </Col>
                                                         <Col className="col ps-0">
                                                          <p className="mb-0 text-muted font-weight-bold">{f.name}</p>
                                                        </Col>

                                                    </Row>
                                                </div>
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </Row>
                            <hr />
                            <Collapse in={open}>
                                <Row>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <FileUploader
                                                    onFileUpload={(e) => {
                                                        const files = Array.from(e);
                                                        const file = files[0];
                                                        const reader = new FileReader();
                                                        reader.readAsArrayBuffer(file);
                                                        // Cuando la lectura del archivo termine
                                                        reader.onload = function () {
                                                            // Convertir el contenido del archivo a una cadena base64
                                                            const base64String = btoa(
                                                                new Uint8Array(reader.result).reduce(
                                                                    (data, byte) => data + String.fromCharCode(byte),
                                                                    ''
                                                                )
                                                            );

                                                            onDateChangeFile(
                                                                JSON.stringify(file),
                                                                base64String,
                                                                true,
                                                                true,
                                                                options
                                                            );
                                                        };

                                                        //
                                                    }}
                                                />
                                                {!validateError.filesError && !validateError.base64StringsError ? (
                                                    <div className="isinvalid">
                                                        <p className="text-white font-13 m-b-30">
                                                            CARGUE LA EVIDENCIA EN PDF
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <h4 className="header-title mb-3">documento subido</h4>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Collapse>
                            <Row>
                                <Col>
                                    <label className={classNames('editTitulos')}>
                                        <i class="mdi mdi-account-check"></i>
                                        {items[0]?.descripcion}
                                    </label>
                                    <div className="mb-4">{childrenEvidencias}</div>

                                </Col>
                                <div className="mb-0 col-10"></div><div className="uploadSolicitud col-2 avatar-sm"><span className="avatar-title bg-primary-lighten text-primary rounded"><i className="mdi dripicons-cloud-upload" onClick={()=>{update(items[0]?.descripcion,'datosDescripcion')}}></i></span></div>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
            </VerticalForm>
        </>
    );
};

export default FormEditarSolicitud;
