import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useContext, useState } from 'react'
import { StoreContext } from '../store/StoreProvider';
import { types } from '../store/storeReducer';
import './buscador.css';
// ----------------------------->> https://codesandbox.io/s/vxx3r8ox0?file=/src/api.js
// https://www.appfocused.com/blog/autocomplete-typescript-react-rxjs/


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

export default Buscador;
