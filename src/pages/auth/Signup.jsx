import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";
function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("")


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUserNameChange = (e) => setUsername(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contactar al backend para registrar al usuario aqui

    const newUser = {
      email: email,
      password: password,
      username: username
    }

    try{

      //const response = await axios.post("http://localhost:5005/api/movies/signup", newUser)
      //console.log(response)
      await service.post("/auth/signup", newUser)
      
      navigate("/login")


    }catch (error){
      console.log(error)
      if(error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      }
      // si no y el error no es de usuario navegariamos a nuestra pag de error
    }


  };

  return (
    <div>

      <h1>Formulario de Registro</h1>
    
      <form onSubmit={handleSignup}>

        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br/>

        <label>Nombre de Usuario:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUserNameChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Registrar</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default Signup;


