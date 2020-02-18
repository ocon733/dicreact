
const initialtState = {filtrar: true};

function listado ( state = initialtState, action) {

    switch (action.type){
        case 'FINDALL' :
            return  Object.assign( {}, state, { filtrar: !action.payload })
            
        default:
            return state;
    }


};

export default listado;

