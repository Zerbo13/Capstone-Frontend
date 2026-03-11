import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  {jwtDecode}  from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserTie } from "react-icons/fa";
import { useEffect, useState } from "react";



function NavbarPadel({isLogged, setIsLogged}) {

const navigate = useNavigate();
const [avatar, setAvatar] = useState(null);
let ruolo = null;
let userId = null;
const token = localStorage.getItem("token");

if(token){
  try{
    const decoded = jwtDecode(token);
    ruolo = decoded.ruolo;
    userId = decoded.sub;
  }catch(err){
    console.log("token non valido", err);
  }
}
  
useEffect(() => {
  if(!token || !userId) return;
  fetch(`http://localhost:3001/utenti/${userId}`, {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then((result) => result.json)
  .then((data) => setAvatar(data.avatar))
  .catch((error) => console.error(error));
}, [isLogged]);


  const linkHome = ruolo === "ADMIN" ? "/admin" : ruolo === "USER" ? "/user" : "/home";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setAvatar(null);
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
            <Nav.Link  as={Link} to="/recensioni" className='text-dark'>Recensioni</Nav.Link>

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
              <NavDropdown
              title={
                <span className='d-flex align-items-center gap-2'> 
                {avatar ? (
                  <img src={avatar} alt="avatar" style={{width: "35 px", height:"35", borderRadius: "50%", objectFit: "cover",border:"2px solid white"}} />
                ) : (
                <div style={{width: "35px", height:"35px", borderRadius: "50%", backgroundColor: "#1d548c", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <FaUserTie style={{width: "40px",height:"25px",}} />
                   </div>
                )}
                </span>
              }
               id="user-dropdown"
               align="end">
                <NavDropdown.Item as={Link} to="/profilo" className='text-center'>Il mio profilo</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className='text-center text-danger'>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPadel;