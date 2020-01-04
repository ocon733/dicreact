import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Listado extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        };
    }

    editar(id){
        alert("id "+ id);
    }


    componentDidMount(){
        //fetch('http://localhost:8080/findall')
        fetch('http://localhost/diccionario/consulta.php')
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
                            <TableCell >Inglés</TableCell>
                            <TableCell >Español</TableCell>
                            <TableCell >Frase</TableCell>
                            <TableCell >Nemotécnica</TableCell>
                            <TableCell >Pronunciación</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map(item=>(
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="item">
                            <Button variant="outlined" size="small" color="primary" onClick={()=>this.editar(item.id)}>Editar</Button>
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

