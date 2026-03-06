import { Link } from "react-router-dom";


function AdminHome(){
    return(
        <div className="container mt-5 text-center">
            <div className="row align-items-center">
        <div className="col-md-6 text-center text-md-start">
        <h1 className="text-white mb-4">Benvenuto su Zerbo Padel!</h1>
            <img src="./public/img/img_campoLogo.png" alt="foto_padel" className="foto-padel img-fluid"/>

 </div>

<div className="col-md-6 text-center">
    <h3 className="text-white">Benvenuto Admin!</h3>
           <h5 className="text-white">Cosa vuoi monitorare del tuo circolo?</h5>
        <Link to="/prenotazioni" className="btn mt-4 button-log ">Clicca per monitorare tutte le azioni del circolo </Link>
</div>
</div>
    </div>
    )
}
export default AdminHome;