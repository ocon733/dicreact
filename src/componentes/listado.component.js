import React, { useContext, useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Buscador from './buscador.component';
import { useDispatch, useStore } from '../store/StoreProvider';
import * as Constantes from '../Constantes';
import { types } from '../store/storeReducer';
import {Link} from "react-router-dom";
import './listado.css';

const Listado = () => {

    
    const store = useStore();
    const dispatch = useDispatch();


    const [isLoaded, setLoaded] = useState(false);
    const [items, setItems] = useState ([]);


    useEffect(() => {
        
        fetch(Constantes.SERVIDOR + "consulta.php?opcion=t")
        .then(res=> res.json())
        .then( res => {
        var arr = [];
        for (var x=0; x<res.length; x ++ ) {
                arr.push( JSON.parse(res[x]));
        }
        return arr;
        })
    .then(json => {
            setLoaded(true);
            setItems(json);
        });
    }, []);





    const buscarPalabra = () => {
        
        fetch(Constantes.SERVIDOR + "consultafiltro.php?palabra=" + store.palabra + "&idioma=" + store.idioma)
        .then(res=> res.json())
        .then( res => {
        var arr = [];
        for (var x=0; x<res.length; x ++ ) {
                arr.push( JSON.parse(res[x]));
        }
        return arr;
        })
    .then(json => {
        setItems(json);
        });
    }

    const renderImagenAprendido = (id, aprendido) => {
        let rutaimg = "";
        if( aprendido === '1'){
            rutaimg = "pencil_a.png";
        }else{
            rutaimg = "pencil_b.png";
        }
        return(<Link to={"/edit"+id} title="editar"><img src={rutaimg} alt="editar" width="25" height="25" /></Link> );
    }

    const estiloAprendido = ( option) => {
        if ( store.filtrar){
            return{
             backgroundColor : '#fafafa',
             color: '#fafafa'
            
            }
        }
         else if ( option === '1'){
            return{
               backgroundColor : '#ffffff',
               color:'#000000'
              
             }
        }
     }

     const handlerChangeFiltro = () => {
        dispatch({ type: types.FINDALL, payload:store.filtrar});
     }



    return (

                <div>
                <FormGroup row>
                 <Paper elevation={3} className="botoneraFiltro">
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                        <Button variant="contained" color="primary" onClick={() => buscarPalabra()} >Buscar</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Buscador/>    
                        </Grid>
                        <Grid item xs={3}>
                        <FormControlLabel control= {
                                <Switch checked={store.filtrar} onChange={ () => handlerChangeFiltro()} color="primary"/>
                            }
                        label="Modo repaso" />
                        </Grid>
                    </Grid>
                    
                       
                    
                </Paper>
                </FormGroup>

                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center" >Inglés</TableCell>
                            <TableCell  align="center">Fonética</TableCell>
                            <TableCell  align="center">Español</TableCell>
                            <TableCell  align="center">Regla nemotécnica</TableCell>
                            <TableCell  align="center">Frase</TableCell>
                            
                            
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map(item=>(
                      <TableRow key={item.id} >
                        <TableCell component="th" scope="item"> {renderImagenAprendido(item.id,item.aprendido)} <span className="tipo">({item.tipo})</span> </TableCell>
                        <TableCell align="center" className="ing">{item.english}</TableCell>
                        <TableCell align="center" className="cur">{item.fonetic}</TableCell>
                        <TableCell align="center" style={estiloAprendido(item.aprendido)} className="ing">{item.spain}</TableCell>
                        <TableCell >{item.relmemotec}</TableCell>
                        <TableCell style={estiloAprendido(item.aprendido)}>{item.descripcion}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </div>
            
        );
    
}

export default Listado;


