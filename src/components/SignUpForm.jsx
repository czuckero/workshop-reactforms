import { useState, useEffect } from "react"

export default function SignUpForm({setToken}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  
  async function handleSubmit(e) {
    e.preventDefault()
    console.log('It works!');
    const formData = {
      username: username,
      password: password
    };

    // Validating form inputs so 8 characters is required
    if (username.length < 8 || password.length < 8) {
        setError("Username and password must be at least 8 characters long.");
        return;
      }
    
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      })
      const result = await response.json();
      console.log(result);
      setToken(result.token);
      
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <>
      <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
        Username: 
          <input value={username} onChange={(e) => setUsername(e.target.value)}></input><br>
          </br>
        </label>
        <label>
        Password: 
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br>
          </br>
        </label>
        <button>Submit</button>
      </form>
      </div>
    </>

    )
}