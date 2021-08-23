import React from 'react'
import './cabecera.component.css';

const Cabecera= (props) => {
    return (
        <div className="caja">
            <h4 className="cabecera_titulo">{props.titulo}</h4>
         </div>
    )
}

export default Cabecera
