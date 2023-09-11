// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Button,Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2'
// components
import { VerticalForm, FormInput } from '../../../../../components';
import HyperDatepicker from '../../../../../components/Datepicker';
import HeaderForm from '../Components/HeaderForm';
import FileUploader from '../../../../../components/FileUploader';
 
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';


function contarVerdaderos(array) {
    let contador = 0;
    for (let i = 0; i <= array.length; i++) {
      if (array[i] === true) {
        contador++;
      }
    }
    return contador;
  }
const FormDatosIncidente = (props): React$Element<React$FragmentType> => {
    const children = props.children || null;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDatePropuesta, setSelectedDatePropuesta] = useState(new Date());
    
    const {validateError,setError,queryFile,loading} = useContext(SearchContext)
 
    
    const [items, setItems] = useState([{
        idAprendiz: props?.idAprendiz?.length===0 ? '':props?.idAprendiz,
        tipoComite: '',
        tipoLLamado: '',
        fechaIncidente: '',
        accion: encodeBasicUrl('ModuloSolicitudComite'),
        opcion: encodeBasicUrl('add_solicitud'),
        tipo: encodeBasicUrl('EnviarSolicitud'),
        selectedFile:'',
        base64String:'',
        descripcion:props?.itemsDescripcion?.length===0 ? '':props?.itemsDescripcion,
    }]);
 
    const { t } = useTranslation();

 

    const schemaResolver = yupResolver(
        yup.object().shape({
        })
      );
      const onSubmit = () => {
        const obj = Object.values({...validateError})
        let numtrue = contarVerdaderos(obj)

        if(Number(numtrue)===7){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Solicitud Enviada',
                showConfirmButton: false,
                timer: 1500
              })
        const datosfiles = 
            {
                idAprendiz:btoa(items[0].idAprendiz),
                tipoComite:btoa(items[0].tipoComite),
                tipoLLamado:btoa(items[0].tipoLLamado),
                fechaIncidente:btoa(items[0].fechaIncidente),
                accion: btoa('ModuloSolicitudComite'),
                opcion: btoa('add_solicitud'),
                tipo: btoa('EnviarSolicitud'),
                selectedFile:btoa(items[0].selectedFile),
                descripcion:btoa(items[0].descripcion),
            }
            const queryDatos = datosfiles
            ? Object.keys(datosfiles)
              .map((key) => key + '=' + datosfiles[key])
              .join('&')
            : '';
            queryFile(queryDatos, items[0].base64String)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ERROR:: FALTAN CAMPOS POR DILIGENCIAR'
              })
        }

        console.log(numtrue,obj);
       
      };
    useEffect(() => {
         const  comiteError = items[0]?.tipoComite?.length===0 ? false:true
         const  llamadoError = items[0]?.tipoLLamado?.length===0 ? false:true
         const  aprendizError = items[0]?.idAprendiz?.length===0 ? false:true
         const  fechaError = items[0]?.fechaIncidente?.length===0 ? false:true    
         const  fechaPropuestaError = items[0]?.fechaPropuesta?.length===0 ? false:true   
          setError({...validateError,comiteError,llamadoError,aprendizError,fechaError,fechaPropuestaError})
      }, [items]);

      const onDateChange = (date,fechaError) => {
        if (date) {
            setSelectedDate(date);
            setError({...validateError,fechaError:fechaError})
            setItems([{
                ...items[0], fechaIncidente:date,
              }])
        }
    };
    const onDateChangePropuesta = (date,fechaError) => {
        if (date) {
            setSelectedDatePropuesta(date);
            setError({...validateError,fechaError:fechaError})
            setItems([{
                ...items[0], fechaPropuesta:date,
              }])
        }
    };
    
    const onDateChangeFile = (file,base64String,files,base64Strings) => {
        if (file) {
            setError({...validateError,files:files,base64Strings:base64Strings})
            setItems([{
                ...items[0], 
                selectedFile:file,
                base64String:base64String
              }])
        }
    };
 
 
    useEffect(() => {
        if (props?.itemsDescripcion?.length>0){
        setError({...validateError,descripcionError:true})
        setItems([{
            ...items[0], descripcion:props?.itemsDescripcion,
          }])
        }else{
            setError({...validateError,descripcionError:false})
        }
    }, [props?.itemsDescripcion]);

    useEffect(() => {
        if (props?.idAprendiz?.length===0){
            setError({...validateError,aprendizError:false})
        }else{
            setError({...validateError,aprendizError:true})
            setItems([{
                ...items[0], idAprendiz:props?.idAprendiz,
              }])
        }
    }, [props?.idAprendiz]);

 
    return (
        <>
      {loading ? <Redirect to={`/ModuloSolicitudComite/EnviarSolicitud?p=${items[0]?.idAprendiz}`}></Redirect> : null}
           <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}} className={classNames('col-4')}>
                <Row>
                    <Card className={classNames('widget-flat')}>

                        <HeaderForm title={'SOLICITUD DE COMITÉ DE EVALUACIÓN Y SEGUIMIENTO'} />
                        <Card.Body>
                        {!props?.aprendizError? <div className="isinvalid">SELECCIONE EL APRENDIZ</div>:<div>APRENDIZ:</div>}
                                    {children}
                            <Row className="align-items-center">
                                   
                                    <br/>
                                    <FormInput
                                        name="tipoComite"
                                        label="Seleccione el tipo de comité"
                                        type="select"
                                        containerClass="mb-3"
                                        className="form-select"
                                        key="tipoComite"
                                        isInvalid={!validateError.comiteError}
                                         onChange={(e) => setItems([{
                                            ...items[0], tipoComite: e.target.value,
                                          }])}
                                    >
                                        <option value="ACADEMICO"> ACADEMICO</option>
                                        <option value="DISCIPLINARIO">DISCIPLINARIO</option>
                                    </FormInput>
                                     
                                    <FormInput
                                        name="tipoLLamado"
                                        label="Seleccione el tipo de Falta"
                                        type="select"
                                        containerClass="mb-3 font-weight-bold"
                                        className="form-select"
                                        key="tipoLLamado"
                                        isInvalid={!validateError.llamadoError}
                                        onChange={(e) => setItems([{
                                            ...items[0], tipoLLamado: e.target.value,
                                          }])}
                                    >
                                        <option>Seleccione...</option>
                                        <option >ACADEMICO</option>
                                        <option value="MEDIO-Leve"> -Leve</option>
                                        <option value="MEDIO-Grave"> -Grave</option>
                                        <option value="MEDIO-Gravísimas"> -Gravísimas</option>
                                        <option >DISCIPLINARIO</option>
                                        <option value="MEDIO-Leve"> -Leve</option>
                                        <option value="MEDIO-Grave"> -Grave</option>
                                        <option value="MEDIO-Gravísimas"> -Gravísimas</option>
                                    </FormInput>
                                    <div className="mb-3">
                                        <label>Fecha y Hora de los Hechos</label> <br />
                                        <HyperDatepicker
                                            name="fechaIncidente"
                                            hideAddon={true}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            tI={60}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            timeCaption="time"
                                            className="form-control"
                                            value={selectedDate}
                                            onChange={(date) =>
                                                onDateChange(date,true)
                                                }
                                        />
                                        <div className="isinvalid">
                                            {!validateError.fechaError ? 
                                                 'SELECCIONE LA FECHA Y HORA HECHOS'
                                             : ''}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label>Fecha y Hora Propuesta para Agendar</label> <br />
                                        <HyperDatepicker
                                            name="fechaHoraPropuesta"
                                            hideAddon={true}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            tI={60}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            timeCaption="time"
                                            className="form-control"
                                            value={selectedDatePropuesta}
                                            onChange={(date) =>
                                                onDateChangePropuesta(date,true)
                                                }
                                        />
                                        <div className="isinvalid">
                                            {!validateError.fechaPropuestaError ? 
                                                 'SELECCIONE LA FECHA Y HORA PROPUESTA'
                                             : ''}
                                        </div>
                                    </div>
                            </Row>
                            <Row>
                                <Col>
                                         
                                    <Card>
                                    {!validateError.files && !validateError.base64Strings ? <div className="isinvalid"><p className="text-white font-13 m-b-30">CARGUE LA EVIDENCIA EN PDF</p></div>:<h4 className="header-title mb-3">documento subido</h4>}
                                  
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
                                                      new Uint8Array(reader.result)
                                                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                                                    );
                                                    onDateChangeFile(JSON.stringify(file),base64String,true,true)
                                                }
                                                
                                                //
                                                }}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <div className="mb-3 mb-0 text-center btnenviarSolicitud">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('ENVIAR SOLICITUD')}
                        </Button>
                    </div>
                </Row>
            </VerticalForm>
        </>
    );
};

export default FormDatosIncidente;