import React from 'react'

const Pie = () => {

    const fechaHoy = () => {
        let hoy = new Date();
        let dia = hoy.getDate().toString();
        let mes = (hoy.getMonth()+1).toString();
        if ( dia.length < 2) dia = "0"+ dia;
        if ( mes.length < 2) mes = "0" + mes;
        return dia + "/" + mes + "/" + hoy.getFullYear();
    }

    return (
        <div>
            <p style={{textAlign:'center'}}>{fechaHoy()}</p>
        </div>
    )
}

export default Pie
