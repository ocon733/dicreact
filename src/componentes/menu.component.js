import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Menu = () =>  (
 
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
  
  )


export default Menu
