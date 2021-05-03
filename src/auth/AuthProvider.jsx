import { createContext, useState, useEffect } from "react";
import URL from "../config/URL";
import axios from "axios";
import valor_token from "../config/valor_token";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("token") || "null");
  const [rol, setRol] = useState(localStorage.getItem("user ") || "null");

  const peticionLogout = () => {
    const valor_token = localStorage.getItem("token");
    console.log(`${valor_token.replace(/['"]+/g, "")}`);
    axios
      .post(`${URL}/logout`, {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${valor_token.replace(/['"]+/g, "")}`,
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    try {
      localStorage.setItem("token", user);
    } catch (error) {
      localStorage.removeItem("token");
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem("user", rol);
    } catch (error) {
      localStorage.removeItem("user");
      peticionLogout();
    }
  }, [rol]);

  const contextValue = {
    user,
    login() {
      setUser(localStorage.getItem("token"));
      setRol(localStorage.getItem("user"));
    },
    logout() {
      const valor_token = localStorage.getItem("token");
      axios
        .post(`${URL}/logout`, {
         
        })
        .then((response) => {
          console.log(response);
        });
        
      setTimeout(function () {
        setUser("null");
        setRol("null");
      }, 1000);
    },
    isLogged() {
      //console.log(!!user)
      if (user === "null") {
        return false;
      } else {
        return true;
      }
    },
    admin(valor) {
      const admin = localStorage.getItem("user");
      if (admin.replace(/['"]+/g, "") === valor) {
        console.log(true);
        return true;
      } else {
        return false;
      }
    },

    user(valor) {
      const user = localStorage.getItem("user");
      if (user.replace(/['"]+/g, "") === valor) {
        console.log(true);
        return true;
      } else {
        return false;
      }
    },
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
