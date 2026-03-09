import  {jwtDecode}  from "jwt-decode";
import { useEffect, useState } from "react"
import { Col, Container, Row, Card, Button, Modal } from "react-bootstrap"
import { Form } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";




export default function CampiPadel(){
    const [campi, setCampi] = useState([])
      const[visualizzaForm, setvisualizzaForm] = useState(false);
      const[mostraAlert, setMostraAlert] = useState(false);
      const[mostraMessaggio, setMostraMessaggio] = useState(false);
  const[campoEliminato, setCampoEliminato] = useState(null);
  const immaginiCampi = [
    "/img/Campo1.png",
        "/img/Campo2.png",
            "/img/Campo3.png"


  ];
  const[nuovoCampo, setNuovocampo]=useState({
    nome :"",
    descrizione :"",
    prezzoOra :"",
    tipo :"",
        coperto: false,
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
    fetch("http://localhost:3001/campi", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCampi(data.content);
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

     fetch("http://localhost:3001/campi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`},
    body: JSON.stringify({
      nome: nuovoCampo.nome,
      descrizione: nuovoCampo.descrizione,
      prezzoOra: Number(nuovoCampo.prezzoOra),
      tipo: nuovoCampo.tipo ,
      coperto: nuovoCampo.coperto,
      attivo: true,
    }
    ),
  })
  .then((res) => {
    if(!res.ok) throw new Error("Errore nella creazione del campo");
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
    setCampoEliminato(id);
    setMostraMessaggio(true);
  }
  const confermaEliminazione = () => {
    fetch(`http://localhost:3001/campi/${campoEliminato}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>{
      if(!res.ok) throw new Error("Errore nell'eliminazione del campo");
      setMostraMessaggio(false);
      runFetch();
    })
    .catch((err) => console.error(err));
  };

{/*Fetch PUT */}
const getCampoId = async(id)=>{
  const result = await fetch(`http://localhost:3001/campi/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`},
      });
      return result.json();
    }
  

const handleAttivo = async(id, stato) =>{

  try{
    const campo= await getCampoId(id);
    const payload ={
      nome : campo.nome,
      descrizione: campo.descrizione,
      coperto: campo.coperto,
      prezzoOra: campo.prezzoOra,
      tipo: campo.tipo,
      attivo: !stato,
    };
    const result = await fetch(`http://localhost:3001/campi/${id}`, {
method : "PUT",
headers: {
  "Content-Type" : "application/json",
   Authorization: `Bearer ${token}`,
   },
    body: JSON.stringify(payload),
});
if(!result.ok) throw new Error("Errore nella modifica dello stato nel campo");
runFetch();
  }catch(err) {
    console.error(err);
  }
};

    return(
        <Container className="mt-4">
            <h1 className="text-white text-center">I nostri campi</h1>
            {ruolo === "ADMIN" && (<Button className="button-log mt-3" onClick={() => setvisualizzaForm(!visualizzaForm)}>{visualizzaForm? "Chiudi il form" : "Aggiungi un nuovo campo"}</Button>)}
            {mostraAlert && ( <Alert variant="success" className="mt-3">Campo creato correttamente!</Alert>)}
            {visualizzaForm && (
              <Form className="bg-white bg-opacity-10 text-white p-4 rounded mt-4" onSubmit={handleSubmit}>
                <h3>Aggiungi un nuovo campo</h3>
                {/*Nome */}
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" value={nuovoCampo.nome} onChange={(e) => setNuovocampo({...nuovoCampo, nome: e.target.value})}/>
                </Form.Group>
                {/*Descrizione */}
                <Form.Group className="mb-3">
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control type="text" value={nuovoCampo.descrizione} onChange={(e) => setNuovocampo({...nuovoCampo, descrizione: e.target.value})}/>
                </Form.Group>
                {/*Prezzo */}
                <Form.Group className="mb-3">
                  <Form.Label>Prezzo €</Form.Label>
                  <Form.Control type="text" value={nuovoCampo.prezzoOra} onChange={(e) => setNuovocampo({...nuovoCampo, prezzoOra: e.target.value})}/>
                </Form.Group>
                {/*Tipo */}
                <Form.Group className="mb-3">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control type="text" value={nuovoCampo.tipo} onChange={(e) => setNuovocampo({...nuovoCampo, tipo: e.target.value})}/>
                </Form.Group>
                {/*Coperto */}
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Coperto" checked={nuovoCampo.coperto} onChange={(e) => setNuovocampo({...nuovoCampo, coperto: e.target.checked})}/>
                </Form.Group>

                <Button type="submit" className="button-log">Aggiungi il nuovo servizio</Button>
              </Form>
            )}
            <Modal show={mostraMessaggio} onHide={() => setMostraMessaggio(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Conferma l'eliminazione del campo!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Sei sicuro di voler eliminare il campo?</Modal.Body>
             <Modal.Footer><Button variant="success" onClick={()=> setMostraMessaggio(false)}>Annulla</Button>
             <Button variant="danger" onClick={confermaEliminazione}>Elimina</Button></Modal.Footer> 
            </Modal>
            <Row>
        {campi.map((client, index) => (
          <Col key={client.id} xs={12} md={6} lg={6} className="my-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={immaginiCampi[index % immaginiCampi.length]} style={{height:"250px", objectFit: "cover"}} />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center px-1">
  <Card.Title className="fw-bold m-0">{client.nome}</Card.Title>

  {ruolo === "ADMIN" && (
    <Button
      variant="danger"
      size="sm"
      onClick={() => handleDelete(client.id)}
    >
      Elimina Campo
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
                <Card.Text>
                  Descrizione: {client.descrizione} 
                </Card.Text>
                <Card.Text>
                  Prezzo ora: {client.prezzoOra} €
                </Card.Text>
                <Card.Text>
                  Tipo: {client.tipo}
                </Card.Text>
                <Card.Text> Campo {client.coperto ? "Coperto" : "Panoramico"}
                </Card.Text>
                 <Card.Text>
                    Campo {client.attivo ? "Attivo" : "Non Attivo"}
                </Card.Text>
                <Link to="/prenotazioni" className="btn mt-0 button-log  text-center">Prenota questo campo </Link>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    );
}