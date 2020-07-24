import React from 'react';
import './cabecera.component.css';
import PropTypes from 'prop-types';

const Cabecera = props => (

        <div className="caja">
                <h4 className="cabecera_titulo">{props.titulo}</h4>
        </div>
    )

Cabecera.propTypes= {
    titulo : PropTypes.string.isRequired            
}


export default Cabecera;
