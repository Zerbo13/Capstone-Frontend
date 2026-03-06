import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import Home from "./Components/Home"
import Login from "./Components/Login"
import Register from "./Components/Register"
import AdminHome from "./Components/AdminHome";
import UserHome from "./Components/UserHome";
import NavbarPadel from "./Components/NavbarPadel";
import ServiziPadel from "./Components/ServiziPadel";
import CampiPadel from "./Components/CampiPadel";
import PrenotaPadel from "./Components/PrenotaPadel";
import ChiSiamo from "./Components/ChiSiamo";


function App() {
const location = useLocation();
const visualizzaNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
    {!visualizzaNavbar && <NavbarPadel />}
     
    <Routes>
        <Route path="/" element={<Home />} />


      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


   <Route path="/admin" element={<AdminHome />} />
      <Route path="/user" element={<UserHome />} />

      <Route path="/servizi" element={ <ServiziPadel />}/>
      <Route path="/campi" element={ <CampiPadel />}/>
      <Route path="/prenotazioni" element={ <PrenotaPadel />}/>
      <Route path="/chiSiamo" element={ <ChiSiamo />}/>




    </Routes>

  
    </>
  )
}

export default App
