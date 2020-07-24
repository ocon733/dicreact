
import { CAMBIAR_IDIOMA, CAMBIAR_FILTRO, CAMBIAR_MODO_REPASO} from '../types';


//cada reducer tiene su propio state
const initialState = {
    idioma: "ing",
    filtro: "",
    repaso: false
}

export default function (state = initialState, action) {
    switch(action.type){
        case CAMBIAR_IDIOMA : 
        return {
            ...state,
            idioma: cambioIdioma(action.payload)
        }
        case CAMBIAR_FILTRO:
        return {
            ...state,
            filtro: action.payload
        }
        case CAMBIAR_MODO_REPASO:
            return {
                ...state,
                repaso: !action.payload
            }
        default:
            return state;
    }
}

const cambioIdioma = (idioma) => {
    
    if ( idioma === "ing"){ 
        return "esp"
     } else {
        return "ing"
     }
}

