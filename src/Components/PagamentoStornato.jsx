import { Link } from "react-router";

export default function PagamentoStornato(){
    return(
        <div className="container text-center text-white mt-5">
        <h1>Pagamento stornato </h1>
        <p className="mt-3">Il pagamento non è andato a buon fine! Riprova più tardi</p>
        <Link to="/prenotazioni" className="btn button-log"> Torna alle prenotazioni</Link>
        </div>
    );
}