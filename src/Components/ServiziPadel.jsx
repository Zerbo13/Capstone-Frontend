import { useEffect, useState } from "react"

function ServiziPadel(){
   
  const [servizi, setServizi] = useState([])

  const runFetch = () => {
    fetch("http://localhost:3001/servizi", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setServizi(data.content)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }
  useEffect(() => {
    runFetch()
  }, [])
    return

}

export default ServiziPadel;