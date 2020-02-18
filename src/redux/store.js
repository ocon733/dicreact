import { createStore, combineReducers } from 'redux';
import listado from './reducers/listado';


//combinación de reducers en uno principal
const reducer = combineReducers({
     listado
});

const store = createStore(reducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

