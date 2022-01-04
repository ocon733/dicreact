import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import * as Constantes from '../Constantes';
import { API } from 'aws-amplify';
import { createTodo } from  '../graphql/mutations';

class Nueva extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            id:'',
            ingles:'',
            spain:'',
            frase:'',
            nemo:'',
            fonetic:'',
            error: '',
            modificar: false,
            aprendido: 0,
            tipo:''    

        }
        
    }
    componentDidMount() {
        if ( this.props.match !== undefined && this.props.match.params !== undefined &&
            this.props.match.params.id !== undefined){
            const  id  = this.props.match.params.id;
            this.setState({modificar:true});
            this.cargarRegistro(id);

        }else{           
           this.setState({modificar:false});
        }
    }    

    cargarRegistro(id){
        fetch(Constantes.SERVIDOR + 'buscar.php?id='+id)
        .then(res=> res.json())
        .then( res => {
           let word = undefined;
           for (var x=0; x<res.length; x ++ ) {
                //arr.push( JSON.parse(res[x]));
                word = JSON.parse(res[x]);
           }

           // eslint-disable-next-line
           //let boolAprendido = word.aprendido == 1 ? true : false;
           

           this.setState({english:word.ingles,
                        spain:word.spain,
                        descripcion:word.frase,
                        relmemotec:word.nemo,
                        fonetic:word.fonetic,
                        id:word.id,
                        aprendido: word.aprendido,
                        tipo:word.tipo
                    });
        });

    }

    handleSubmit(event){
        event.preventDefault();
        this.validaFormulario(event.target);
    }

    handleChecked = (event) => {
        this.setState({aprendido : !this.state.aprendido});
    }

    validaFormulario(t){
        this.setState ({error: ""});
        let isvalid = true;
        for( var e =0; e < t.length; e++){
            if ( t[e].name === "ingles" && t[e].value === ""){
                this.setState ((state) => ({error : state.error + "Falta la palabra en inglés, "}));
                isvalid = false;
            }
            if ( t[e].name === "fonetic" && t[e].value === ""){
                this.setState ((state) => ({error : state.error + "Falta la pronunciación figurada, "}));
                isvalid = false;
            }
            if ( t[e].name === "spain" && t[e].value === ""){
                this.setState ((state) => ({error : state.error + "Falta la traducción en español, "}));
                isvalid = false;
            }
            if ( t[e].name === "frase" && t[e].value === ""){
                this.setState ((state) => ({error : state.error + "Falta la frase de uso habitual, "}));
                isvalid = false;
            }
            if ( t[e].name === "nemo" && t[e].value === ""){
                this.setState ((state) => ({error : state.error + "Falta la regla nemotécnica para memorizar, "}));
                isvalid = false;
            }

        }

        if ( isvalid){
            
            const data = new FormData ( t);
            var palabra = {};

            if ( this.state.modificar){
                /*
                fetch(Constantes.SERVIDOR + 'modificar.php', {
                    method: 'POST', 
                    body: data         
                }).then(res => res)
                .catch(error => console.error('Error:', error))
                .then(response => alert('Modificación realizada '));
                */
            }else{
            
                for( var e =0; e < t.length; e++){
                    if ( t[e].name === "id" ){
                        palabra.id = t[e].value;
                    }
                    if ( t[e].name === "ingles" ){
                        palabra.ingles = t[e].value;
                    }
                    if ( t[e].name === "fonetic" ){
                        palabra.fonetic = t[e].value;
                    }
                    if ( t[e].name === "spain" ){
                        palabra.spain = t[e].value;
                    }
                    if ( t[e].name === "frase"  ){
                        palabra.frase = t[e].value;
                    }
                    if ( t[e].name === "nemo" ){
                        palabra.nemo = t[e].value;
                    }

                }


          
             API.graphql({"mutations": createTodo ({input:palabra})});                    
                  

            }


        }
        
    }

    renderMensaje(){
        if( this.state.error.length !== 0){
            return(<Alert variant="danger"><p>{this.state.error}</p></Alert> );
        }
    }

    renderBotonera(){
        if( this.state.modificar){
            return (<Button varian="primary" type="submit">Modificar</Button>);
        }else{
            return (<Button varian="primary" type="submit">Guardar</Button>);
        }
    }


    render(){
        return(
            <Container>
                
            <Card><Card.Body>
                <Card.Title><h3>Nueva entrada diccionario</h3></Card.Title>
                
            <Form onSubmit={this.handleSubmit}>
            <Row>
            <Col>  
                <Form.Group controlId="id" >
                    <Form.Label >ID</Form.Label>
                    <Form.Control name="id"  type="text" defaultValue={this.state.id}/>
                </Form.Group>
                </Col>
                <Col>  
                <Form.Group controlId="ingles" >
                    <Form.Label >Inglés</Form.Label>
                    <Form.Control name="ingles"  type="text" defaultValue={this.state.ingles}/>
                </Form.Group>
                </Col>

                <Col> 
                <Form.Group controlId="fonetic" >
                    <Form.Label >Pronunciación fonética</Form.Label>
                    <Form.Control name="fonetic"  type="text" defaultValue={this.state.fonetic}/>
                </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                <Form.Group controlId="spain" >
                    <Form.Label >Español</Form.Label>
                    <Form.Control name="spain"  type="text" defaultValue={this.state.spain}/>
                </Form.Group>
                </Col>
            </Row>

            <Row><Col><Form.Group controlId="frase" >
                    <Form.Label >Uso en frase en inglés</Form.Label>
                    <Form.Control name="frase"  type="text" defaultValue={this.state.frase}/>
                </Form.Group>
                </Col>
            </Row>

            <Row><Col><Form.Group controlId="nemo" >
                    <Form.Label >Regla memotécnica</Form.Label>
                    <Form.Control name="nemo"  type="text" defaultValue={this.state.nemo}/>
                </Form.Group></Col>
            </Row>
               
            <Row>               
                <Col><Form.Group controlId="tipo" >
                    <Form.Label >Tipo de palabra</Form.Label>
                    <Form.Control name="tipo"  type="text" defaultValue={this.state.tipo}/>
                </Form.Group>
                </Col>
            </Row>
             



               

                {this.renderMensaje()}                
<ButtonToolbar>
    {this.renderBotonera()}
</ButtonToolbar>
              
            </Form>
            </Card.Body>
            </Card>
            </Container>
        );
    }
}

export default Nueva;

