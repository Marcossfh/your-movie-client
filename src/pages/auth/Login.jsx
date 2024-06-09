import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config.services";

function Login() {
  
  const { aunthenticateUser } = useContext(AuthContext)
  
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contactar al backend para validar credenciales de usuario aqui
    const userCredentials = {
      email: email,
      password: password
    }

    try {

      //const response = await axios.post("http://localhost:5005/api/movies/login", userCredentials)
      
      const response = await service.post("/auth/login", userCredentials)
      
      //almacenamos el token en localStorage
      localStorage.setItem("authToken", response.data.authToken)
      console.log(response)

      //validamos el token y actualizamos los estados

      aunthenticateUser()

      //redireccionar a pagina privada/MainMoviesPage 
      navigate("/main-movies-page")




    } catch (error) {
      console.log(error)
      if(error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      }
      // si no y el error no es de usuario navegariamos a nuestra pag de error
      
    }
  };

  return (
    <div className="Login">

      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
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

        <button type="submit">Acceder</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      
    </div>
  );
}

export default Login;
