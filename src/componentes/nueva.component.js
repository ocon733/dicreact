import React from 'react';
import Form from 'react-bootstrap/Form';

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
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="english" >
                    <Form.Label >Inglés</Form.Label>
                    <Form.Control name="english"  type="text"/>
                </Form.Group>

                <Form.Group controlId="spain" >
                    <Form.Label >Español</Form.Label>
                    <Form.Control name="spain"  type="text"/>
                </Form.Group>

                <Form.Group controlId="descripcion" >
                    <Form.Label >Uso en frase en inglés</Form.Label>
                    <Form.Control name="descripcion"  type="text"/>
                </Form.Group>

                <Form.Group controlId="relmemotec" >
                    <Form.Label >Regla memotécnicaPronunciación fonética</Form.Label>
                    <Form.Control name="relmemotec"  type="text"/>
                </Form.Group>

                <Form.Group controlId="fonetic" >
                    <Form.Label >Pronunciación fonética</Form.Label>
                    <Form.Control name="fonetic"  type="text"/>
                </Form.Group>

                <button type="submit">Guardar</button>
            </Form>
        );
    }
}

export default Nueva;

