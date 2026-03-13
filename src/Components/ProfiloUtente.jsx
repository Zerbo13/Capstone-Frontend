import { Alert } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";


export default function ProfiloUtente(){
    const[utente, setUtente] = useState(null);
    const[prenotazioni, setPrenotazioni] = useState([]);
    const[recensioni, setRecensioni] = useState([]);
    const[avatar, setAvatar] = useState(null);
    const[visualizzaForm, setVisualizzaForm] = useState(false);
    const[alertMessage, setAlertMessage] = useState("");
    const[alertType, setAlertType] = useState("success");
    const[form, setForm] = useState({nome: "", cognome: "", telefono: "", dataNascita: "", password: ""});

    const token = localStorage.getItem("token");
    let userId = null;
    let ruolo = null;
    if(token){
        try{
            const decoded = jwtDecode(token);
            userId = decoded.sub ||decoded.id;
        }catch(err){
            console.log("token non valido", err);
        }
    }

        const showAlert = (msg, type = "success") => {
        setAlertMessage(msg);
        setAlertType(type);
        setTimeout(() => setAlertMessage(""), 3000);
    };

    const fetchUtente = () => {
        fetch(`http://localhost:3001/utenti/${userId}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(result => result.json())
        .then(data => {setUtente(data); 
            setForm({nome: data.nome || "",
                cognome: data.cognome || "",
                email: data.email || "",
                telefono: data.telefono || "",
                dataNascita: data.dataNascita || "",
                password:  ""
            });
        })
        .catch(err => console.error(err))
       };

       /*fetch prenotazioni get */
        const fetchPrenotazioni = () => {
        fetch(`http://localhost:3001/prenotazioni/utente/${userId}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(result => result.json())
        .then(data => setPrenotazioni(Array.isArray(data)? data : []))
        .catch(err => console.error(err))
       };


       /*fetch recensioni get */
        const fetchRecensioni = () => {
        fetch(`http://localhost:3001/recensioni`)
        .then(result => result.json())
        .then(data =>{const mieRecensioni = Array.isArray(data)? data.filter(r => String(r.utente?.id) === String(userId)) : [];
        setRecensioni(mieRecensioni);
        })
        .catch(err => console.error(err))
       };


    useEffect(() => {
        if(!userId) return;
        fetchUtente();
        fetchPrenotazioni();
        fetchRecensioni();
    }, []);

    /*fetch upload avatar */
    const handleUploadAvatar = async () => {
        if(!avatar) return;
        const formData = new FormData();
        formData.append("avatar", avatar);
        try{
            const result = await fetch(`http://localhost:3001/utenti/${utente.id}/avatar`, {
            method: "PATCH",
            headers: {Authorization: `Bearer ${token}`},
            body: formData
        });
        if(!result.ok) throw new Error("Errore nell'upload dell'avatar");
        setAvatar(null);
        fetchUtente();
        showAlert("Foto profilo aggiornata correttamente!");
        }catch (err){
            showAlert(err.message, "attenzione");
        }
    };

    /*fetch update profilo */
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try{
            const result = await fetch(`http://localhost:3001/utenti/${utente.id}`, {
                method: "PUT",
            headers: {"Content-Type": "application/json",
                Authorization: `Bearer ${token}`},
            body: JSON.stringify({...form, avatar: utente.avatar})
        });
        if(!result.ok) throw new Error("Errore nella modifica dell'utente");
        fetchUtente();
        setVisualizzaForm(false);
        showAlert("Dati aggiornati correttamente!");
            }catch(err){
            showAlert(err.message, "attenzione");
        }
    };

    const renderStelle = (num) => "⭐".repeat(num);
    if(!utente) return <p className="text-white text-center mt-5">Caricamento in corso</p>
    return(
        <div className="container py-5 text-white">
            <h1 className="text-center fw-bold mb-5">Il mio profilo</h1>

            {alertMessage && <Alert variant={alertType} className="text-center"> {alertMessage} </Alert>}

            <div className="row justify-content-center mb-5"> 
                <div className="col-12 col-md-6">
                    <div className="bg-white bg-opacity-10 rounded-4 p-4 text-center">

                        {utente.avatar ? (
                        <img src={utente.avatar} alt="foto profilo" style={{width: "100px", height:"100px", borderRadius: "50%", objectFit: "cover", border: "1px solid black", marginBottom: "15px"}} />
                        ) : (
                            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                            /*Se non si imposta una foto profilo viene impostata un'icon sempre stile foto profilo uguale per tutti */
                                style={{width: "100px", height:"100px", borderRadius: "50%", backgroundColor: "#1d548c", fontSize: "3rem"}}>
                                 <FaUserTie style={{width: "40px",height:"25px",}} />
                            </div>
                        )}

                        <h5 className="fw-bold mt-2">{utente.nome} {utente.cognome}</h5>
                        <p className="mb-1"> {utente.email}</p>
                        <p className="mb-1"> {utente.telefono}</p>
                        <p className="mb-1"> {utente.dataNascita}</p>

                        <Button className="button-log mb-3" onClick={() => setVisualizzaForm(!visualizzaForm)}>{visualizzaForm ? "Torna indietro" : "Modifica i tuoi dati"}</Button>


                        {/*Update profile */}
                        {visualizzaForm && (
                            <Form className="bg-white bg-opacity-10 rounded-4 p-4 mt-3 text-white" onSubmit={handleUpdateProfile}>
                                <h4 className="mb-3">Aggiorna i tuoi dati</h4> 
                                <Form.Control className="mb-2" placeholder="Nome" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})}></Form.Control>
                                <Form.Control className="mb-2" placeholder="Cognome" value={form.cognome} onChange={(e) => setForm({...form, cognome: e.target.value})}></Form.Control>
                                <Form.Control className="mb-2" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}></Form.Control>
                                <Form.Control className="mb-2" placeholder="Telefono" value={form.telefono} onChange={(e) => setForm({...form, telefono: e.target.value})}></Form.Control>
                                <Form.Control className="mb-2" placeholder="Data" type="date" value={form.dataNascita} onChange={(e) => setForm({...form, dataNascita: e.target.value})}></Form.Control>
                                <Form.Control className="mb-2" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}></Form.Control>
                                 <Form.Text className="text-white mb-5 fw-bold fs-5">Aggiorna foto profilo</Form.Text>
                                 {/*Upload img */}
                        <div className="d-flex justify-content-center gap-2 mb-3">
                            <input type="file" accept="image/*" className="form-control form-control-sm w-auto" onChange={(e) => setAvatar(e.target.files[0])} />
                            <Button size="sm" className="button-log" type="button" onClick={handleUploadAvatar}>Cambia foto profilo</Button>
                        </div>
                            
                        {avatar && (
                    /*Viene mostrata in anteprima l'avatar che verrà messo*/ 
                    <img src={URL.createObjectURL(avatar)} alt="anteprima" style={{width: "90px", height:"90px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px"}} />
                )}
                                <div className="text-center"><Button type="submit" className="button-log">Salva modifiche</Button></div>
                            </Form>
                        )}

                    </div>
                </div>

                {/*Prenotazioni dell'utente */}
                {ruolo === "USER" &&(
                    <>
                <h3 className="fw-bold mb-3 text-center mt-3">Le mie prenotazioni</h3>
                {prenotazioni.length === 0 ? (
                   <p className="text-center"> Nessuna prenotazione fatta. È il momento di farne una! </p>
                ) : (
                    <div className="row g-3 mb-5">
                        {prenotazioni.map((p) => (
                            <div className="col-12 col-md-4" key={p.id}>
                                <div className="card border-0 shadow-sm p-3 h-100">
                                    <p className="fw-bold mb-1">{p.campo?.nome || "Campo"}</p> 
                                    <p className=" mb-1">{p.data}</p> 
                                    <p className=" mb-1">{p.orainizio} - {p.oraFine}</p> 
                                </div>
                                 </div>
                        ))}
                    </div>
                           )}
                           </>
                        )}
                {/*Recensioni dell'utente */}
                {ruolo === "USER" &&(
                    <>
                <h3 className="fw-bold mb-3 text-center mt-3">Le mie recensioni</h3>
                {recensioni.length === 0 ? (
                   <p className="text-center"> Nessuna recensione fatta. Lascia la tua prima recensione! </p>
                ) : (
                    <div className="row g-3 mb-5">
                        {recensioni.map((r) => (
                            <div className="col-12 col-md-4" key={r.id}>
                                <div className="card border-0 shadow-sm p-3 h-100 text-center">
                                    <div >{renderStelle(r.stelle)}</div>
                                    <p className="fw-bold mb-1">{r.testo}</p> 
                                    <p className=" mb-1">{r.data}</p>
                                </div>
                                 </div>
                        ))}
                    </div>
                           )}
                              </>
                        )}
            </div>
        </div>

    );

}