import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { Col, Container, Row, Card, Button } from "react-bootstrap"
import { Form } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';


function ServiziPadel(){
   
  const [servizi, setServizi] = useState([])
  const[visualizzaForm, setvisualizzaForm] = useState(false);
  const[mostraAlert, setMostraAlert] = useState(false);
  const[nuovoServizio, setNuovoServizio]=useState({
    nome :"",
    descrizione :"",
    prezzo :"",
    durata :"",
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
        setServizi(data.content);
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }
  useEffect(() => {
    runFetch()
  }, []);

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

                <Button type="submit" className="button-log">Aggiungi il nuovo servizio</Button>
              </Form>
            )}
      <Row>
        {servizi.map((client) => (
          <Col key={client.id} xs={12} md={4} lg={2} className="my-4">
            <Card className="h-100 my-3">
              <Card.Img variant="top" src={client.logo} />
              <Card.Body>
                <Card.Title>{client.ragioneSociale}</Card.Title>
                <Card.Text className="fs-6">
                  nome:
                  <br />
                  {client.nome}
                </Card.Text>
                <Card.Text>
                  descrizione: <br />
                  {client.descrizione} 
                </Card.Text>
                <Card.Text>
                  prezzo: <br />
                  {client.prezzo} €
                </Card.Text>
                <Card.Text>
                  durata: <br />
                  {client.durata}
                </Card.Text>
                  <Card.Text>
                  attivo: <br />
                  {client.attivo}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    );

}

export default ServiziPadel;