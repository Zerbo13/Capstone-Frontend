import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function PrenotazioniUtente() {
  const [prenotazioni, setPrenotazioni] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let decoded;
    try {
      decoded = jwtDecode(token);
      console.log("TOKEN DECODIFICATO:", decoded);
    } catch {
      return;
    }

    const utenteId = decoded.id;

    fetch(`http://localhost:3001/prenotazioni/utente/${utenteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Prenotazioni utente:", data);
        setPrenotazioni(data);
      })
      .catch((err) => console.error("Errore prenotazioni:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Le mie prenotazioni</h2>

      {prenotazioni.length === 0 ? (
        <p className="mt-3">Non sono presenti prenotazioni.</p>
      ) : (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Servizio</th>
              <th>Data</th>
              <th>Orario</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {prenotazioni.map((p) => (
              <tr key={p.id}>
                <td>{p.campoNome || p.campo?.nome}</td>
                <td>{p.servizioNome || p.servizio?.nome}</td>
                <td>{p.data}</td>
                <td>{p.oraInizio} - {p.oraFine}</td>
                <td>{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

 