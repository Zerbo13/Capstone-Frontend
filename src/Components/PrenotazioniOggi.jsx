import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Container, Button, Modal, Alert } from "react-bootstrap";

export default function PrenotazioniOggi() {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [mostraMessaggio, setMostraMessaggio] = useState(false);
  const [prenotazioneEliminata, setPrenotazioneEliminata] = useState(null);
  const [mostraAlert, setMostraAlert] = useState(false);
  const [dataSelezionata, setDataSelezionata] = useState(new Date());

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

  {/*Formatto la data a YYYY-MM-DD */}
  const dataFormattata = (date) => {
    const anno = date.getFullYear();
    const mese = String(date.getMonth() +1 ).padStart(2, "0");
    const giorno = String(date.getDate() +1 ).padStart(2, "0");
    return `${anno}-${mese}-${giorno}`;
  };

  {/*transformo la data leggibile per il titolo */}
  const dataTitolo = () => {
    const oggi = dataFormattata(new Date());
    const selezionata = dataFormattata(dataSelezionata);
    if(selezionata === oggi) return "Oggi";
    return dataSelezionata.toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month:"long",
        year: "numeric",
    });
};

/*Cambia il giorno */
const cambiaGiorno = (offset) => {
    setDataSelezionata((prev) => {
        const nuovaData = new Date(prev);
        nuovaData.setDate(nuovaData.getDate() + offset);
        return nuovaData;
    });
};


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

  /*filtro per il giorno che selezioni */
  const filtraPrenotazioni = prenotazioni.filter((p) => p.data === dataFormattata(dataSelezionata));

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

  const Oggi = dataFormattata(dataSelezionata) === dataFormattata(new Date());

  return (
   
    <Container className="mt-4">
         <div className="d-flex align-items-center gap-3 mb-3">
        <Button className="button-log" onClick={() => cambiaGiorno(-1)}>Precedente</Button>
    
      <h2 className="text-white mb-0 text-capitalize flex-grow-1 text-center">Tutte le prenotazioni di {dataTitolo()}</h2>
              <Button className="button-log" onClick={() => cambiaGiorno(1)}>Successivo</Button>
             
</div>
      {mostraAlert && (
        <Alert variant="success" className="mt-3">
          Prenotazione eliminata correttamente!
        </Alert>
      )}

      {filtraPrenotazioni.length === 0 ? (
        <p className="mt-3 text-white text-center fw-bold fs-5">Non sono presenti prenotazioni per questo giorno selezionato.</p>
      ) : (
        <table className="table mt-4 ">
          <thead>
            <tr>
              <th>Utente</th>
              <th>Campo</th>
              <th>Servizio</th>
              <th>Orario</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filtraPrenotazioni.map((p) => (
              <tr key={p.id}>
                <td>{p.utenteNome || p.utente?.nome} {p.utenteCognome || p.utente?.cognome}</td> 
                <td>{p.campoNome || p.campo?.nome}</td>
                <td>{p.servizioNome || p.servizio?.nome}</td>
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