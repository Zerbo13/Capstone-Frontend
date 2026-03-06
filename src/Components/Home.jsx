import { Link } from "react-router-dom";
import { PiTennisBallBold } from "react-icons/pi";



export default function Home(){
    return(
    <div className="container mt-5 text-center">
            <div className="row align-items-center">
        <div className="col-md-6 text-center text-md-start">
        <h1 className="text-white mb-4">Benvenuto su Zerbo padel!</h1>
            <img src="./public/img/img_campoLogo.png" alt="foto_padel" className="foto-padel img-fluid"/>

 </div>

<div className="col-md-6 text-center">
    <ul className="text-white list-item">
        <li className="pt-1">Il miglior sito di prenotazioni di campi da padel!😜</li>
        <li className="pt-1">Il miglior circolo di padel in tutta Italia 🎾</li>
        <li className="pt-1">Registrati per scoprire e prenotare i nostri servizi!</li>
        <li className="pt-1">Maestri qualificati e selezionati dalla FITP <PiTennisBallBold /></li>
    </ul>
  

        <Link to="/register" className="btn mt-4 button-log">Clicca per registrarti o per fare il login </Link>
</div>
</div>
    </div>
    );
}