import { Link } from "react-router";

export default function PagamentoStornato(){
    return(
        <div className="container text-center text-white mt-5">
        <div className="bg-white bg-opacity-10 rounded-4 p-5 mx-auto" style={{ maxWidth: "500px" }}>
        <h1>Pagamento stornato </h1>
        <p className="mt-3">Il pagamento non è andato a buon fine! ❌</p>
        <p className="mt-3">Nessuun addebito è stato effettuato sul tuo conto. Riprova quando vuoi.</p>
        <div className="d-flex gap-3 justify-content-center mt-4">
        <Link to="/prenotazioni" className="btn button-log"> Riprova</Link>
        <Link to="/userHome" className="btn button-log"> Torna alla home</Link>
        </div>
        </div>
        </div>
    );
}