import { connect } from 'react-redux';
import { findAll} from '../redux/actions/findAll';
import { buscarPalabra} from '../redux/actions/buscarPalabra';
import { cambiarIdioma} from '../redux/actions/cambiarIdioma';
import Listado from './listado.component';

const mapStateToProps = (store) => {
    
    return {
        filtrar: store.listado.filtrar,
        palabra: store.listado.palabra,
        idioma: store.listado.idioma
     }
}
const mapDispatchToProps = {
    findAll,buscarPalabra,cambiarIdioma
};

const createConnection = connect (
    mapStateToProps,
    mapDispatchToProps
)

const ListadoContenedor = createConnection (Listado);
export default ListadoContenedor;
