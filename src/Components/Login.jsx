import {useState} from "react"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function Login(){

    const navigate = useNavigate();
    const[form, setForm] = useState({
        email: "",
        password: "",
    });

    const[error, setError] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("FORM SUBMITTATO");

        console.log("Invio richiesta a /auth/login con:", form);
        fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        })
        .then(async res => {
            console.log("STATUS LOGIN:", res.status);
            
            if(!res.ok){
                const err = await res.text();
                throw new Error(err || "Credenziali non valide!");
            }
            return res.json();
        })
        .then(data => {
            const token = data.accessToken;
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
console.log("TOKEN DECODIFICATO:", decoded);

            if(decoded.ruolo === "ADMIN"){
                navigate("/admin");
            }else{ 
                navigate("/user");
            }

        
        })
        .catch(err => {
   setError("Email o password errate!");
            console.error(err);
        });
          
    };

    return(
        <div className="container mt-5">
            <h2>Accedi!</h2>

            <form onSubmit={handleSubmit} className="mt-3"> 

                {error && <div className="alert alert-danger">{error}</div>}


           {/*EMAIL */}
                <input className="form-control mb-2" placeholder="Email" type="email" onChange={(e) => setForm({
                    ... form, email: e.target.value})} />

            {/*PASSWORD */}
                <input className="form-control mb-2" placeholder="Password" type="password" onChange={(e) => setForm({
                    ... form, password: e.target.value})} />

                    <button className="btn btn-primary w-100">Clicca per accedere</button>
                    <Link to="/register" className="text-decoration-none">Non sei ancora già registrato? Clicca qui per registrarti</Link>
                 </form>
        </div>
    );
}
