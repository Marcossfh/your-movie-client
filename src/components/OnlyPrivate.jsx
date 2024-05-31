import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate } from 'react-router-dom'

function OnlyPrivate(props) {

    //estos componentes HOC solo los usamos sobre paginas completasen app.jsx , hay que ponerlo en todas

    const { isLoggedIn } = useContext(AuthContext)
    // si el usuario esta logead renderiza props.children

    if (isLoggedIn === true) {
        
        return props.children
    } else {
        //si no esta logeado, redirecciona
        return <Navigate to="/login"/>

    }
    
    

  
    return props.children 
}

export default OnlyPrivate