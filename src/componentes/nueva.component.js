import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { apiCargaRegistro, apiGuardar, apiModificar } from '../api/services';


const Nueva = () => {

    const location = useLocation();

    const [item, setItem] = useState ({
        english:'',
        spain:'',
        descripcion:'',
        relmemotec:'',
        fonetic:'',
        aprendido: '0',
        tipo:'',
        variantes:''    
    });

    const [modificar, setModificar] = useState(false);
    const [error, setError] = useState('');


    const [aviso, setAviso] = useState({mostrar:false,cabecera:'',mensaje:'',tipo:'success'});

    useEffect(() => {
        if ( location !== undefined && location.state !== null && location.state.from !== undefined){
            setModificar(true);
            cargarRegistro(location.state.from);
        }

    }, []);


    const cargarRegistro = async(id) => {
        try{
            const word = await apiCargaRegistro(id);
            setItem({english:word.english, spain:word.spain, descripcion:word.descripcion, relmemotec:word.relmemotec, fonetic:word.fonetic, id:word.id, aprendido: word.aprendido, tipo:word.tipo, variantes:word.variantes });

        }catch( err){
            console.log(err);
        };
    }

    const guardaRegistro = async(data) => {
        try{
            const resp = await apiGuardar(data);
            if ( resp){
                setAviso({mostrar:true,cabecera:'Guardado correcto',mensaje:'Se ha guardado correctamente',tipo:'success'});
            }else{
                setAviso({mostrar:true,cabecera:'Guardado incorrecto',mensaje:'No se ha guardado correctamente',tipo:'danger'});
            }

        }catch(err){
           console.log(err);
        }
    }

    const modificaRegistro = async(data) => {
        try{
            const resp = await apiModificar(data);
            if ( resp){
                setAviso({mostrar:true,cabecera:'Modificación correcta',mensaje:'Se ha modificado correctamente',tipo:'success'});
            }else{
                setAviso({mostrar:true,cabecera:'Modificación incorrecta',mensaje:'No se ha modificado correctamente',tipo:'danger'});
            }

        }catch(err){
           console.log(err);
        }
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        validaFormulario(event.target);
    }

    const valorInverso = (c) => {
        if ( c === '0') {
            return '1';}
        else if ( c === '1') {
            return '0';}
        else{
            return c;
        }
    }

    const numberToBoolean =  (n) =>{
        if ( n === '1'){
            return true;
        }else{
            return false
        }
    }

    const handleChecked = (event) => {
        setItem({...item, [event.target.name]: valorInverso ( event.target.value)});
    }

    const validaFormulario = (t) =>{
        let msgError = "";
        let isvalid = true;
        for( var e =0; e < t.length; e++){
            if ( t[e].name === "english" && t[e].value === ""){
                msgError = msgError + "Falta la palabra en inglés," ;
                isvalid = false;
            }
            if ( t[e].name === "fonetic" && t[e].value === ""){
                msgError = msgError + "Falta la pronunciación figurada, ";
                isvalid = false;
            }
            if ( t[e].name === "spain" && t[e].value === ""){
                msgError = msgError + "Falta la traducción en español, ";
                isvalid = false;
            }
            if ( t[e].name === "descripcion" && t[e].value === ""){
                msgError = msgError + "Falta la frase de uso habitual, ";
                isvalid = false;
            }
            if ( t[e].name === "relmemotec" && t[e].value === ""){
                msgError = msgError + "Falta la regla nemotécnica para memorizar, ";
                isvalid = false;
            }
            setError ( msgError);
        }
        if ( isvalid){          
            const data = new FormData ( t);
            if ( modificar){
               modificaRegistro(data);            
            }else{
                guardaRegistro(data);             
            }
        }else{
            setAviso({mostrar:true,cabecera:'Faltan campos',mensaje:error,tipo:'danger'});
       }       
    }





    const renderAviso = () =>{
      
        if ( aviso.mostrar){
                return(<Alert variant={aviso.tipo} dismissible  onClose={()=>{ setAviso({mostrar:false,tipo:'success',cabecera:'',mensaje:''}); } }>
                    <Alert.Heading>{aviso.cabecera}</Alert.Heading>
                    <hr/>
                    <p>{aviso.mensaje}</p></Alert> );            
        }
    }



    const renderBotonera = () =>{
        if( modificar){
            return (<Button varian="primary" type="submit">Modificar</Button>);
        }else{
            return (<Button varian="primary" type="submit">Guardar</Button>);
        }
    }

    return(
        <Container>
            
        <Card><Card.Body>
            <Card.Title><h3>Nueva entrada diccionario</h3></Card.Title>
            
        <Form onSubmit={handleSubmit}>
        <Row className="separado">
            <Col>  
            <Form.Group controlId="english" >
                <Form.Label >Inglés</Form.Label>
                <Form.Control name="english"  type="text" defaultValue={item.english}/>
            </Form.Group>
            </Col>

            <Col> 
            <Form.Group controlId="fonetic" >
                <Form.Label >Pronunciación fonética</Form.Label>
                <Form.Control name="fonetic"  type="text" defaultValue={item.fonetic}/>
            </Form.Group>
            </Col>
        </Row>

        <Row  className="separado">
            <Col>
            <Form.Group controlId="spain" >
                <Form.Label >Español</Form.Label>
                <Form.Control name="spain"  type="text" defaultValue={item.spain}/>
            </Form.Group>
            </Col>
        </Row>

        <Row  className="separado"><Col><Form.Group controlId="descripcion" >
                <Form.Label >Uso en frase en inglés</Form.Label>
                <Form.Control name="descripcion"  type="text" defaultValue={item.descripcion}/>
            </Form.Group>
            </Col>
        </Row>

        <Row  className="separado"><Col><Form.Group controlId="relmemotec" >
                <Form.Label >Regla memotécnica</Form.Label>
                <Form.Control name="relmemotec"  type="text" defaultValue={item.relmemotec}/>
            </Form.Group></Col>
        </Row>
           
        <Row className="separado">               
            <Col><Form.Group controlId="tipo" >
                <Form.Label >Tipo de palabra</Form.Label>
                <Form.Control name="tipo"  type="text" defaultValue={item.tipo}/>
            </Form.Group>
            </Col>


            <Col className="centrov">
            <Form.Group controlId="aprendido" >
                <Form.Check name="aprendido" id="aprendido"  type="checkbox" label ="Aprendido" 
                onChange={ handleChecked} 
                checked={numberToBoolean(item.aprendido)}
                value={item.aprendido} />
            </Form.Group>
            </Col>

        </Row>

        <Row className="separado"><Col><Form.Group controlId="variantes" >
                <Form.Label >Variantes de género, número y conjugaciones</Form.Label>
                <Form.Control name="variantes"  type="text" defaultValue={item.variantes}/>
            </Form.Group>
            </Col>
        </Row>
         



            <Form.Control name="id" type="hidden" defaultValue={item.id} />
       
            {renderAviso()}

            <ButtonToolbar>
            {renderBotonera()}
            </ButtonToolbar>
          
        </Form>
        </Card.Body>
       </Card>
    </Container>
    );
};

export default Nueva;
