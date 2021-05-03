import React, { useEffect, useState } from "react";
import useAuth from '../auth/useAuth'

import { useHistory, useLocation, NavLink } from "react-router-dom"
import axios from "axios";
import URL from "../config/URL";

const Login = ({ setToken, setUser }) => {
  const initialFormState = {
    email: "",
    password: "",
  };

  const [credencial, setCredencial] = useState(initialFormState);

  const history = useHistory() 
  const location = useLocation() //obtiene la ruta anterior
  const  previuObjectURL = location.state?.from //tiene los datos de una url
  const auth = useAuth()

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setCredencial({ ...credencial, [name]: value });
  };

  const peticionLogin = async () => {
   
    try {
      await axios.post(`${URL}/login`, credencial).then((response) => {
        setCredencial(initialFormState);
        if (response.data) {
          setToken(response.data[0].token);
          setUser(response.data[1][0].tipouser)
          auth.login()
          if(response.data[1][0].tipouser.replace(/['"]+/g, '') === "Supervisor"){
            history.push("/user")
          } else if(response.data[1][0].tipouser.replace(/['"]+/g, '') === "Administrador") {
            history.push("/admin")
          }    
        } else {
          setToken(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     <div className="container">
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="inputPassword"
                name="email"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm-10">
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                name="password"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button onClick={peticionLogin} >Login</button>
         <NavLink onClick={peticionLogin} to="/user" >Login</NavLink>
        </div>
    </>
  );
};

export default Login;
