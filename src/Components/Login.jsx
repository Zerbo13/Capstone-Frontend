import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Se l'utente è già loggato, reindirizza subito
useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("TOKEN GREZZO:", token);

  if (!token) {
    console.log("NESSUN TOKEN TROVATO");
    return;
  }

  let decoded = null;

  try {
    decoded = jwtDecode(token);
    console.log("TOKEN DECODIFICATO:", decoded);
  } catch (err) {
    console.log("ERRORE DECODIFICA TOKEN:", err);
    return;
  }

  // Mostra tutte le chiavi presenti nel token
  console.log("CHIAVI NEL TOKEN:", Object.keys(decoded));

  // Prova a leggere TUTTI i possibili campi ID
  console.log("decoded.id:", decoded.id);
  console.log("decoded.userId:", decoded.userId);
  console.log("decoded.idUtente:", decoded.idUtente);
  console.log("decoded.sub:", decoded.sub);

  // NON usare ancora utenteId, prima vediamo cosa contiene il token
}, []);

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
      const decoded = jwtDecode(token);

      if (decoded.ruolo === "ADMIN") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      console.error(err);
      setError("Email o password errate!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Accedi!</h2>
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

        <Link to="/register" className="text-decoration-none mt-2 d-block">
          Non sei registrato? Clicca qui per registrarti
        </Link>
      </form>
    </div>
  );
}