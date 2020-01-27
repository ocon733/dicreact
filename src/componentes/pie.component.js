import React from 'react';

class Pie extends React.Component{

  
    fechaHoy(){
        let hoy = new Date();
        let dia = hoy.getDate().toString();
        let mes = (hoy.getMonth()+1).toString();
        if ( dia.length < 2) dia = "0"+ dia;
        if ( mes.length < 2) mes = "0" + mes;
        return dia + "/" + mes + "/" + hoy.getFullYear();
    }

    render(){
        return(
            <div>
                <p style={{textAlign:'center'}}>{this.fechaHoy()}</p>
            </div>
        );
    }
}

export default Pie;

