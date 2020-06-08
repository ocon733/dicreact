import React from 'react';
import './cabecera.component.css';
import PropTypes from 'prop-types';
class Cabecera extends React.Component{

   /*
    constructor( props){
        super(props);
    }
*/

    render(){
        return(
            <div className="caja">
    <h4 className="cabecera_titulo">{this.props.titulo}</h4>
            </div>
        );
    }   
}

Cabecera.propTypes= {
      titulo : PropTypes.string.isRequired            
     }

export default Cabecera;