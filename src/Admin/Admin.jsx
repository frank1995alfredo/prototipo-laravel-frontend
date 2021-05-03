import React, { useEffect, useState } from "react";
import URL from "../config/URL";
import Layout from "../Components/Layout";

const Admin = () => {
    
  const [tipoUser, setTipoUser] = useState("");

  async function User() {
    try {
      const valor_token = localStorage.getItem("token");
      let response = await fetch(`${URL}/tipoUser`, {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${valor_token.replace(/['"]+/g, "")}`,
        },
      });
      response = await response.json();
      setTipoUser(response.data[0].name);
      console.log(response.data[0].name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    User();
  }, []);

  return (
    <>
      <Layout>
        <h1>Hola {tipoUser}</h1>
      </Layout>
    </>
  );
};

export default Admin;
