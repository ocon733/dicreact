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


class Listado extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            checkedFiltro:true
        };
    }

    componentDidMount(){
        fetch(Constantes.SERVIDOR + "consulta.php")
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
       if ( option === '1'){
           return{
              backgroundColor : '#9e98b5',
              color: '#CCCCCC'
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

    handlerChangeFiltro = (event) => {
        this.setState({checkedFiltro : !this.state.checkedFiltro});
    }

    render(){

        var { isLoaded, items} = this.state;

        if( !isLoaded){
            return <div>Cargando datos ...</div>;
        }else{
            return (
                <div>
                <FormGroup row>
                    <FormControlLabel control= {
                            <Switch checked={this.state.checkedFiltro} onChange={this.handlerChangeFiltro} color="primary"/>
                        }
                    label="Ocultar aprendidos" />    
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
                    {items.filter( (item) => (this.state.checkedFiltro && !item.aprendido ) || (!this.state.checkedFiltro) ).map(item=>(
                      <TableRow key={item.id} >
                        <TableCell component="th" scope="item">
                        {this.renderImagenAprendido(item.id,item.aprendido)}
                        </TableCell>
                        <TableCell style={this.estiloAprendido(item.aprendido)}>{item.english}</TableCell>
                        <TableCell style={this.estiloAprendido(item.aprendido)}>{item.spain}</TableCell>
                        <TableCell style={this.estiloAprendido(item.aprendido)}>{item.descripcion}</TableCell>
                        <TableCell style={this.estiloAprendido(item.aprendido)}>{item.relmemotec}</TableCell>
                        <TableCell style={this.estiloAprendido(item.aprendido)}>{item.fonetic}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </div>
        )};


    }
}

export default Listado;

