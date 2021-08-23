import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pie from './componentes/pie.component.js';
import Menu from './componentes/menu.component.js';
import Cabecera from './componentes/cabecera.component';
import StoreProvider from './store/StoreProvider';

function App() {
  return (
    <div className="App">
      <StoreProvider>
      <header>
        <Cabecera titulo="VOCABULARIO INGLÉS-ESPAÑOL" ></Cabecera>
      </header>
    
        <Menu></Menu>        
    
      <footer><Pie></Pie></footer>
      </StoreProvider>
    </div>
  );
}

export default App;
