import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useContext, useState } from 'react'
import { StoreContext } from '../store/StoreProvider';
import { types } from '../store/storeReducer';
import './buscador.css';

const Buscador = () => {

    const [store, dispatch] = useContext(StoreContext);
    const [idioma, setIdioma] = useState("esp");
    const [palabra, setPalabra] = useState("");

    const handlerButton = () => {
        
        if ( store.idioma === "esp"){
            dispatch({ type: types.CAMBIAR_IDIOMA, payload:"ing"});
            setIdioma("ing");
        }else{
            dispatch({ type: types.CAMBIAR_IDIOMA, payload:"esp"});
            setIdioma("esp");

        }
    }

    const handlerBuscador = (e) => {
        setPalabra( e.target.value);
        dispatch({type: types.BUSCAR_PALABRA, payload: e.target.value});
    }

    return (
        <div className="buscador_caja">
               <TextField  id="word" name="word" value={palabra} className="buscador_texto"
                onChange={handlerBuscador}/>  
            <Button variant="outlined" size="small"  color="primary" onClick={() => handlerButton()} >{idioma}</Button>
        </div>
    )
}

export default Buscador

/*
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
*/