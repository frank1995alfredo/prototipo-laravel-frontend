import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import URL from "../config/URL";
import ModalAgregar from "./ModalAgregar";
import ModalEliminar from "./ModalEliminar";
import ModalEditar from "./ModalEditar";
import usePagination from "./funcionPaginacion";

import { Default } from "react-spinners-css";
import jsPDF from "jspdf"; //libreria para los pdfs
import "jspdf-autotable"; //libreria para los pdfs

const User = () => {
  const [clientes, setClientes] = useState([]);
  const [dataEliminar, setDataEliminar] = useState([]); //le paso los datos del registro al modal
  const [termino, setTermino] = useState(""); //termino de busqueda
  const initialFormState = {
    id: null,
    nomcliente: "",
    cedularuc: "",
    fechareg: "",
    telefono1: "",
    correoelec: "",
    direccion: "",
    pais: "",
    ciudad: "",
  }; //se inicializan los inputs
  const [clien, setClien] = useState(initialFormState);

  const itemsPerPage = 10;
  const startFrom = 1;
  const {
    slicedData,
    pagination,
    prevPage,
    nextPage,
    changePage,
  } = usePagination({ itemsPerPage, clientes, startFrom });

  const addCliente = (clien) => {
    setClientes([...clientes, clien]);
  };

  //reporte en pdf de la lista de discapacidades
  const reportePdf = () => {
    const doc = new jsPDF();
    let hoy = new Date();
    let fechaActual =
      hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    doc.text("Lista de clientes", 70, 10); //le damos las coordenadas x = 70, y = 10
    doc.text("Fecha: " + `${fechaActual}`, 145, 10);
    doc.autoTable({
      head: [["#", "Nombre", "Pais", "Ciudad", "Cedula"]],
      body: clientes.map((clie, index) => [
        index + 1,
        clie.nomcliente,
        clie.pais,
        clie.ciudad,
        clie.cedularuc,
      ]),
    });
    let fechaActual2 =
      hoy.getFullYear() + "_" + (hoy.getMonth() + 1) + "_" + hoy.getDate();
    doc.output("dataurlnewwindow", "Clientes" + `${fechaActual2}` + ".pdf");
  };

  /*me ayuda a presentar el tipo de usuario autenticado*/
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

  /*me ayuda a listar los clientes*/
  async function listarClientes() {
    try {
      const valor_token = localStorage.getItem("token");
      let response = await fetch(`${URL}/listaCliente`, {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${valor_token.replace(/['"]+/g, "")}`,
        },
      });
      response = await response.json();
      setClientes(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useState(() => {
    listarClientes();
    User();
  }, []);

  //metodo para seleccionar entre editar o eliminar
  const seleccionarOpcion = (cliente, caso) => {
    if (caso === "Editar") {
      setClien({
        id: cliente.id,
        nomcliente: cliente.nomcliente,
        cedularuc: cliente.cedularuc,
        fechareg: cliente.fechareg,
        telefono1: cliente.telefono1,
        direccion: cliente.direccion,
        correoelec: cliente.correoelec,
        pais: cliente.pais,
        ciudad: cliente.ciudad,
      });
      console.log(clien);
    } else {
      setDataEliminar(cliente);
      console.log(cliente);
    }
  };

  function searchingTerm(termino) {
    return function (variable) {
      return (
        variable.nomcliente.toLowerCase().includes(termino.toLowerCase()) ||
        !termino
      );
    };
  }

  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalAgregar"
              >
                Agregar
              </button>
            </div>
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={reportePdf}
                formtarget="_blank"
              >
                PDF
              </button>
            </div>
            <div className="col-2">
              <input
                className="form-control col-auto"
                type="search"
                placeholder="Buscar"
                aria-label="Search"
                onChange={(e) => setTermino(e.target.value)}
              />
            </div>
            <div className="col-3">
              <h3>Hola {tipoUser}</h3>
            </div>
          </div>

          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cliente</th>
                <th scope="col">Pais</th>
                <th scope="col">Ciudad</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length > 0 ? (
                termino.length > 0 ? (
                  clientes
                    .filter(searchingTerm(termino))
                    .map((cliente, index) => (
                      <tr key={index}>
                        <td scope="row">{index + 1}</td>
                        <td>{cliente.nomcliente}</td>
                        <td>{cliente.pais}</td>
                        <td>{cliente.ciudad}</td>
                        <td>{cliente.fechareg}</td>
                        <td>
                          {" "}
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modalEditar"
                            onClick={() => seleccionarOpcion(cliente, "Editar")}
                          >
                            Editar
                          </button>{" "}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modalEliminar"
                            onClick={() =>
                              seleccionarOpcion(cliente, "Eliminar")
                            }
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  slicedData.map((cliente, index) => (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td>{cliente.nomcliente}</td>
                      <td>{cliente.pais}</td>
                      <td>{cliente.ciudad}</td>
                      <td>{cliente.fechareg}</td>
                      <td>
                        {" "}
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#modalEditar"
                          onClick={() => seleccionarOpcion(cliente, "Editar")}
                        >
                          Editar
                        </button>{" "}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#modalEliminar"
                          onClick={() => seleccionarOpcion(cliente, "Eliminar")}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    <Default />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a
                  className="page-link"
                  onClick={prevPage}
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              {pagination.map((page) => {
                if (!page.ellipsis) {
                  return (
                    <li className="page-item">
                      <a
                        className={page.current ? "page-link" : "page-link"}
                        onClick={(e) => changePage(page.id, e)}
                        href="#"
                      >
                        {page.id}
                      </a>
                    </li>
                  );
                }
              })}

              <li className="page-item">
                <a className="page-link" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Layout>
      <ModalAgregar addCliente={addCliente} />
      <ModalEditar
        clien={clien}
        setClientes={setClientes}
        clientes={clientes}
      />
      <ModalEliminar
        dataEliminar={dataEliminar}
        setClientes={setClientes}
        clientes={clientes}
      />
    </>
  );
};

export default User;
