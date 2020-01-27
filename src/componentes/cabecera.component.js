import React from 'react';
import './cabecera.component.css';

class Cabecera extends React.Component{

   /*
    constructor( props){
        super(props);
    }
*/
    render(){
        return(
            <div className="caja">
    <h4>{this.props.titulo}</h4>
            </div>
        );
    }
}

export default Cabecera;