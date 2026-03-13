import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Container, Button, Modal, Alert } from "react-bootstrap";

export default function AllPrenotazioni() {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [mostraMessaggio, setMostraMessaggio] = useState(false);
  const [prenotazioneEliminata, setPrenotazioneEliminata] = useState(null);
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
    fetch(`http://localhost:3001/prenotazioni`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(Array.isArray(data)){
        setPrenotazioni(data);
        }else if(Array.isArray(data.content)){
            setPrenotazioni(data.content);
        }else{
            setPrenotazioni([]);
        }
      })
      .catch((err) => console.error("Errore prenotazioni:", err));
  };

  useEffect(() => {
    if (utenteId) runFetch();
  }, [utenteId]);

  // APRI MODALE
  const handleDelete = (id) => {
    setPrenotazioneEliminata(id);
    setMostraMessaggio(true);
  };

  // CONFERMA ELIMINAZIONE
  const confermaEliminazione = () => {
    fetch(`http://localhost:3001/prenotazioni/${prenotazioneEliminata}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nell'eliminazione della prenotazione");
        setMostraMessaggio(false);
        setMostraAlert(true);
        setTimeout(() => setMostraAlert(false), 3000);
        runFetch();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-white">Tutte le prenotazioni</h2>

      {mostraAlert && (
        <Alert variant="success" className="mt-3">
          Prenotazione eliminata correttamente!
        </Alert>
      )}

      {prenotazioni.length === 0 ? (
        <p className="mt-3 text-white text-center fw-bold">Non sono presenti prenotazioni.</p>
      ) : (

        /*Tabella per visualizzare tutte le prenotazioni parte admin */
        <table className="table mt-4 ">
          <thead>
            <tr>
              <th>Utente</th>
              <th>Campo</th>
              <th>Servizio</th>
              <th>Data</th>
              <th>Orario</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {prenotazioni.map((p) => (
              <tr key={p.id}>
                <td>{p.utenteNome || p.utente?.nome} {p.utenteCognome || p.utente?.cognome}</td> 
                <td>{p.campoNome || p.campo?.nome}</td>
                <td>{p.servizioNome || p.servizio?.nome}</td>
                <td>{p.data}</td>
                <td>
                  {p.oraInizio} - {p.oraFine}
                </td>
                <td>{p.note}</td>
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
          Sei sicuro di voler eliminare questa prenotazione?
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