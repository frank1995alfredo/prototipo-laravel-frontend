import React, { useEffect, useState } from "react";

import axios from "axios";
import URL from "../config/URL";

const Login = ({ setToken }) => {
  const initialFormState = {
    email: "",
    password: "",
  };

  const [credencial, setCredencial] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setCredencial({ ...credencial, [name]: value });
    console.log(credencial);
  };

  const peticionLogin = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${URL}/login`, credencial).then((response) => {
        setCredencial(initialFormState);
        if (response.data) {
          setToken(response.data[0].token);
          console.log(response.data[0].token);
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
     <form onSubmit={peticionLogin}>
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
          <button type="submit" >Login</button>
        </div>
     </form>
       
      
    </>
  );
};

export default Login;
