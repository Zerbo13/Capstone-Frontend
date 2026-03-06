import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  {jwtDecode}  from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



function NavbarPadel({isLogged, setIsLogged}) {
  const navigate = useNavigate();
  let ruolo = null;
  if (isLogged) {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        ruolo = decoded.ruolo;
      } catch (err) {
        console.error("Token non valido:", err);
      }
    }
  }


  const linkHome = ruolo === "ADMIN" ? "/admin" : ruolo === "USER" ? "/user" : "/home";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/home");
  };

  return (
    <Navbar expand="lg" className="navabar-padel sticky-top">
      <Container>
        <Navbar.Brand href={linkHome} style={{marginLeft: "-60px"}}>
          <img src="/public/logos/logo_padel.png" alt="Logo" width={180} className='m-0 p-0'/>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={linkHome} className='text-dark'>Home</Nav.Link>
            <Nav.Link href="servizi" className='text-dark'>Servizi</Nav.Link>
            <Nav.Link href="campi" className='text-dark'>Campi</Nav.Link>
            <Nav.Link href="prenotazioni" className='text-dark'>Prenota</Nav.Link>
            <Nav.Link href="prenotazioniUtente" className='text-dark'>Le mie prenotazioni</Nav.Link>


          </Nav>

          <div className='d-flex'> 
          {!isLogged && (
              <Link to="/register" className="btn mt-4 button-log">
                Registrati / Login
              </Link>
            )}

            {/* Se loggato mostra Logout */}
            {isLogged && (
              <button
                className="btn btn-danger mt-4 "
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPadel;