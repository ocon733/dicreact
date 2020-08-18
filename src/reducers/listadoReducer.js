import { DESCARGA_DICCIONARIO_OK, INICIO_DESCARGA_DICCIONARIO} from '../types';

const initialState = {
    palabras: [],
    cargando: false
}

export default function (state = initialState, action) {
    switch(action.type){
        case DESCARGA_DICCIONARIO_OK : 
        return {
            ...state,
            cargando: false,
            palabras: action.payload
        }
        case INICIO_DESCARGA_DICCIONARIO : 
        return {
            ...state,
            cargando: action.payload,
        }
        default:
            return state;
    }
}

