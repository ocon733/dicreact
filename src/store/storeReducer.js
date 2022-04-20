
const types = {
  BUSCAR_PALABRA: 'BUSCAR_PALABRA',
  CAMBIAR_IDIOMA: 'CAMBIAR_IDIOMA',
  FINDALL : 'FINDALL'
}


const initialStore = {filtrar: false, palabra: '', idioma: 'esp'};

const storeReducer = (state, action) => {
  switch(action.type){
    case types.FINDALL :
      return   { ...state, filtrar: !action.payload }
      
    case types.BUSCAR_PALABRA :
      return  { ...state, palabra: action.payload }
  
    case types.CAMBIAR_IDIOMA :
      return  {...state,idioma: action.payload }            
      
    default:
      return state;
  }   
}

export {initialStore, types}
export default storeReducer
