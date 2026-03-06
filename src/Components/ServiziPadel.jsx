import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { Col, Container, Row, Card, Button } from "react-bootstrap"

function ServiziPadel(){
   
  const [servizi, setServizi] = useState([])
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

    return(
        <Container className="mt-4">
            <h1>Servizi disponibili</h1>
            {ruolo === "ADMIN" && (<Button variant="primary">Aggiungi servizio</Button>)}
      <Row>
        {servizi.map((client) => (
          <Col xs={12} md={4} lg={2} className="my-4">
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    );

}

export default ServiziPadel;