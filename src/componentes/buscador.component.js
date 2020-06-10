import React, { Component } from 'react';
import './buscador.css';

export default class Buscador extends Component {
    state = {
        word: "",
        idioma: "esp"
    }

    handlerButton = () => {
        
        if ( this.state.idioma === "esp"){
            this.props.cambiarIdioma("ing");
            this.setState({idioma:"ing"});
        }else{
            this.props.cambiarIdioma("esp");
            this.setState({idioma:"esp"});
        }
    }

    handlerBuscador = (e) => {
        this.setState({word : e.target.value});
        this.props.buscarPalabra(e.target.value, this.state.idioma);
    }

    render() {
        return (
            <div className="buscador_caja">
                <input className="buscador_texto" type="text"  id="word" name="word" value={this.state.word}
                onChange={this.handlerBuscador}></input>

        <button onClick={this.handlerButton}>{this.state.idioma}</button>
            </div>
        )
    }
}
