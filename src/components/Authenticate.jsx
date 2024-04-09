import { useState } from "react";

export default function Authenticate({token}) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null)
  const [displayUsername, setDisplayUsername] = useState(null)

  async function handleClick() {
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', 
      { 
        method: "GET", 
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        }
      })
      const result = await response.json();
      console.log(result);
      setSuccessMessage(result.message)
      setDisplayUsername(result.data.username)
    } catch (error) {
      setError(error.message)
    }
  } 
  
  return (
    <div>
      <h2>Authenticate</h2>
      {error && <p>Error: {error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {displayUsername && <p className="display-username">Welcome, {displayUsername}!</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>  
  )
}