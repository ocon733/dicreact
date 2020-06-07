import { connect } from 'react-redux';
import { findAll} from '../redux/actions/findAll';
import Listado from './listado.component';

const mapStateToProps = (store) => {
    
    return {
        filtrar: store.listado.filtrar
     }
}
const mapDispatchToProps = {
    findAll,
};

const createConnection = connect (
    mapStateToProps,
    mapDispatchToProps
)

const ListadoContenedor = createConnection (Listado);
export default ListadoContenedor;
