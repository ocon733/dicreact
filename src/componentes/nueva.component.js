import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import Alert from 'react-bootstrap/Alert';
import * as Constantes from '../Constantes';
import Paper from '@material-ui/core/Paper';
import './nueva.css';
import { TextField, FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { NuevoAction, ModificaAction } from '../actions/nuevoAction';
import { useDispatch } from 'react-redux';

const Nueva = (props) => {

    const dispatch = useDispatch();
    
    const [entrada, setEntrada] = useState({
        english:'',
        spain:'',
        descripcion:'',
        relmemotec:'',
        fonetic:'',
        aprendido: false,
        id:''
    });

    const [error, setError] = useState("");
    const [modificar, setModificar] = useState(false);

    useEffect( () => {
        if ( props.match !== undefined && props.match.params !== undefined &&
            props.match.params.id !== undefined){
            const  id  = props.match.params.id;
            setModificar(true);
            cargarRegistro(id);

        }else{           
            setModificar(false);
        }
    },[props.match]);


    function cargarRegistro(id){
        fetch(Constantes.SERVIDOR + 'buscar.php?id='+id)
        .then(res=> res.json())
        .then( res => {
           let word = undefined;
           for (var x=0; x<res.length; x ++ ) {
                //arr.push( JSON.parse(res[x]));
                word = JSON.parse(res[x]);
           }

           
           let boolAprendido = word.aprendido === "1" ? true : false;
           

           setEntrada({english:word.english,
                        spain:word.spain,
                        descripcion:word.descripcion,
                        relmemotec:word.relmemotec,
                        fonetic:word.fonetic,
                        id:word.id,
                        aprendido: boolAprendido
                    });
        });

    }

    function handleSubmit(event){
        event.preventDefault();
        validaFormulario(event.target);
    }


    const handlerEntrada = e => { 
            setEntrada({ ...entrada,  [e.target.name]:e.target.value    }) 
        }     
    
    const handlerChecked = e => { 
        debugger
            setEntrada({ ...entrada,  [e.target.name]:e.target.checked    }) 
        }
    

    function validaFormulario(t){
        setError("");
        let isvalid = true;
        for( var e =0; e < t.length; e++){
            if ( t[e].name === "english" && t[e].value === ""){
                setError(error + "Falta la palabra en inglés, ");
                isvalid = false;
            }
            if ( t[e].name === "fonetic" && t[e].value === ""){
                setError(error + "Falta la pronunciación figurada, ");
                isvalid = false;
            }
            if ( t[e].name === "spain" && t[e].value === ""){
                setError(error + "Falta la traducción en español, ");
                isvalid = false;
            }
            if ( t[e].name === "descripcion" && t[e].value === ""){
                setError(error + "Falta la frase de uso habitual, ");
                isvalid = false;
            }
            if ( t[e].name === "relmemotec" && t[e].value === ""){
                setError(error + "Falta la regla nemotécnica para memorizar, ");
                isvalid = false;
            }

        }

        if ( isvalid){
            
            const data = new FormData ( t);

            if ( modificar){
                dispatch(ModificaAction(data))

            }else{
                dispatch(NuevoAction(data))               
            }


        }
        
    }

    function renderMensaje(){
        if( error.length !== 0){
            return(<Alert variant="danger"><p>{error}</p></Alert> );
        }
    }

    function renderBotonera(){
        if(modificar){
            return (<Button variant="contained" size="small" color="primary" type="submit">Modificar</Button>);
        }else{
            return (<Button variant="contained" size="small" color="primary" type="submit">Guardar</Button>);
        }
    }


    return (
        
        <Paper elevation={3} className="cajaFormulario">

            <h4 style={{textAlign:"center",color:"darkgrey"}}><strong>{ modificar ? "Modificar entrada en diccionario" : "Nueva entrada en diccionario"}</strong></h4>
          
          <Form onSubmit={handleSubmit}>
              <Row>
                  <Col>  
                      <Form.Group controlId="english" >
                          <TextField id="english" label="Inglés"  name="english" 
                          value={entrada.english} onChange={handlerEntrada}/>
                      </Form.Group>
                  </Col>

                  <Col> 
                      <Form.Group controlId="fonetic" >
                          <TextField id="fonetic" label="Pronunciación fonética"  name="fonetic" 
                          value={entrada.fonetic} onChange={handlerEntrada}/>
                      </Form.Group>
                  </Col>
              </Row>

              <Row>
                  <Col>
                        <Form.Group controlId="spain" >
                            <TextField name="spain"  label="Español" value={entrada.spain} onChange={handlerEntrada}/>
                        </Form.Group>
                  </Col>
          
              </Row>

            <Row>
                <Col>
                    <Form.Group controlId="descripcion" >
                        <TextField label="Uso en frase en inglés" name="descripcion"  value={entrada.descripcion} onChange={handlerEntrada}/>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="relmemotec" >
                        <TextField label="Regla memotécnica" name="relmemotec"  value={entrada.relmemotec} onChange={handlerEntrada}/>
                    </Form.Group></Col></Row>
            <Row>
                <Col>
                    <Form.Group controlId="aprendido" >
                    <FormControlLabel
                        control={<Checkbox color="primary" name="aprendido" 
                                onChange={handlerChecked} checked={entrada.aprendido} value={entrada.aprendido} />}
                        label ="Aprendido"
                     />   
                    </Form.Group>
                </Col>
            </Row>
       
          <Form.Control name="id" type="hidden" defaultValue={entrada.id} />

          {renderMensaje()}                
          <ButtonToolbar>
            {renderBotonera()}
          </ButtonToolbar>
        
          </Form>
          </Paper>
    )
}

export default Nueva