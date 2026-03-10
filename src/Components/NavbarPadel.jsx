import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  {jwtDecode}  from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';



function NavbarPadel({isLogged, setIsLogged}) {

const navigate = useNavigate();
let ruolo = null;
const token = localStorage.getItem("token");
if(token){
  try{
    const decoded = jwtDecode(token);
    ruolo = decoded.ruolo;
  }catch(err){
    console.log("token non valido", err);
  }
}
  


  const linkHome = ruolo === "ADMIN" ? "/admin" : ruolo === "USER" ? "/user" : "/home";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/home");
  };

  return (
    <Navbar expand="lg" className="navabar-padel sticky-top p-0">
      <Container>
        <Navbar.Brand href={linkHome} style={{marginLeft: "-60px"}}>
          <img src="/logos/logo_padel.png" alt="Logo" width={180} className='m-0 p-0'/>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={linkHome} className='text-dark'>Home</Nav.Link>
            <Nav.Link  as={Link} to="/servizi" className='text-dark'>Servizi</Nav.Link>
            <Nav.Link  as={Link} to="/campi" className='text-dark'>Campi</Nav.Link>
            
            { ruolo !== "ADMIN" && isLogged &&(
              <>
            <Nav.Link  as={Link} to="/prenotazioni" className='text-dark'>Prenota</Nav.Link>
            <Nav.Link  as={Link} to="/prenotazioniUtente" className='text-dark'>Le mie prenotazioni</Nav.Link>
            </>
            )}
             { ruolo !== "USER" && isLogged &&(
              <>
            <NavDropdown title={<span style={{color: "black"}}>Dashboard</span>}  id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/allPrenotazioni" className='text-center'>Visualizza tutte le prenotazioni</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/prenotazioniOggi" className='text-center'>
                Visualizza le prenotazioni per oggi
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/utentiRegistrati" className='text-center'>Visualizza tutti gli utente registrati</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/dashboard" className='text-center'>
                Dashboard
              </NavDropdown.Item>
            </NavDropdown>
            </>
            )}

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