import { GUARDADO_OK} from '../types';

const initialState = {
    guardado: false
}

const NuevoReducer = (state = initialState, action) => {
    switch(action.type){
        case GUARDADO_OK : 
        return {
            ...state,
            palabras: action.payload
        }
        default:
            return state;
    }
}

export default NuevoReducer
