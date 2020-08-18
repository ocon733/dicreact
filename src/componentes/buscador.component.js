import React from 'react';
import './buscador.css';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import {cambiarIdiomaAction, cambiarModoRepasoAction} from '../actions/buscadorAction';
import {useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import { buscarConFiltroAction } from '../actions/listadoAction';


const Buscador = (props) => {

    const idioma = useSelector (state =>state.buscador.idioma); 
    const repaso = useSelector (state =>state.buscador.repaso);
    
    const dispatch = useDispatch();

    
    const cambioModoRepaso = () => {
        dispatch(cambiarModoRepasoAction(repaso));
     }


    const cambioIdioma = () => {
        dispatch(cambiarIdiomaAction(idioma));
    }

 
    const cambioFiltro = (e) => {
        if( e.target.value.length >= 2 || e.target.value.length === 0) {
            dispatch(buscarConFiltroAction({palabra:e.target.value,idioma:idioma}));
        }
        
    }

    




    return (
        <FormGroup row>
            <Paper elevation={3} className="botoneraFiltro">
                <Grid container spacing={3}>
                    <Grid item xs={3}>
               
                    </Grid>
                    <Grid item xs={6}>
                        <div className="buscador_caja">       
                            <TextField className="buscador_texto"  onChange={cambioFiltro} />
                            <Button variant="contained" size="small" color="primary" onClick={cambioIdioma} >{idioma}</Button>
                        </div> 
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel control= {
                                <Switch checked={repaso} onChange={ cambioModoRepaso} color="primary"/>
                            }    label="Modo repaso" />
                    </Grid>
                </Grid>
            </Paper>
       </FormGroup>         
    )
}



export default Buscador

