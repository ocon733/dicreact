import React from 'react';
import Listado from './listado.component.js';
import Nueva from './nueva.component.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
    BrowserRouter as Router,
    Switch,
    Route    
  } from "react-router-dom";
class Menu extends React.Component{
    render(){
        return (
        <Router>
      <div>
        <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
       <Navbar expand="lg">
        <Nav className="mr-auto">
          <Nav.Link  href="/listado">Listado completo </Nav.Link> 
          <Nav.Link  href="/nueva"> Nueva entrada</Nav.Link>
         </Nav>
       </Navbar>
       </Col>       
       </Row>  
       </Container>
        <Switch>
          <Route path="/listado">
            <Listado />
          </Route>
          <Route path="/nueva">
            <Nueva />
          </Route>
            <Route path="/edit:id" component={Nueva} />
        </Switch>
      </div>
    </Router>
        );
    }
}
export default Menu;