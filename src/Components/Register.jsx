import {useState} from "react"
import { useNavigate } from "react-router";

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

    const handleSubmit = (e) =>{
        e.preventDefault();

        fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(() => {
            alert("Registrazione avvenuta con successo!");
            navigate("/login");
        })
        .catch(err => console.error(err));
    };

    return(
        <div className="container mt-5">
            <h2>Registrati!</h2>

            <form onSubmit={handleSubmit} className="mt-3"> 

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

                    <button className="btn- btn-primary w-100">Clicca per registrarti</button>
                 </form>
        </div>
    );
}

export default Register