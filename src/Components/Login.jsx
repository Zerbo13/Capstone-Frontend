import {useState} from "react"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login(){

    const navigate = useNavigate();
    const[form, setForm] = useState({
        email: "",
        password: "",
    });

    const[error, setError] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();

        fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        })
        .then(async res => {
            if(!res.ok){
                const err = await res.text();
                throw new Error(err || "Credenziali non!");
            }
            return res.json();
        })
        .then(data => {
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("ruolo", data.ruolo);

            if(data.ruolo === "ADMIN"){
                navigate("/admin");
            }else{ 
                navigate("/utente");
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
