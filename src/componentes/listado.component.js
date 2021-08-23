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
import { StoreContext } from '../store/StoreProvider';
import * as Constantes from '../Constantes';
import { types } from '../store/storeReducer';
import {Link} from "react-router-dom";

const Listado = () => {

    // var { isLoaded, items} = this.state;
    const [store, dispatch] = useContext(StoreContext);

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
        return(<Link to={"/edit"+id} title="editar"><img src={rutaimg} alt="editar" /></Link> );
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
                            <TableCell  align="center">Español</TableCell>
                            <TableCell  align="center">Frase</TableCell>
                            <TableCell  align="center">Nemotécnica</TableCell>
                            <TableCell  align="center">Pronunciación</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map(item=>(
                      <TableRow key={item.id} >
                        <TableCell component="th" scope="item">
                        {renderImagenAprendido(item.id,item.aprendido)}
                        </TableCell>
                        <TableCell >{item.english}</TableCell>
                        <TableCell style={estiloAprendido(item.aprendido)}>{item.spain}</TableCell>
                        <TableCell style={estiloAprendido(item.aprendido)}>{item.descripcion}</TableCell>
                        <TableCell >{item.relmemotec}</TableCell>
                        <TableCell >{item.fonetic}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </div>
            
        );
    
}

export default Listado



/*
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from "@material-ui/core/Link";
import * as Constantes from '../Constantes';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import BuscadorContenedor from './bucadorcontenedor.component';
import Grid from '@material-ui/core/Grid';


export default class Listado extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        };
    }


    componentDidMount(){
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
                    this.setState({
                        isLoaded : true,
                        items: json
                    })
                });
    }


    estiloAprendido = ( option) => {
       if ( this.props.filtrar){
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

    renderImagenAprendido(id, aprendido){
        let rutaimg = "";
        if( aprendido === '1'){
            rutaimg = "pencil_a.png";
        }else{
            rutaimg = "pencil_b.png";
        }
        return(<Link href={"/edit"+id} title="editar"><img src={rutaimg} alt="editar" /></Link> );
    }



    
    handlerChangeFiltro = () => {

       this.props.findAll(this.props.filtrar);
    }

    buscarPalabra = () => {
        
        fetch(Constantes.SERVIDOR + "consultafiltro.php?palabra=" + this.props.palabra + "&idioma=" + this.props.idioma)
        .then(res=> res.json())
        .then( res => {
        var arr = [];
        for (var x=0; x<res.length; x ++ ) {
                arr.push( JSON.parse(res[x]));
        }
        return arr;
        })
    .then(json => {
            this.setState({
                isLoaded : true,
                items: json
            })
        });
}
    


    


    render(){

        var { isLoaded, items} = this.state;

        if( !isLoaded){
            return <div>Cargando datos ...</div>;
        }else{
            return (
                <div>
                <FormGroup row>
                 <Paper elevation={3} className="botoneraFiltro">
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                        <Button variant="contained" color="primary" onClick={this.buscarPalabra} >Buscar</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <BuscadorContenedor/>    
                        </Grid>
                        <Grid item xs={3}>
                        <FormControlLabel control= {
                                <Switch checked={this.props.filtrar} onChange={ () => this.handlerChangeFiltro()} color="primary"/>
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
                            <TableCell  align="center">Español</TableCell>
                            <TableCell  align="center">Frase</TableCell>
                            <TableCell  align="center">Nemotécnica</TableCell>
                            <TableCell  align="center">Pronunciación</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map(item=>(
                      <TableRow key={item.id} >
                        <TableCell component="th" scope="item">
                        {this.renderImagenAprendido(item.id,item.aprendido)}
                        </TableCell>
                        <TableCell >{item.english}</TableCell>
                        <TableCell style={this.estiloAprendido(item.aprendido)}>{item.spain}</TableCell>
                        <TableCell style={this.estiloAprendido(item.aprendido)}>{item.descripcion}</TableCell>
                        <TableCell >{item.relmemotec}</TableCell>
                        <TableCell >{item.fonetic}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </div>
        )};


    }
}
*/
