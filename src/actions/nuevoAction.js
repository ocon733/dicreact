import { GUARDADO_OK } from '../types';
import swal from 'sweetalert';
import * as Constantes from '../Constantes';

//const history = useHistory();

export const ModificaAction = (data) => {
    
    return async (dispatch) => {
        const respuesta = await fetch(Constantes.SERVIDOR + 'modificar.php', {
            method: 'POST', 
            body: data         
        }).then(res => res)
        .catch(error => console.error('Error:', error))
        .then(response =>  swal("Modificado", "Se ha realizado la modificación correctamente", "success"));
        dispatch( guardadoOK(true) );
        window.location.href = '/listado';
        }
}


export const NuevoAction = (data) => {
    return async (dispatch) => {
        const respuesta = await fetch(Constantes.SERVIDOR + 'guardar.php', {
            method: 'POST', 
            body: data         
        }).then(res => res)
        .catch(error => console.error('Error:', error))
        .then(response => swal("Guardado", "Se ha guardado correctamente", "success"));
        dispatch( guardadoOK(true) ); 
        window.location.href = '/listado';
    }
}

const guardadoOK = respuesta => ({
    type: GUARDADO_OK,
    payload: respuesta
});