import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pie from './componentes/pie.component.js';
import Menu from './componentes/menu.component.js';
import Cabecera from './componentes/cabecera.component';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Listado from './componentes/listado.component.js';
import Nueva from './componentes/nueva.component.js';
import { Provider } from 'react-redux';
import  store  from './store';

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
      <header>
        <Cabecera titulo="VOCABULARIO INGLÉS-ESPAÑOL"/>
      </header>
      <Router>
        <Menu/>         
        <Switch>
          <Route path="/listado">
            <Listado/>
          </Route>
          <Route path="/nueva">
            <Nueva />
          </Route>
            <Route path="/edit:id" component={Nueva} />
        </Switch>
    </Router>

    
      <footer>
        <Pie/>
      </footer>
      </Provider>
    </div>
  );
}

export default App;
