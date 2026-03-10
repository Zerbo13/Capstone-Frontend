import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Container, Button, Modal, Alert } from "react-bootstrap";

export default function UtentiRegistrati() {
  const [utente, setUtente] = useState([]);
  const [mostraMessaggio, setMostraMessaggio] = useState(false);
  const [utenteEliminato, setUtentiEliminato] = useState(null);
  const [mostraAlert, setMostraAlert] = useState(false);

  const token = localStorage.getItem("token");

  let decoded = null;
  let utenteId = null;

  if (token) {
    try {
      decoded = jwtDecode(token);
      utenteId = decoded.sub || decoded.id;
    } catch (err) {
      console.log("Token non valido:", err);
    }
  }

  // FETCH GET PRENOTAZIONI
  const runFetch = () => {
    fetch(`http://localhost:3001/utenti`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(Array.isArray(data)){
        setUtente(data);
        }else if(Array.isArray(data.content)){
            setUtente(data.content);
        }else{
            setUtente([]);
        }
      })
      .catch((err) => console.error("Errore nel caricamento utenti:", err));
  };

  useEffect(() => {
    if (utenteId) runFetch();
  }, [utenteId]);

  // APRI MODALE
  const handleDelete = (id) => {
    setUtentiEliminato(id);
    setMostraMessaggio(true);
  };

  // CONFERMA ELIMINAZIONE
  const confermaEliminazione = () => {
    fetch(`http://localhost:3001/utenti/${utenteEliminato}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nell'eliminazione dell'utente");
        setMostraMessaggio(false);
        setMostraAlert(true);
        setTimeout(() => setMostraAlert(false), 3000);
        runFetch();
      })
      .catch((err) => console.error(err));
  };

  const filtraUtenti = utente.filter(
    (u) => u.ruolo !== "ADMIN" && u.ruolo !== "ADMIN"
  );

  return (
    <Container className="mt-4">
      <h2 className="text-white">Tutte gli utenti registrati</h2>

      {mostraAlert && (
        <Alert variant="success" className="mt-3">
          Utente eliminata correttamente!
        </Alert>
      )}

      {filtraUtenti.length === 0 ? (
        <p className="mt-3 text-white text-center fw-bold">Non sono presenti utenti.</p>
      ) : (
        <table className="table mt-4 ">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Data di nascita</th>
              <th>Data di registarzione</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filtraUtenti.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.cognome }</td>
                <td>{p.email}</td>
                <td>{p.telefono}</td>
                <td>{p.dataNascita}</td>
                <td>{p.dataRegistrazione}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Elimina
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODALE ELIMINAZIONE */}
      <Modal show={mostraMessaggio} onHide={() => setMostraMessaggio(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Sei sicuro di voler eliminare questo utente?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={() => setMostraMessaggio(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={confermaEliminazione}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}