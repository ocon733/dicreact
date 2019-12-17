import React from 'react';
import Table from 'react-bootstrap/Table';

class Listado extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        };
    }


    componentDidMount(){
        fetch('http://localhost:8080/findall')
        //fetch('http://localhost/diccionario/consulta.php')
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
                <Table striped bordered hover size="sm" variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ingles</th>
                            <th>Español</th>
                            <th>Frase</th>
                            <th>Nemotécnica</th>
                            <th>Pronunciación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item=>(
                            <tr>
                                <td>{item["id"]}</td>
                                <td>{item["english"]}</td>
                                <td>{item["spain"]}</td>
                                <td>{item["descripcion"]}</td>
                                <td>{item["relmemotec"]}</td>
                                <td>{item["fonetic"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )};


    }
}

export default Listado;

