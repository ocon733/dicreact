import {
    CAMBIAR_IDIOMA,
    CAMBIAR_FILTRO,
    CAMBIAR_MODO_REPASO
} from '../types';


//cambio idioma
export function cambiarIdiomaAction(idioma){
 
    return {
        type: CAMBIAR_IDIOMA,
        payload: idioma
    }

}

//cambio filtro
export function cambiarFiltroAction(filtro){
 
    return {
        type: CAMBIAR_FILTRO,
        payload: filtro
    }
}

//cambio repaso
export function cambiarModoRepasoAction(repaso){
    return {
        type:CAMBIAR_MODO_REPASO,
        payload: repaso
    }
}