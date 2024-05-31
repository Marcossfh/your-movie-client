import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function Navbar() {

  const { aunthenticateUser, isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout =  async () => {

    // 1.quitar el token de localstorage
    localStorage.removeItem("authToken")

    // 2.cambiar las propiedades del contexto
    await aunthenticateUser() //esto fuerza que el token no sea valido y cambiar los estados

    // 3.redireccionar al usuario a pagina publica(home)
    navigate("/login")

  }

    return (
      
        <nav>
          <Link to="/">Home</Link>

          {isLoggedIn === false && <>

          <Link to="/signup">Registro</Link>
          <Link to="/login">Acceso</Link>
          </>}

          {isLoggedIn === true && <> 
          <Link to="/main-movies-page">Pagina principal</Link>
          <Link onClick={handleLogout}>Cerrar sesión</Link>
          </>}
        </nav>
      );
    }
    
    export default Navbar;
    