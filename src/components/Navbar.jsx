import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
//importar cntxt
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { aunthenticateUser, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("authToken");

    await aunthenticateUser();

    navigate("/login");
  };

  useEffect(() => {
    aunthenticateUser();
  }, [aunthenticateUser]);

  return (
    <nav>
      <Link to="/">Home</Link>

      {isLoggedIn === false && (
        <>
          <Link to="/signup">Registro</Link>
          <Link to="/login">Acceso</Link>
        </>
      )}

      {isLoggedIn === true && (
        <>
          <Link to="/main-movies-page">Pagina principal</Link>
          <Link to="/favorito-page">Favoritos</Link>
          <Link onClick={handleLogout}>Cerrar sesión</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
