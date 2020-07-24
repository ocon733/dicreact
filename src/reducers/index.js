import {combineReducers} from 'redux';
import buscadorReducer from './buscadorReducer';
import listadoReducer from './listadoReducer';


export default combineReducers ({
    buscador: buscadorReducer,
    listado: listadoReducer
});