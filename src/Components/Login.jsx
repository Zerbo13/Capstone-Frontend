import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login({ setIsLogged }) {

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

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

  return (
    <div className="container mt-5">
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

        <Link to="/register" className="text-decoration-none mt-2 d-block text-white">
          Non sei ancora registrato? Clicca qui per registrarti
        </Link>

        <Link to="/home" className="text-decoration-none text-white mt-2 d-block">
          Torna alla home ↩️
        </Link>
      </form>
    </div>
  );
}