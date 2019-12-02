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
        .then(res=>res.json())
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
                            <th>Pronunciación</th>
                            <th>Nemotécnica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item=>(
                            <tr>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                                <td>{item[3]}</td>
                                <td>{item[4]}</td>
                                <td>{item[5]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )};


    }
}

export default Listado;

