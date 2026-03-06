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
import PrenotazioniUtente from "./Components/PrenotazioniUtente";
import FooterPadel from "./Components/FooterPadel";

import { useState } from "react";
import "./App.css";


function App() {
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
const location = useLocation();
const visualizzaNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
    {!visualizzaNavbar && <NavbarPadel  isLogged={isLogged} setIsLogged={setIsLogged}/>}
     
           <div className="bgPage min-vh-100 pt-4">

    <Routes>
        <Route path="/home" element={<Home />} />


      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


   <Route path="/admin" element={<AdminHome /> }/>
      <Route path="/user" element={<UserHome />} />

      <Route path="/servizi" element={ <ServiziPadel />}/>
      <Route path="/campi" element={ <CampiPadel />}/>
      <Route path="/prenotazioni" element={ <PrenotaPadel />}/>
      <Route path="/prenotazioniUtente" element={ <PrenotazioniUtente />}/>


      <Route path="*" element={<Home />}></Route>
    </Routes>
</div>

<FooterPadel />
    </>
  )
}

export default App
