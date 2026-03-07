import  {jwtDecode}  from "jwt-decode";
import { useEffect, useState } from "react"
import { Col, Container, Row, Card, Button } from "react-bootstrap"
import { Form } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';



export default function CampiPadel(){
    const [campi, setCampi] = useState([])
      const[visualizzaForm, setvisualizzaForm] = useState(false);
      const[mostraAlert, setMostraAlert] = useState(false);
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
            <Row>
        {campi.map((client) => (
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
                  prezzo ora: <br />
                  {client.prezzoOra} €
                </Card.Text>
                <Card.Text>
                  tipo: <br />
                  {client.tipo}
                </Card.Text>
                <Card.Text>
                  coperto: <br />
                  {client.coperto}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    );
}