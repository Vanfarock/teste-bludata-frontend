import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const NavbarComponent = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand>Bludata</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <LinkContainer to="/fornecedores">
            <Nav.Link>Fornecedores</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/empresas">
            <Nav.Link>Empresas</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

NavbarComponent.propTypes = {};

export default NavbarComponent;
