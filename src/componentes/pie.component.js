import React from 'react';

class Pie extends React.Component{

  
    fechaHoy(){
        let hoy = new Date();
        return hoy.getDate() + "/" + (hoy.getMonth()+1) + "/" + hoy.getFullYear();
    }

    render(){
        return(
            <div>
                <p>{this.fechaHoy()}</p>
            </div>
        );
    }
}

export default Pie;

