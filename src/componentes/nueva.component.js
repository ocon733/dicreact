import React from 'react';

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
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="english">Inglés</label>
                <input id="english" name="english" type="text"/>

                <label htmlFor="spain">Español</label>
                <input id="spain" name="spain" type="text"/>

                <label htmlFor="descripcion">Uso en frase en inglés</label>
                <input id="descripcion" name="descripcion" type="text"/>

                <label htmlFor="sonirelmemotecdo">Regla memotécnicaPronunciación fonética</label>
                <input id="relmemotec" name="relmemotec" type="text"/>

                <label htmlFor="fonetic">Pronunciación fonética</label>
                <input id="fonetic" name="fonetic" type="text"/>



                <button type="submit">Guardar</button>
            </form>
        );
    }
}

export default Nueva;

