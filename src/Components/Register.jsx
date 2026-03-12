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
    const[avatar, setAvatar] = useState(null);
   
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        try{
        const result = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        });
        if(!result.ok){
            const err = await result.json();
            throw new Error(err.message || "Errore nella registrazione");
        }
        const utente = await result.json();
   
    if(avatar && utente.id){
        const login = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: form.email, password: form.password})
      });
      const loginData = await login.json();
      const token = loginData.accessToken;

      if(token){
        const formData = new FormData();
        formData.append("avatar", avatar);
        await fetch(`http://localhost:3001/utenti/${utente.id}/avatar`, {
            method: "PATCH",
            headers: {Authorization: `Bearer ${token}`},
            body: formData
        });
      }
    }
    alert("Registrazione avvenuta con successo!");
            navigate("/login");
        }catch(err){
            setError(err.message);
         }
    };

    return(
        <div className="container mt-5 pb-5 text-center">
             < div className="row justify-content-center">
             < div className="col-12 col-sm-8 col-md-7 col-lg-5">
             < div className="bg-white bg-opacity-10 rounded-4 p-4">
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
                <div className="mb-2 text-start">
                    <label className="text-white mb-1">Foto profilo</label>
                    <input type="file" className="form-control" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
                </div>
                {avatar && (
                    /*Viene mostrata in anteprima l'avatar che verrà messo*/ 
                    <img src={URL.createObjectURL(avatar)} alt="anteprima" style={{width: "45px", height:"45px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px"}} />
                )}

                    <button className="btn btn-primary w-100">Clicca per registrarti</button>
                    <Link to="/login" className="text-decoration-none text-white">Sei già registrato? Clicca qui per il login </Link><br></br>
                    <Link to="/home" className="text-decoration-none text-white mt-0">Torna alla home ↩️</Link>

                 </form>
                 </div>
                 </div>
                 </div>
        </div>
    );
}

export default Register