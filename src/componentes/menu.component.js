import React from 'react';
import Nueva from './nueva.component.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Listado from './listado.component.js';

const Menu = () => {
  return (
    <Router>
    <div>
      <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
     <Navbar expand="lg">
      <Nav className="mr-auto">
        <Link className="nav-link"  to="/listado">LISTADO</Link> 
        <Link className="nav-link"  to="/nueva">NUEVA PALABRA</Link>
       </Nav>
     </Navbar>
     </Col>       
     </Row>  
     </Container>
      <Routes>
        <Route path='/listado'  element= {<Listado/>} />
        <Route path='/nueva' element= {<Nueva /> } />
        <Route path='/edit/:id' element={<Nueva/>}/>
      </Routes>
    </div>
  </Router>
  )
}

export default Menu
