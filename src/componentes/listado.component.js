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

class Listado extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false
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
    render(){

        var { isLoaded, items} = this.state;

        if( !isLoaded){
            return <div>Cargando datos ...</div>;
        }else{
            return (
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
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="item">
                            <Link href={"/edit:"+item.id} >Editar</Link>
                        </TableCell>
                        <TableCell>{item.english}</TableCell>
                        <TableCell>{item.spain}</TableCell>
                        <TableCell>{item.descripcion}</TableCell>
                        <TableCell>{item.relmemotec}</TableCell>
                        <TableCell>{item.fonetic}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
        )};


    }
}

export default Listado;

