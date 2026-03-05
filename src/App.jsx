import { BrowserRouter, Route, Routes, useLocation } from "react-router"
import Home from "./Components/Home"
import Login from "./Components/Login"
import Register from "./Components/Register"
import AdminHome from "./Components/AdminHome";
import UserHome from "./Components/UserHome";
import NavbarPadel from "./Components/NavbarPadel";

function App() {
const location = useLocation();
const ruolo = localStorage.getItem("ruolo");
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

       <Route path="/" element={ruolo === "ADMIN"? <AdminHome /> : ruolo === "USER" ? <UserHome />: <Login />}/>




    </Routes>

  
    </>
  )
}

export default App
