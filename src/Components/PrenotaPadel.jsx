import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";


function PrenotaPadel(){
    const[campi, setCampi] = useState([]);
    const[servizi, setServizi] = useState([]);
    const[orari, setOrari] = useState([]);
    const[metodoPagamento, setMetodoPagamento] = useState("online");
        const navigate = useNavigate();

   
    const[form, setForm] = useState({
        campoId: "",
        servizioId: "",
        data: "",
        oraInizio: "",
        oraFine:"",
        note: ""
    });

    const[error, setError] = useState("");
    const token = localStorage.getItem("token");

    //Campi
    useEffect(() => {
     fetch("http://localhost:3001/campi", { 
     headers: {Authorization: `Bearer ${token}`}
    })
      .then(response => {
        console.log("Status campi :", response.status);
        if(!response.ok) throw new Error("ERRORE NEL CARICAMENTO DEI CAMPI");
        return response.json();
      })
      .then(data => {
        console.log("Campi dal backend:", data);
        if(Array.isArray(data)){
            setCampi(data);
        }else if(Array.isArray(data.content)){
            setCampi(data.content);
        }else{
        setCampi([]);
    }})
      .catch(error=>{
      console.log.error("Errore Campi: ", error);
      });
    },[token]);

      //Servizi
       useEffect(() => {
        console.log("TOKEN:", localStorage.getItem("token"));
     fetch("http://localhost:3001/servizi", {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then(response=> {
        console.log("STATUS servizi: ", response.status);
        if(!response.ok) throw new Error("ERRORE NEL CARICAMENTO DEI SERVIZI");
        return response.json();
      })
      .then(data => {
        console.log("SERVIZI dal BE:", data)
        if(Array.isArray(data)){
            setServizi(data);
        }else if(Array.isArray(data.content)){
            setServizi(data.content);
        }else{
        setServizi([]);
      }})
     .catch(error=>{
      console.log.error("Errore servizi: ", error);
      });
    },[token]);
    
      //Slot orari
       useEffect(() => {
        if(!form.data || !form.campoId) return;
        fetch(`http://localhost:3001/campi/${form.campoId}/orari?data=${form.data}`, {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`
        }})
        .then(response=> {
        if(!response.ok) throw new Error("ERRORE NEL CARICAMENTO DEGLI ORARI");
        return response.json();
      })        .then(data => {
        console.log("CAMPI DAL BACKEND:", data);
        setOrari(data)})
        .catch(err => console.error(err));
       }, [form.data, form.campoId]);


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        if(!form.campoId){setError("Seleziona un campo"); return;}
        if(!form.servizioId){setError("Seleziona un servizio"); return;}
        if(!form.data){setError("Seleziona una data"); return;}
        if(!form.oraInizio){setError("Seleziona un'ora di inizio"); return;}
        try{
        const result = await fetch("http://localhost:3001/prenotazioni", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({...form, campoId: Number(form.campoId), servizioId: Number(form.servizioId)
            })
        });
            if(!result.ok){
                const err = await result.json();
                throw new Error(err.message || "Errore nella prenotazione");
            }
            if(metodoPagamento == "online"){
            const servizioSelezionato = servizi.find(s => String(s.id) === String(form.servizioId));
            const nomeServizio = servizioSelezionato ? servizioSelezionato.nome : "Prenotazione padel";
            const prezzo = servizioSelezionato ? servizioSelezionato.prezzo : 10;

            const stripeResult = await fetch("http://localhost:3001/pagamenti/checkout", {
                method: "POST",
                headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({nomeServizio: nomeServizio, prezzo: prezzo})
        });
        const stripeData = await stripeResult.json();
        window.location.href = stripeData.url;
    }else{alert("Prenotazione confermata! Ricordati di pagare al centro quando vieni a giocare!");
        navigate("/prenotazioneUtente");
    }
    }catch(err ){
            setError(err.message);
    }
    };

    return(
        <div className="container mt-5 pb-5">
            <h2 className="text-white text-center">Prenota il tuo campo!</h2>

            < div className="bg-white bg-opacity-10 rounded-4 p-5 " >
            <form onSubmit={handleSubmit} className="mt-3"> 

            {error && <div className="alert alert-warning">{error}</div>}


           {/*Servizio */}
           <label className="mt-3 text-white fw-bold fs-5">Scelgi un servizio</label>
           <select className="form-control mb-3"
           value={form.servizioId}
           onChange={(e) => setForm({ ...form, servizioId : e.target.value})}>
            <option value="">Seleziona un servizio</option>
            {servizi.map(s => (
                <option key={s.id} value={s.id}>
                    {s.nome} {s.prezzo}€
                </option>
            ))}
           </select>

            {/*Campo */}
           <label className="mt-3 text-white fw-bold fs-5">Scelgi un campo</label>
           <select className="form-control mb-3"
             value={form.campoId}
           onChange={(e) => setForm({ ...form, campoId : e.target.value})}>
            <option value="">Seleziona un campo</option>
            {campi.map(c => (
                <option key={c.id} value={c.id}>
                    {c.nome} {c.coperto ? "(Coperto)" : "(Panoramico)"}
                </option>
            ))}
           </select>


           {/*Data */}
           <label className="mt-3 text-white fw-bold fs-5">Scelgi un data</label>
           <input type="date" className="form-control mb-3"
             value={form.data} 
             onChange={(e) => setForm({ ...form, data : e.target.value})}  />


            {/*Orari */}
            {orari.length > 0 &&(
                <>
           <label className="mt-3 text-white fw-bold fs-5">Scelgi un orario</label>
           <div className="row mt-2">
            {orari.map((slot, index) => (
                <div key={index} className="col-4 mb-3"> 
                <div className="p-3 border rounded-5 text-center"
                /*VENGONO MOSTRATI GLI ORARI DISPONIBILI, SE UN ORARIO è STATO PRENOTATO IN UN CAMPO (ES. CAMPO 1 ORA 8:00 - 9:30),
                 GLI ORARI CHE SI TROVANO IN MEZZO A QUEL CAMPO NON VENGONO MOSTRATI (ES. CAMPO 1 ORA 8:30 - 10:00, CAMPO 1 ORA 9:00 10:30 ECC.) */
                style={{
                    cursor : "pointer",
                    backgroundColor: form.oraInizio === slot.inizio ? "#007bff" : "#266F44",
                    color: form.oraInizio === slot.inizio ? "white" : "white",
                    borderColor: form.oraInizio === slot.inizio ? "#0056b3" : "#ccc"
                }}
                onClick={() => setForm({ ...form, oraInizio : slot.inizio, oraFine : slot.fine})}>
                    {slot.inizio} - {slot.fine}
                   </div>
                </div>
            ))}
           </div>
        </> 
        )}

        {/*Note */}
        <label className="text-white fw-bold fs-5">Note </label>
        <textarea className="form-control mb-3 "   value={form.note} placeholder="Aggiungi cosa ti serve per rendere la tua partita perfetta!" onChange={(e) => setForm({...form, note: e.target.value})}/>
            <label className="text-white fw-bold fs-5 mt-3">Scegli il metodo di pagamento</label>
            <div className="d-flex gap-4 mt-2 mb-3">
                <div className="p-3 border rounded-4 text-center" style={{cursor: "pointer", flex:1, backgroundColor: metodoPagamento === "online" ? "#007bff" : "#266F44", color: "white"}} onClick={() => setMetodoPagamento("online")}>Paga ora oline</div>
                <div className="p-3 border rounded-4 text-center" style={{cursor: "pointer", flex:1, backgroundColor: metodoPagamento === "contanti" ? "#007bff" : "#266F44", color: "white"}} onClick={() => setMetodoPagamento("contanti")}>Paga al centro</div>
            </div>
            <button as={Link} to="/prenotazioniUtente" type="submit" className="btn button-log w-25 mt-3 mb-5">Conferma la prenotazione</button>
         </form>
         </div>  
         </div>
    );
}

export default PrenotaPadel;
