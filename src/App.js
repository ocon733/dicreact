import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pie from './componentes/pie.component.js';
import Menu from './componentes/menu.component.js';
import Cabecera from './componentes/cabecera.component';
import StoreProvider from './store/StoreProvider';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui/dist/styles.css';
import Button from '@material-ui/core/Button';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator> 

      {({ signOut, user }) => (

    <div className="App">
      <StoreProvider>
      <header>
        <Cabecera titulo="VOCABULARIO INGLÉS-ESPAÑOL" ></Cabecera> 
        
      </header>
        <Menu></Menu>        
    
      <footer><Pie></Pie><Button  size="small" color="primary" onClick={signOut} >Salir</Button>
      </footer>
      </StoreProvider>
     
    </div>

)} 

</Authenticator> 
     
  );
}

export default App;
