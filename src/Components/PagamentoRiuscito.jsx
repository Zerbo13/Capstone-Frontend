import { Link } from "react-router";

export default function PagamentoRiuscito(){
    return(
        <div className="container text-center text-white mt-5">
        <h1>Pagamento riuscito </h1>
        <p className="mt-3">Il pagamento è andato a buon fine! Goditi la tua prenotazione</p>
        <Link to="/prenotazioniUtente" className="btn button-log"> Le mie prenotazioni</Link>
        </div>
    );
}