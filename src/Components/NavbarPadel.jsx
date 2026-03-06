import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarPadel() {
  return (
    <Navbar expand="lg" className="bg-body-white">
      <Container>
        <Navbar.Brand href="#home" style={{marginLeft: "-60px"}}><img src="/public/logos/logo_padel.png" alt="Logo" width={150} className='m-0 p-0'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Servizi</Nav.Link>
            <Nav.Link href="#link">Campi</Nav.Link>
            <Nav.Link href="#link">Prenota</Nav.Link>
            <Nav.Link href="#link">Chi siamo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPadel;