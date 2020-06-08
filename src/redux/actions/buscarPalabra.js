
export function buscarPalabra (palabra) {
    return { 
        type: 'BUSCAR_PALABRA',
        payload: palabra
    }
}

