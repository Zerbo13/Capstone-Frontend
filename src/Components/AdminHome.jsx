import { Link } from "react-router-dom";


function AdminHome(){
    return(
        <div className="container mt-5 text-center pb-5">
            
            
      
        <h1 className="text-white mb-4">Benvenuto nella sezione admin di Zerbo Padel!</h1>
                <h3 className="text-white mt-5">Benvenuto Admin!</h3>
           <h5 className="text-white mb-5">Cosa vuoi monitorare del tuo circolo?</h5>
        <Link to="/dashboard" className="btn mt-4 mb-5 button-log ">Clicca per monitorare tutte le azioni del circolo </Link>

         {/*SEZIONE PER IL CONTROLLO VELOCE DELLE ATTVITA' NELLA PAGINA HOME DELL'ADMIN*/}

        <div  className="bg-white bg-opacity-10 rounded-4 p-5">
        <h4 className="fw-bold mb-0  text-white">Gestione veloce</h4>
      <div className="row g-4 p-5">
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
              <h6 className="fw-bold mt-2 text-dark">Servizi</h6>
              <p className="text-muted small mb-0">Gestisci i servizi offerti</p>
            </div>
          </Link>
        </div>
      </div>
      </div>
    </div>
    )
}
export default AdminHome;