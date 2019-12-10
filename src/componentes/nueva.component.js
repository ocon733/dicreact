import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class Nueva extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error: ''           
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.validaFormulario(event.target);
}

    validaFormulario(t){
        this.setState ({error: ""});
        let isvalid = true;
        for( var e =0; e < t.length; e++){
            if ( t[e].name === "english" && t[e].value == ""){
                this.setState ((state) => ({error : state.error + "Falta la palabra en inglés, "}));
                isvalid = false;
            }
            if ( t[e].name === "fonetic" && t[e].value == ""){
                this.setState ((state) => ({error : state.error + "Falta la pronunciación figurada, "}));
                isvalid = false;
            }
            if ( t[e].name === "spain" && t[e].value == ""){
                this.setState ((state) => ({error : state.error + "Falta la traducción en español, "}));
                isvalid = false;
            }
            if ( t[e].name === "descripcion" && t[e].value == ""){
                this.setState ((state) => ({error : state.error + "Falta la frase de uso habitual, "}));
                isvalid = false;
            }
            if ( t[e].name === "relmemotec" && t[e].value == ""){
                this.setState ((state) => ({error : state.error + "Falta la regla nemotécnica para memorizar, "}));
                isvalid = false;
            }

        }

        if ( isvalid){
            
            const data = new FormData ( t);

            fetch('http://localhost:8080/create', { 
                method: 'POST', 
                body: data         
            }).then(res => res)
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

        }
        
    }

    renderMensaje(){
        if( this.state.error.length != 0){
            return(<Alert variant="danger"><p>{this.state.error}</p></Alert> );
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
                <Form.Group controlId="english" >
                    <Form.Label >Inglés</Form.Label>
                    <Form.Control name="english"  type="text"/>
                </Form.Group>
                </Col>

                <Col> 
                <Form.Group controlId="fonetic" >
                    <Form.Label >Pronunciación fonética</Form.Label>
                    <Form.Control name="fonetic"  type="text"/>
                </Form.Group>
                </Col>
                </Row>

                <Row><Col>
                <Form.Group controlId="spain" >
                    <Form.Label >Español</Form.Label>
                    <Form.Control name="spain"  type="text"/>
                </Form.Group>
                </Col>
                </Row>

                <Row><Col><Form.Group controlId="descripcion" >
                    <Form.Label >Uso en frase en inglés</Form.Label>
                    <Form.Control name="descripcion"  type="text"/>
                </Form.Group>
                </Col>
                </Row>

                <Row><Col><Form.Group controlId="relmemotec" >
                    <Form.Label >Regla memotécnica</Form.Label>
                    <Form.Control name="relmemotec"  type="text"/>
                </Form.Group></Col></Row>
                {this.renderMensaje()}                
<ButtonToolbar>
    <Button varian="primary" type="submit">Guardar</Button>
</ButtonToolbar>
              
            </Form>
            </Card.Body>
            </Card>
            </Container>
        );
    }
}

export default Nueva;

