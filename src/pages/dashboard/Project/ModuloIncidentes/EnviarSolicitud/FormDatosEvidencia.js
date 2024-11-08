// @flow
import React, { useContext }  from 'react';
import classNames from 'classnames';
import { Row, Card } from 'react-bootstrap';

//actions
import SimpleMDEReact from 'react-simplemde-editor';
// components
import { VerticalForm} from '../../../../../components';
 import HeaderForm from '../Components/HeaderForm';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
 
const FormDatosEvidencia = (): React$Element<React$FragmentType> => {
     const {setDescripcion,descripcionError,setLoading} = useContext(SearchContext)
    const delay = 1000;
    const options = {
        autosave: {
            enabled: true,
            uniqueId: 1,
            delay,
        },
    };
    return (
        <>

        <Card className={classNames('widget-flat')}>
      
        <HeaderForm title={'EVIDENCIAS DEL INCIDENTE'}/>
            <Card.Body>
                  <Row className="align-items-center">
                <VerticalForm>
                <Row>
                    <Card>
                        <Card.Body>
                            
                            {!descripcionError? <div className="isinvalid"><p className="text-white font-14 mb-3">
                                Por favor, Narre aqui los hechos:
                            </p></div>:<div><h4 className="header-title mb-3">Descripción del Incidente</h4></div>}

                            <SimpleMDEReact id={1} options={options} onChange={(e) => {
                                    setDescripcion({descripcion:e,valideDescripcion:e?.length===0 ? false : true});
                                    setLoading(false)
                                }} />
                                   
                        </Card.Body>
                    </Card>
                     </Row>
                </VerticalForm>
                </Row>
            </Card.Body>
        </Card>
        </>
    );
};

export default FormDatosEvidencia;