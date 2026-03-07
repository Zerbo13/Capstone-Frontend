import {useState} from "react"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Register(){

    const navigate = useNavigate();
    const[form, setForm] = useState({
        nome: "",
        cognome: "",
        email: "",
        password: "",
        dataNascita:"",
        telefono: ""
    });

    const[error, setError] = useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();

        fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        })
        .then(async res => {
            if(!res.ok){
                const err = await res.json();
                throw new Error(err.message || "Errore nella registrazione");
            }
            return res.json;
        })
        .then(() => {
            alert("Registrazione avvenuta con successo!");
            navigate("/login");
        })
        .catch(err => {
            setError(err.message);
        });
    };

    return(
        <div className="container mt-5">
            <h2 className="text-white">Registrati!</h2>

            <form onSubmit={handleSubmit} className="mt-3"> 

            {error && <div className="alert alert-warning">{error}</div>}


           {/*NOME */}
                <input className="form-control mb-2" placeholder="Nome" onChange={(e) => setForm({
                    ... form, nome: e.target.value})} />

           {/*COGNOME */}
                <input className="form-control mb-2" placeholder="Cognome" onChange={(e) => setForm({
                    ... form, cognome: e.target.value})} />

           {/*EMAIL */}
                <input className="form-control mb-2" placeholder="Email" onChange={(e) => setForm({
                    ... form, email: e.target.value})} />

            {/*PASSWORD */}
                <input className="form-control mb-2" placeholder="Password" onChange={(e) => setForm({
                    ... form, password: e.target.value})} />

            {/*DATA DI NASCITA */}
                <input className="form-control mb-2" placeholder="Data di nascita" onChange={(e) => setForm({
                    ... form, dataNascita: e.target.value})} />

            {/*TELEFONO */}
                <input className="form-control mb-2" placeholder="Telefono" onChange={(e) => setForm({
                    ... form, telefono: e.target.value})} />

                    <button className="btn btn-primary w-100">Clicca per registrarti</button>
                    <Link to="/login" className="text-decoration-none text-white">Sei già registrato? Clicca qui per il login </Link><br></br>
                    <Link to="/home" className="text-decoration-none text-white mt-0">Torna alla home ↩️</Link>

                 </form>
        </div>
    );
}

export default Register