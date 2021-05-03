import React, { useState, useEffect } from "react";
import URL from "../config/URL";
import axios from "axios";
import valor_token from "../config/valor_token";

const ModalEditar = ({ clien, setClientes, clientes }) => {
  const [cliente, setCliente] = useState(clien);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCliente({ ...cliente, [name]: value });
    console.log(cliente);
  };

  //este useEffect me permite tomar los datos para actualizar
  useEffect(() => {
    setCliente(clien);
  }, [clien]);

  const actualizar = async (id, data) => {
    const valor_token = localStorage.getItem("token")
    await axios
      .put(`${URL}/actualizarCliente/` + id, data, {
        headers: {
          "content-type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${valor_token.replace(/['"]+/g, "")}`,
        },
      })
      .then((response) => {});
    setClientes(
      clientes.map((cliente) => (cliente.id === id ? data : cliente))
    );
  };

  const peticionActualizar = (event) => {
    event.preventDefault();
    actualizar(cliente.id, cliente);
  };

  return (
    <div
      className="modal fade"
      id="modalEditar"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Cliente
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={peticionActualizar}>
            <div className="modal-body">
              <div className="mb-3 row">
                <label for="descripcion" className="col-sm-2 col-form-label">
                  Cliente
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="nomcliente"
                    value={cliente.nomcliente}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="cedula" className="col-sm-2 col-form-label">
                  Cedula
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="cedularuc"
                    value={cliente.cedularuc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="direccion" className="col-sm-2 col-form-label">
                  Direccion
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="direccion"
                    value={cliente.direccion}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="correoelec" className="col-sm-2 col-form-label">
                  Correo
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="correoelec"
                    value={cliente.correoelec}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="telefono1" className="col-sm-2 col-form-label">
                  Telefono
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="telefono1"
                    value={cliente.telefono1}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
              <label for="pais" className="col-sm-2 col-form-label">
                Pais
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="pais"
                  value={cliente.pais}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label for="ciudad" className="col-sm-2 col-form-label">
                Ciudad
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="ciudad"
                  value={cliente.ciudad}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            </div>
          
            <div className="modal-footer">
              <button type="submit" className="btn btn-success btn-sm">
                Guardar
              </button>

              <button
                type="button"
                className="btn btn-danger btn-sm"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEditar;
