import { Link } from "react-router";

export default function PagamentoRiuscito(){
    return(
        <div className="container text-center text-white mt-5">
        <div className="bg-white bg-opacity-10 rounded-4 p-5 mx-auto" style={{ maxWidth: "500px" }}>
        <h1>Pagamento riuscito </h1>
        <p className="mt-3">Il pagamento è andato a buon fine!</p>
        <p className="mt-3">Ti aspettiamo al nostro circolo per giocare, goditi la tua prenotazione!</p>
        <div className="d-flex gap-3 justify-content-center mt-4">
        <Link to="/prenotazioniUtente" className="btn button-log"> Le mie prenotazioni</Link>
        <Link to="/userHome" className="btn button-log"> Torna alla home</Link>
        </div>
        </div>
        </div>
    );
}