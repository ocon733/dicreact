import React, {  useEffect, useState } from 'react'
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
import Alert from 'react-bootstrap/Alert';
import { types } from '../store/storeReducer';
import {Link} from "react-router-dom";
import './listado.css';

import { apibusca } from '../api/services';

const Listado = () => {

    
    const store = useStore();
    const dispatch = useDispatch();


    const [isLoaded, setLoaded] = useState(false);
    const [items, setItems] = useState ([]);
    const [aviso, setAviso] = useState({mostrar:false,cabecera:'',mensaje:''});


    useEffect(() => {
        
        buscarPalabra();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

      
        const buscarPalabra = async() => {
            try  {
                const data = await apibusca(store.palabra, store.idioma);
                setLoaded(true);
                setItems(data);           
            }catch(err ) {
               setAviso({mostrar:true,cabecera:'Error',mensaje:'No se ha podido realizar la búsqueda'})
            };
        }

    const renderImagenAprendido = (id, aprendido) => {
 
        let rutaimg = "";
        if( aprendido === '1'){
            rutaimg = "/diccionario/pencil_a.png";
        }else{
            rutaimg = "/diccionario/pencil_b.png";
         }

        return(<Link to={"/edit/"+id} state={{from:id}} title="editar"><img src={rutaimg} title={id} alt="editar"/></Link> );
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

     const renderAviso = () =>{
      
        if ( aviso.mostrar){
                return(<Alert variant="info" dismissible  onClose={()=>{ setAviso({mostrar:false,cabecera:'',mensaje:''}); } }>
                    <Alert.Heading>{aviso.cabecera}</Alert.Heading>
                    <hr/>
                    <p>{aviso.mensaje}</p></Alert> );            
        }
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
                            <TableCell  align="center">Tipo</TableCell>
                            
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map(item=>(
                      <TableRow key={item.id} >
                        <TableCell component="th" scope="item"> {renderImagenAprendido(item.id,item.aprendido)}</TableCell>
                        <TableCell align="center" className="ing">{item.english}</TableCell>
                        <TableCell align="center" className="cur">{item.fonetic}</TableCell>
                        <TableCell align="center" style={estiloAprendido(item.aprendido)} className="ing">{item.spain}</TableCell>
                        <TableCell >{item.relmemotec}</TableCell>
                        <TableCell style={estiloAprendido(item.aprendido)}>{item.descripcion}</TableCell>
                        <TableCell align="center" > <span className="tipo">({item.tipo})</span><br/>{item.variantes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {
                 isLoaded ? "" : <p> Cargando datos ... </p> 
              }

            {renderAviso()}
              </div>
            
        );
    
}

export default Listado;


