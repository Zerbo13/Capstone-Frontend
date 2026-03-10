import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Dashboard  ()  {

  const [statistiche, setStatistiche] = useState(null);
  const [caricamento, setCaricamento ] = useState(true);
  const token = localStorage.getItem("token");

    {/*Formatto la data a YYYY-MM-DD */}
  const dataFormattata = (date) => {
    const anno = date.getFullYear();
    const mese = String(date.getMonth() +1 ).padStart(2, "0");
    const giorno = String(date.getDate()).padStart(2, "0");
    return `${anno}-${mese}-${giorno}`;
  };

  useEffect(() => {
    if(!token) return;
const headers = { Authorization: `Bearer ${token}` };
    const oggi = dataFormattata(new Date());
    /*USANDO PROMISE.ALL POSSIAMO ESEGUIRE PIU' FETCH INSIEME INVECE CHE FARLE UNA ALLA VOLTA COME IN QUESTO CASO */
    Promise.all([
      fetch("http://localhost:3001/prenotazioni", {headers}).then(res => res.json()),
      fetch("http://localhost:3001/utenti", {headers}).then(res => res.json()),
      fetch("http://localhost:3001/campi", {headers}).then(res => res.json()),
      fetch("http://localhost:3001/servizi", {headers}).then(res => res.json()),
    ]).then(([prenotazioni, utenti, campi, servizi]) => {
      const tuttePrenotazioni = Array.isArray(prenotazioni) ? prenotazioni : prenotazioni.content ?? [];
      const tuttiUtenti = Array.isArray(utenti) ? utenti : utenti.content ?? [];
      const tuttiCampi = Array.isArray(campi) ? campi : campi.content ?? [];
      const tuttiServizi = Array.isArray(servizi) ? servizi : servizi.content ?? [];

      setStatistiche({
        totalePrenotazioni: tuttePrenotazioni.length,
        totalePrenotazioniOggi: tuttePrenotazioni.filter(p => p.data === oggi).length,
        totaleUtenti: tuttiUtenti.filter(u => u.ruolo !== "ADMIN").length,
        totaleCampi: tuttiCampi.length,
        totaleServizi: tuttiServizi.length,
      });
      setCaricamento(false);
    })
    .catch(error => {
      console.error("Errore nel caricamento delle statistiche", error);
    })
}, []);

if(caricamento){
  return (
  <div className="d-flex justify-content-center py-5">
    <div className="sprinner-border text-success">
      <span className="visually-hidden">Caricamento in corso...</span>
    </div>
  </div>
  );
}

return(
  <div className="container py-5">
  <h2 className="fw-bold mb-4 text-white text-center">Benvenuto nella dashboard dell'admin!</h2>
  <div className="row g-4 mb-5">
    <div className="col-md-6 col-lg-4">
          <div className="card card-utenti border-0 shadow-sm text-white">
                <div className="card-body text-center p-4">
                  <h3 className="fw-bold">{statistiche?.totaleUtenti || 0}</h3>
                  <p className="mb-0">Utenti registrati</p>
                  </div>
            </div>
    </div>
    <div className="col-md-6 col-lg-4">
          <div className="card card-prenotazioni border-0 shadow-sm text-white">
                <div className="card-body text-center p-4">
                  <h3 className="fw-bold">{statistiche?.totalePrenotazioni || 0}</h3>
                  <p className="mb-0">Prenotazioni totali</p>
                  </div>
            </div>
    </div>
    <div className="col-md-6 col-lg-4">
          <div className="card card-prenotazioni-Oggi border-0 shadow-sm text-white">
                <div className="card-body text-center p-4">
                  <h3 className="fw-bold">{statistiche?.totalePrenotazioniOggi || 0}</h3>
                  <p className="mb-0">Prenotazioni oggi</p>
                  </div>
            </div>
    </div>
    <div className="col-md-6 col-lg-4">
          <div className="card card-campi border-0 shadow-sm text-white">
                <div className="card-body text-center p-4">
                  <h3 className="fw-bold">{statistiche?.totaleCampi || 0}</h3>
                  <p className="mb-0">Campi totali</p>
                  </div>
            </div>
    </div>
    <div className="col-md-6 col-lg-4">
          <div className="card card-servizi border-0 shadow-sm text-white">
                <div className="card-body text-center p-4">
                  <h3 className="fw-bold">{statistiche?.totaleServizi || 0}</h3>
                  <p className="mb-0">Servizi offerti</p>
                  </div>
            </div>
    </div>
  </div>

   <h4 className="fw-bold mb-3 text-white">Monitora il tuo sito</h4>
   <h6 className="fw-bold mb-3 text-white">Scegli quale attività gestire!</h6>
      <div className="row g-4">
        <div className="col">
          <Link to="/allPrenotazioni" className="card border-0 shadow-sm text-decoration-none h-100">
            <div className="card-body text-center p-4">
              <span style={{ fontSize: "2.5rem" }}>📅</span>
              <h6 className="fw-bold mt-2 text-dark">Tutte le Prenotazioni</h6>
              <p className="text-muted small mb-0">Visualizza tutte le prenotazioni</p>
            </div>
          </Link>
        </div>

        <div className="col">
          <Link to="/prenotazioniOggi" className="card border-0 shadow-sm text-decoration-none h-100">
            <div className="card-body text-center p-4">
              <span style={{ fontSize: "2.5rem" }}>📌</span>
              <h6 className="fw-bold mt-2 text-dark">Prenotazioni Oggi</h6>
              <p className="text-muted small mb-0">Visualizza le prenotazioni di oggi</p>
            </div>
          </Link>
        </div>

        <div className="col">
          <Link to="/utentiRegistrati" className="card border-0 shadow-sm text-decoration-none h-100">
            <div className="card-body text-center p-4">
              <span style={{ fontSize: "2.5rem" }}>🙋</span>
              <h6 className="fw-bold mt-2 text-dark">Utenti</h6>
              <p className="text-muted small mb-0">Visualizza gli utenti registrati</p>
            </div>
          </Link>
        </div>

        <div className="col">
          <Link to="/campi" className="card border-0 shadow-sm text-decoration-none h-100">
            <div className="card-body text-center p-4">
              <span style={{ fontSize: "2.5rem" }}>🏟️</span>
              <h6 className="fw-bold mt-2 text-dark">Campi</h6>
              <p className="text-muted small mb-0">Gestisci i campi da gioco</p>
            </div>
          </Link>
        </div>
         <div className="col">
          <Link to="/servizi" className="card border-0 shadow-sm text-decoration-none h-100">
            <div className="card-body text-center p-4">
              <span style={{ fontSize: "2.5rem" }}>🎾</span>
              <h6 className="fw-bold mt-2 text-dark">Campi</h6>
              <p className="text-muted small mb-0">Gestisci i servizi offerti</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
);

}
export default Dashboard;
