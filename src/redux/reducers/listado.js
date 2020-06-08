
const initialtState = {filtrar: false, palabra: '', idioma: 'esp'};

function listado ( state = initialtState, action) {

    switch (action.type){
        case 'FINDALL' :
            return  Object.assign( {}, state, { filtrar: !action.payload })
            
        case 'BUSCAR_PALABRA' :
                return  Object.assign( {}, state, { palabra: action.payload })
        
        case 'CAMBIAR_IDIOMA' :
                    return  Object.assign( {}, state, { idioma: action.payload })            
        default:
            return state;
    }


};

export default listado;

