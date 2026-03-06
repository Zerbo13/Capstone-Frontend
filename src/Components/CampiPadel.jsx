import  {jwtDecode}  from "jwt-decode";
import { useEffect, useState } from "react"
import { Col, Container, Row, Card, Button } from "react-bootstrap"

export default function CampiPadel(){
    const [campi, setCampi] = useState([])
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

    return(
        <Container className="mt-4">
            <h1>I nostri campi disponibili</h1>
            {ruolo === "ADMIN" && (<Button variant="primary">Aggiungi campo</Button>)}
      <Row>
        {campi.map((client) => (
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