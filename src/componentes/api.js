import * as Constantes from '../Constantes';
//import { useStore } from '../store/StoreProvider';



//const store = useStore();

export const getAll = () => {
     var res = fetch(Constantes.SERVIDOR + "consulta.php?opcion=t")
        .then(res=> res.json())
        .then( res => {
            var arr = [];
            for (var x=0; x<res.length; x ++ ) {
                    arr.push( JSON.parse(res[x]));
            }
            return arr;
        });
    return res;    
}

/*
export function getFilter(){
    return fetch(Constantes.SERVIDOR + "consultafiltro.php?palabra=" + store.palabra + "&idioma=" + store.idioma)
        .then(res=> res.json());
}
*/