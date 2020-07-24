import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from "@material-ui/core/Link";
import Buscador from './buscador.component';
import { buscarConFiltroAction } from '../actions/listadoAction';
import './listado.css';

const Listado = () => {

    const dispatch = useDispatch();
    
    const idioma = useSelector (state =>state.buscador.idioma); 
    const filtro = useSelector (state =>state.buscador.filtro);
    const listado = useSelector (state => state.listado.palabras);
    const repaso = useSelector (state =>state.buscador.repaso);

    useEffect ( () => {
        const cargarDiccionario = () => dispatch(buscarConFiltroAction({palabra:filtro,idioma:idioma}));
        cargarDiccionario();
        // eslint-disable-next-line
    }, []);

    const estiloRepaso = ( ) => {
        if ( repaso){
            return{
             backgroundColor : '#fafafa',
             color: '#fafafa'
            
            }
        }
         else {
            return{
               backgroundColor : '#ffffff',
               color:'#000000'
              
             }
        }
     }
 
      function renderImagenAprendido(id, aprendido){
         let rutaimg = "";
         if( aprendido === '1'){
             rutaimg = "pencil_a.png";
         }else{
             rutaimg = "pencil_b.png";
         }
         return(<Link href={"/edit"+id} title="editar"><img src={rutaimg} alt="editar" /></Link> );
     }
 
 
    return (
 
            <div>
                <Buscador/>
                
                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center" >Inglés</TableCell>
                            <TableCell  align="center">Español</TableCell>
                            <TableCell  align="center">Frase</TableCell>
                            <TableCell  align="center">Nemotécnica</TableCell>
                            <TableCell  align="center">Pronunciación</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                        listado.map(item=>(
                            <TableRow key={item.id} >
                              <TableCell component="th" scope="item">
                              {renderImagenAprendido(item.id,item.aprendido)}
                              </TableCell>
                              <TableCell ><strong>{item.english}</strong></TableCell>
                              <TableCell style={estiloRepaso()}>{item.spain}</TableCell>
                              <TableCell className="mini gris" >{item.descripcion}</TableCell>
                              <TableCell className="mini gris" >{item.relmemotec}</TableCell>
                              <TableCell className="cursiva gris">{item.fonetic}</TableCell>
                            </TableRow>
                        ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              </div>
    )
}

export default Listado