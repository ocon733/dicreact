import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

class Nueva extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const data = new FormData ( event.target);

        fetch('http://localhost:8080/create', { 
            method: 'POST', 
            body: data         
    }).then(res => res)
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
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

                <Row> </Row>
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

