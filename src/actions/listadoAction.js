import {  DESCARGA_DICCIONARIO_OK} from '../types';

import * as Constantes from '../Constantes';

export function buscarConFiltroAction(filtro){

    return async (dispatch) => {
    const respuesta = await fetch(Constantes.SERVIDOR + "consultafiltro.php?palabra=" + filtro.palabra + "&idioma=" + filtro.idioma)
        .then(res=> res.json())
        .then( res => {
            var arr = [];
            for (var x=0; x<res.length; x ++ ) {
                arr.push( JSON.parse(res[x]));
                }
           return arr; 
        });
        dispatch( descargaDiccionarioOK(respuesta) );

    }
}

const descargaDiccionarioOK = respuesta => ({
    type: DESCARGA_DICCIONARIO_OK,
    payload: respuesta
});