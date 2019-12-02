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
                <Form.Group controlId="english">
                <Form.Label htmlFor="english">Inglés</Form.Label>
                <Form.Control  type="text"/>
                </Form.Group>

                <label htmlFor="spain">Español</label>
                <input id="spain" name="spain" type="text"/>

                <label htmlFor="descripcion">Uso en frase en inglés</label>
                <input id="descripcion" name="descripcion" type="text"/>

                <label htmlFor="sonirelmemotecdo">Regla memotécnicaPronunciación fonética</label>
                <input id="relmemotec" name="relmemotec" type="text"/>

                <label htmlFor="fonetic">Pronunciación fonética</label>
                <input id="fonetic" name="fonetic" type="text"/>



                <button type="submit">Guardar</button>
            </Form>
        );
    }
}

export default Nueva;

