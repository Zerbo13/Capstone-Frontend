import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Form, Button, Alert } from "react-bootstrap";



export default function Recensioni(){
    const [recensioni, setRecensioni] = useState([]);
    const[nuovaRecensione, setNuovaRecensione] = useState({testo: "", stelle:0});
    const[mostraAlert, setMostraAlert] = useState(false);
    const [error, setError] = useState("");
    const [hover, setHover] = useState(0);


    const token = localStorage.getItem("token");
      let ruolo = null;
    
      if(token){
        try{
          const decode = jwtDecode(token);
          ruolo = decode.ruolo;
        }catch(err){
          console.log("token non valido:", err);
        }
      }
    
    
      {/*Fetch GET */}
    
      const runFetch = () => {
        fetch("http://localhost:3001/recensioni")
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setRecensioni(Array.isArray(data) ? data : []);})
          .catch((error) => {
            console.error("Error:", error)
          })
      }
      useEffect(() => {
        runFetch()
      }, []);
    
    
      {/*Fetch POST */}
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
    
         fetch("http://localhost:3001/recensioni", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nuovaRecensione),          
        })
         .then((res) => {
        if(!res.ok) throw new Error("Errore nella creazione della recesione");
        return res.json();
      })
      .then(() => {
        setMostraAlert(true);
        setTimeout(( )=> setMostraAlert(false),3000);
        setNuovaRecensione({testo: "", stelle: 0});
        runFetch();
      })
      .catch((err) => console.error(err));
      };

      const StarSvg = ({filled}) => {
        return(
        <svg style={{ fill: filled ? "#00ffff" : "white", cursor: "pointer", transition: "fill 0.2s" }}
              width="40"
              height="40"
              viewBox="0 0 47 46"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.2044 1.55551C22.6143 0.569963 24.0104 0.569964 24.4203 1.55552L29.9874 14.9402C30.1602 15.3557 30.5509 15.6396 30.9994 15.6756L45.4494 16.834C46.5134 16.9193 46.9448 18.2471 46.1341 18.9415L35.1248 28.3722C34.7831 28.6649 34.6338 29.1242 34.7382 29.5619L38.1018 43.6626C38.3494 44.7009 37.2199 45.5215 36.309 44.9651L23.9379 37.4089C23.5538 37.1743 23.0709 37.1743 22.6868 37.4089L10.3157 44.9651C9.40478 45.5215 8.27528 44.7009 8.52295 43.6626L11.8865 29.5619C11.9909 29.1242 11.8416 28.6649 11.4999 28.3722L0.490575 18.9415C-0.320069 18.2471 0.111362 16.9193 1.17535 16.834L15.6253 15.6756C16.0738 15.6396 16.4645 15.3557 16.6374 14.9402L22.2044 1.55551Z"
              />
            </svg>
        );
      };

      const renderStelle = (num) => (
        <div className="d-flex justify-content-center gap-1">
          {[1,2,3,4,5].map((i) => (<StarSvg key={i} filled={i <= num}/>))}
          </div>
      );
    


      return(
        <section className="py-5 text-white">
        <div className="container">
          <h1 className="text-center fw-bold mb-5">Recensioni di chi ci ha scelto!</h1>
            {mostraAlert && ( <Alert variant="success" className="mt-3">Recensione inviata correttamente!</Alert>)}

          {ruolo === "USER" && (
            <div className="row justify-content-center mb-4">
            <div className="col-12 col-md-6">
                <Form className="bg-white bg-opacity-10 text-white p-4 rounded mt-4" onSubmit={handleSubmit}>
                <h3 className="mb-3">Scrivi la tua recensione!</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                {/*Testo */}
                <Form.Group className="mb-3">
                  <Form.Label>Testo</Form.Label>
                  <Form.Control as="textarea" placeholder="Scrivi la tua esperienza da noi" rows={3} value={nuovaRecensione.testo} onChange={(e) => setNuovaRecensione({...nuovaRecensione, testo: e.target.value})}/>
                </Form.Group>
                {/*Stelle, con questo le ho rese cliccabili*/}
                <Form.Group className="mb-3">
                  <Form.Label>Stelle: </Form.Label>
                  <div className="d-flex justify-content-center gap-2 mt-2">
                    {[1,2,3,4,5].map((i) => (
                      <span key={i} onClick={() => setNuovaRecensione({...nuovaRecensione, stelle:i})}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(0)}>
                        <StarSvg filled={i <= (hover || nuovaRecensione.stelle)}/>
                      </span>
                    ))}
                </div>
                </Form.Group>
                <div className="text-center">
                <Button type="submit" className="button-log ">Invia recensione</Button>
                </div>
              </Form>
            </div>
            </div>
        )}
        {recensioni.length === 0 ? (
            <p className="text-center text-white">Nessuna recensione ancora prensente! Aggiungila tu per primo </p>
        ): (
            <div className="row g-4 justify-content-center">
                {recensioni.map((r) => (
                <div key={r.id} className="col-12 col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className=" rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px', backgroundColor: '#1d548c' }}>
                    <span style={{ fontSize: '2.5rem' }}>👤</span>
                  </div>
                  <h5 className="fw-bold">{r.utente?.nome} {r.utente?.cognome}</h5>
                  <div className="mb-2">{renderStelle(r.stelle)}</div>
                  <p className="mb-1">{r.testo}</p>
                  <small className="text-muted">{r.data}</small>
                </div>
              </div>
            </div>
             ))}
          </div>
           )}
        </div>
      </section> 
      );
}