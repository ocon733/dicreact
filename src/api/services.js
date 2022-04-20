
import axios from 'axios';
import * as Constantes from '../Constantes';

export const apibusca = async (palabra,idioma) => {
    const datos = await axios.get(Constantes.SERVIDOR + "consultafiltro.php?palabra=" + palabra + "&idioma=" + idioma);
    var arr = [];
       for (var x=0; x<datos.data.length; x ++ ) {
           arr.push( JSON.parse(datos.data[x]));
        }          
    return arr;
}

export const apiCargaRegistro = async (id) => {
    const datos = await axios.get(Constantes.SERVIDOR + 'buscar.php?id='+id);
    let word = JSON.parse(datos.data[0]);
    return word;
}


