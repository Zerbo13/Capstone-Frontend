import { Link } from "react-router-dom";


export default function Home(){
    return(
    <div className="container mt-5">
        <h1>Benvenuto nel nostro sito di padel!!</h1>
        <p>Hai effettuato correttamente l'accesso.</p>
        <Link to="/register" className="btn btn-primary mt-4">Clicca per registrarti o per fare il login</Link>

    </div>
    );
}