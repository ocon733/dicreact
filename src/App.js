import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pie from './componentes/pie.component.js';
import Menu from './componentes/menu.component.js';

function App() {
  return (
    <div className="App">
      <header>
        <h3>Vocabulario Inglés-Español</h3>
      </header>
    
        <Menu></Menu>        
    
      <footer><Pie></Pie></footer>
    </div>
  );
}

export default App;
