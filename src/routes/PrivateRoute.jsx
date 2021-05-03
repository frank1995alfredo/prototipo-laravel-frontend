
import React from 'react'
import { Route, Redirect, useLocation} from 'react-router-dom'
import useAuth from "../auth/useAuth"


 const PrivateRoute = ({component: Componet, ...rest}) => {
     const auth = useAuth()
     const location = useLocation()

    return (
        <Route {...rest} >
            {auth.isLogged() && auth.admin("Administrador") ? <Componet/> : <Redirect to={{pathname: "/", state: { from: location }}}/> }
        </Route>
    )
}

export default PrivateRoute