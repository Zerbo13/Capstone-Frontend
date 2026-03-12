import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "bootstrap";

export default function Login({ setIsLogged }) {

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [mostraResetForm, setMostraResetForm] = useState(false);
  const [resetForm, setResetForm] = useState({email: "", nuovaPassword: "" });
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Credenziali non valide!");
      }

      const data = await res.json();
      const token = data.accessToken;

      if (!token) throw new Error("Token non ricevuto");
      localStorage.setItem("token", token);
      setIsLogged(true);
      const decoded = jwtDecode(token);
      if (decoded.ruolo === "ADMIN") navigate("/admin");
      else navigate("/user");

    } catch (err) {
      console.error(err);
      setError("Email o password errate!");
    }
  };

  {/*PATCH RESET PASSWORD */}
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");

    try{
      const result = await fetch("http://localhost:3001/utenti/reset-password", {
        method: "PATCH",
        headers:{"Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetForm.email,
          nuovaPassword: resetForm.nuovaPassword
        }),
      });
      if(!result.ok) throw new Error("Email non trovata");
      setResetSuccess("Password aggiornata con successo");
      setTimeout(() => {
        setMostraResetForm(false);
        setResetSuccess("");
        setResetForm({email: "", nuovaPassword: "" });
      }, 3000);
    }catch(err){
      setResetError(err.message);
    }
  };

  return (
    <div className="container mt-5">
       < div className="row justify-content-center text-center">
             < div className="col-12 col-sm-8 col-md-7 col-lg-5">
             < div className="bg-white bg-opacity-10 rounded-4 p-4">
      <h2 className="text-white">Accedi!</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        {error && <div className="alert alert-danger">{error}</div>}

        {/* EMAIL */}
        <input
          className="form-control mb-2"
          value={form.email}
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PASSWORD */}
        <input
          className="form-control mb-2"
          value={form.password}
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" className="btn btn-primary w-100">
          Accedi
        </button>
        <button type="button" className="btn btn-link text-white mt-2 p-0" onClick={() => setMostraResetForm(true)}>Password dimenticata?</button>

        <Link to="/register" className="text-decoration-none mt-2 d-block text-white">
          Non sei ancora registrato? Clicca qui per registrarti
        </Link>

        <Link to="/home" className="text-decoration-none text-white mt-2 d-block">
          Torna alla home ↩️
        </Link>
      </form>

      {mostraResetForm && (
        <form onSubmit={handleResetPassword} className="mt-3">
          {resetError && <div className="alert alert-danger">{resetError}</div> }
          {resetSuccess && <div className="alert alert-success">{resetSuccess}</div> }
          <input className="form-control mb-2" placeholder="Inserisci la tua email" type="email" value={resetForm.email} onChange={(e) => setResetForm({...resetForm, email: e.target.value})}/>
          <input className="form-control mb-2" placeholder="Inserisci la nuova password" type="password" value={resetForm.nuovaPassword} onChange={(e) => setResetForm({...resetForm, nuovaPassword: e.target.value})}/>
          <button type="submit" className="btn button-log w-100">Aggiorna password</button> 
          <button type="button" className="btn btn-link text-white mt-2 p-0" onClick={() => {setMostraResetForm(false); setResetError(""); setResetForm({email: "", nuovaPassword: ""});}}>Chiudi </button>

           </form>
      )}
      </div>
      </div>
      </div>
    </div>
  );
}