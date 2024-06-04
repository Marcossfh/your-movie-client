import axios from "axios";
import { createContext, useState } from "react";
import service from "../services/config.services";


//componente que comparte el contexto
const AuthContext = createContext()


//componente envoltorio
function AuthWrapper(props) {

const [ isLoggedIn, setIsLoggedIn ] = useState(false)
const [ loggedUserId, setLoggedUserId ] = useState(null)

    const aunthenticateUser = async () => {

        //llama a /verify, valida el token y actualiza los estados acorde.
        const authToken = localStorage.getItem("authToken")

        //clausula de guardia, si el token no existe no hace falta hacer la llamada
        if(!authToken){
            setIsLoggedIn(false)
            setLoggedUserId(null)
            return 
        }

        try {
            
            //const response = await axios.get("http://localhost:5005/api/movies/verify", {
              //  headers: { authorization: `Bearer ${authToken}` }
            //})

            const response = await service.get("/auth/verify")

            //el token es valido
            setIsLoggedIn(true)
            setLoggedUserId(response.data.payload._id)

        } catch (error) {
            // el token no es valido o ha expirado
            setIsLoggedIn(false)
            setLoggedUserId(null)
        }


    }

    const passedContext = {
        isLoggedIn,
        loggedUserId,
        aunthenticateUser
    }

    return(
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )


}

export {
    AuthContext,
    AuthWrapper
}