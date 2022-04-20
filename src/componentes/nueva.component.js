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
import * as Constantes from '../Constantes';
import { apiCargaRegistro } from '../api/services';


const Nueva = () => {

    const location = useLocation();
    //const { from } = location.state;

    const [item, setItem] = useState ({
        english:'',
        spain:'',
        descripcion:'',
        relmemotec:'',
        fonetic:'',
        aprendido: 0,
        tipo:'',
        variantes:''    
    });

    const [modificar, setModificar] = useState(false);
    const [error, setError] = useState('');
    const [mostrarMsg, setMostrarMsg] = useState(false);
    const [mostrarAviso, setMostrarAviso] = useState(false);
    const [correcto, setCorrecto] = useState(true);

    useEffect(() => {
        if ( location !== undefined && location.state !== null && location.state.from !== undefined){
            setModificar(true);
            cargarRegistro(location.state.from);
        }

    }, [correcto]);


    const cargarRegistro = async(id) => {
        try{
            const word = await apiCargaRegistro(id);
            setItem({english:word.english, spain:word.spain, descripcion:word.descripcion, relmemotec:word.relmemotec, fonetic:word.fonetic, id:word.id, aprendido: word.aprendido, tipo:word.tipo, variantes:word.variantes });

        }catch( err){
            alert ( err);
        };

    }





    const handleSubmit = (event) => {
        event.preventDefault();
        validaFormulario(event.target);
    }

    const handleChecked = (event) => {
        let temp = item;
        temp.aprendido = !temp.aprendido;
        setItem(temp);
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
                fetch(Constantes.SERVIDOR + 'modificar.php', {
                    method: 'POST', 
                    body: data         
                }).then(res => res.json())
                .catch(error => {
                    setCorrecto ( error);
                    setMostrarAviso(true);
                })
                .then(response => {
                    setCorrecto ( response);
                    setMostrarAviso(true);
                });
            }else{
                fetch(Constantes.SERVIDOR + 'guardar.php', {
                    method: 'POST', 
                    body: data         
                }).then(res => res)
                .catch(error => {
                    setCorrecto ( error);
                    setMostrarAviso(true);
                })
                .then(response => {
                    setCorrecto ( response);
                    setMostrarAviso(true);
                });
            }

            


        }else{
            setMostrarMsg(true);
        }
        
    }

    const renderMensaje = () =>{

        if( error.length !== 0 && mostrarMsg){
            return(<Alert variant="danger"  dismissible onClose={()=>{ setMostrarMsg(false); setError("");} }><p>{error}</p></Alert> );
        }
    }


    const renderAviso = () =>{
      
        if ( mostrarAviso){
            if( correcto === true){
                return(<Alert variant="success" dismissible  onClose={()=>{ setMostrarAviso(false); } }><p>Cambios guardados correctamente</p></Alert> );
            }else if (correcto === false){
                return(<Alert variant="danger" dismissible onClose={()=>{ setMostrarAviso(false); } }><p>No se han podido guardar los cambios</p></Alert> );
            }else{
                return ("");
            }
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
                <Form.Check name="aprendido"  type="checkbox" label ="Aprendido" onChange={() => handleChecked} checked={item.aprendido} />
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

            {renderMensaje()}           
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
