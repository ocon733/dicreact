import { connect } from 'react-redux';
import { buscarPalabra} from '../redux/actions/buscarPalabra';
import { cambiarIdioma} from '../redux/actions/cambiarIdioma';
import Buscador from './buscador.component';

const mapStateToProps = (store) => {
    
    return {
        palabra: store.listado.palabra,
        idioma: store.listado.idioma
     }
}
const mapDispatchToProps = {
    buscarPalabra ,cambiarIdioma
};

const createConnection = connect (
    mapStateToProps,
    mapDispatchToProps
)

const BuscadorContenedor = createConnection (Buscador);
export default BuscadorContenedor;