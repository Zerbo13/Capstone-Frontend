import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { Col, Container, Row, Card, Button, Modal } from "react-bootstrap"
import { Form } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";



function ServiziPadel(){
   
  const [servizi, setServizi] = useState([])
  const[visualizzaForm, setvisualizzaForm] = useState(false);
  const[mostraAlert, setMostraAlert] = useState(false);
  const[mostraMessaggio, setMostraMessaggio] = useState(false);
  const[servizioEliminato, setServizioEliminato] = useState(null);
  const[nuovoServizio, setNuovoServizio]=useState({
    nome :"",
    descrizione :"",
    prezzo :"",
    durata :"",
    immagine: "",
    attivo: "",
  });



  const token = localStorage.getItem("token");
  let ruolo =null;

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
    fetch("http://localhost:3001/servizi", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setServizi( data.content || []);
      })
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

     fetch("http://localhost:3001/servizi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`},
    body: JSON.stringify({
      nome: nuovoServizio.nome,
      descrizione: nuovoServizio.descrizione,
      prezzo: Number(nuovoServizio.prezzo),
      durata: nuovoServizio.durata +":00",
      immagine: nuovoServizio.immagine,
      attivo: true
    }
    ),
  })
  .then((res) => {
    if(!res.ok) throw new Error("Errore nella creazione del servizio");
    return res.json();
  })
  .then(() => {
    setMostraAlert(true);
    setTimeout(( )=> setMostraAlert(false),3000);
    setvisualizzaForm(false);
    runFetch();
  })
  .catch((err) => console.error(err));
  };


{/*Fetch DELETE */}
  const handleDelete = (id) => {
    setServizioEliminato(id);
    setMostraMessaggio(true);
  }
  const confermaEliminazione = () => {
    fetch(`http://localhost:3001/servizi/${servizioEliminato}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>{
      if(!res.ok) throw new Error("Errore nell'eliminazione del servizio");
      setMostraMessaggio(false);
      runFetch();
    })
    .catch((err) => console.error(err));
  };

{/*Fetch PUT */}
const getServizioId = async(id)=>{
  const result = await fetch(`http://localhost:3001/servizi/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`},
      });
      return result.json();
    }
  

const handleAttivo = async(id, stato) =>{

  try{
    const servizio= await getServizioId(id);
    const payload ={
      nome : servizio.nome,
      descrizione: servizio.descrizione,
      prezzo: servizio.prezzo,
      durata: servizio.durata,
      immagine: servizio.immagine,
      attivo: !stato,
    };
    const result = await fetch(`http://localhost:3001/servizi/${id}`, {
method : "PUT",
headers: {
  "Content-Type" : "application/json",
   Authorization: `Bearer ${token}`,
   },
    body: JSON.stringify(payload),
});
if(!result.ok) throw new Error("Errore nella modifica dello stato nel servizio");
runFetch();
  }catch(err) {
    console.error(err);
  }
};



    return(
        <Container className="mt-4">
            <h1 className="text-white text-center">I nostri servizi </h1>
            {ruolo === "ADMIN" && (<Button className="button-log mt-3" onClick={() => setvisualizzaForm(!visualizzaForm)}>{visualizzaForm? "Chiudi il form" : "Aggiungi un nuovo servizio"}</Button>)}
            {mostraAlert && ( <Alert variant="success" className="mt-3">Campo creato correttamente!</Alert>)}
            {visualizzaForm && (
              <Form className="bg-white bg-opacity-10 text-white p-4 rounded mt-4" onSubmit={handleSubmit}>
                <h3>Aggiungi un nuovo servizio</h3>
                {/*Nome */}
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" value={nuovoServizio.nome} onChange={(e) => setNuovoServizio({...nuovoServizio, nome: e.target.value})}/>
                </Form.Group>
                {/*Descrizione */}
                <Form.Group className="mb-3">
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control type="text" value={nuovoServizio.descrizione} onChange={(e) => setNuovoServizio({...nuovoServizio, descrizione: e.target.value})}/>
                </Form.Group>
                {/*Prezzo */}
                <Form.Group className="mb-3">
                  <Form.Label>Prezzo €</Form.Label>
                  <Form.Control type="text" value={nuovoServizio.prezzo} onChange={(e) => setNuovoServizio({...nuovoServizio, prezzo: e.target.value})}/>
                </Form.Group>
                {/*Durata */}
                <Form.Group className="mb-3">
                  <Form.Label>Durata</Form.Label>
                  <Form.Control type="text" value={nuovoServizio.durata} onChange={(e) => setNuovoServizio({...nuovoServizio, durata: e.target.value})}/>
                </Form.Group>
                {/*Immagine */}
                <Form.Group className="mb-3">
                  <Form.Label>Immagine del servizio</Form.Label>
                  <Form.Control type="file" accept="image/" onChange={(e) => setNuovoServizio({...nuovoServizio, immagine: URL.createObjectURL(e.target.files[0])})}/>
                </Form.Group>

                <Button type="submit" className="button-log">Aggiungi il nuovo servizio</Button>
              </Form>
            )}

            {/* MODALE ELIMINAZIONE */}
            <Modal show={mostraMessaggio} onHide={() => setMostraMessaggio(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Conferma l'eliminazione del servizio!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Sei sicuro di voler eliminare il servizio?</Modal.Body>
             <Modal.Footer><Button variant="success" onClick={()=> setMostraMessaggio(false)}>Annulla</Button>
             <Button variant="danger" onClick={confermaEliminazione}>Elimina</Button></Modal.Footer> 
            </Modal>
      <Row>
        {servizi.map((client) => (
          
          <Col key={client.id} xs={12} md={6} lg={6} className="my-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={client.immagine} style={{height:"200px", objectFit: "cover"}} />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center px-1">
  <Card.Title className="fw-bold m-0">{client.nome}</Card.Title>

  {ruolo === "ADMIN" && (
    <Button
      variant="danger"
      size="sm"
      onClick={() => handleDelete(client.id)}
    >
      Elimina Servizio
    </Button>
  )}
</div>

{ruolo === "ADMIN" && (
  <div className="d-flex justify-content-end px-1 mt-1">
    <Button
      variant={client.attivo ? "warning" : "success"}
      size="sm"
      onClick={() => handleAttivo(client.id, client.attivo)}
    >
      {client.attivo ? "Disattiva" : "Attiva"}
    </Button>
  </div>
)}
                
<Card.Text>Descrizione: {client.descrizione} </Card.Text>
<Card.Text> Prezzo: {client.prezzo} €</Card.Text>
<Card.Text> Durata: {client.durata}</Card.Text>
<Card.Text>Servizio {client.attivo ? "Attivo" : "Non Attivo"}</Card.Text>
                <Link to="/prenotazioni" className="btn mt-0 button-log  text-center">Prenota questo servizio </Link>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    );

}

export default ServiziPadel;