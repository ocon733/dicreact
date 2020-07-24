import { DESCARGA_DICCIONARIO_OK} from '../types';

const initialState = {
    palabras: []
}

export default function (state = initialState, action) {
    switch(action.type){
        case DESCARGA_DICCIONARIO_OK : 
        return {
            ...state,
            palabras: action.payload
        }
        default:
            return state;
    }
}

