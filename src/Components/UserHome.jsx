import { Link } from "react-router-dom";
import { GiTennisCourt } from "react-icons/gi";
import { PiTennisBallBold } from "react-icons/pi";
import Recensioni from "./Recensioni";



function UserHome(){
    return(
               <div className="container mt-5 text-center">
                        <h1 className="text-white mb-4">Benvenuto su Zerbo Padel!</h1>

                <div className="mb-4"><video src="https://res.cloudinary.com/dbbxjymsw/video/upload/v1773218681/VideoPadel_pg44ud.mp4" className="w-100" autoPlay loop muted playsInline style={{borderRadius: "10px", maxHeight: "550px", objectFit:"cover"}}/>
      </div>
            <div className="row align-items-center">
        <div className="col-md-6 text-center text-md-start">
        < div className="bg-white bg-opacity-10 rounded-4 p-5">
                <img src="./img/img_campoLogo.png" class="img-fluid p-2 bg-light" alt="Foto padel" />
                <p className="mt-3 mb-0 fs-5 text-center text-white">Prenota, gioca, divertiti.</p>
              </div>
 </div>

<div className="col-md-6 text-center">
    <ul className="text-white list-item">
        <li className="pt-1">Il miglior sito di prenotazioni di campi da padel!😜</li>
        <li className="pt-1">Il miglior circolo di padel in tutta Italia 🎾</li>
        <li className="pt-1">Campi di ultima generazione <GiTennisCourt /></li>
        <li className="pt-1">Istruttori qualificati e selezionati dalla FITP <PiTennisBallBold /></li>
    </ul>
  

        <Link to="/prenotazioni" className="btn mt-4 button-log">Clicca per prenotare un campo </Link>
</div>
</div>
<section className="py-5 text-white">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Perché scegliere Zerbo Padel?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className=" rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', backgroundColor: '#1d548c' }}>
                    <span style={{ fontSize: '2.5rem' }}>🏟️</span>
                  </div>
                  <h5 className="fw-bold">Campi di Qualità</h5>
                  <p className="">I nostri campi sono realizzati con materiali professionali e superfici in erba sintetica di ultima generazione. Abbiamo strutture coperte e all'esterno che permettono di giocare in qualsiasi stagione.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className=" rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', backgroundColor: '#1d548c' }}>
                    <span style={{ fontSize: '2.5rem' }}>📅</span>
                  </div>
                  <h5 className="fw-bold">Prenotazione Facile</h5>
                  <p className="">Grazie al nostro sistema di prenotazione online puoi riservare il tuo campo in modo rapido e intuitivo. Basta selezionare giorno, orario e tipo di servizio, e il gioco è fatto.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', backgroundColor: '#1d548c' }}>
                    <span style={{ fontSize: '2.5rem' }}>👨‍🏫</span>
                  </div>
                  <h5 className="fw-bold">Istruttori qualificati FITP</h5>
                  <p className="">Offriamo lezioni personalizzate, il nostro team è composto da istruttori certificati, allenamenti mirati e sessioni di gruppo. Perfetto per chi vuole crescere in questo sport divertendosi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
            <Recensioni/>
      
    </div>
    )
}
export default UserHome;