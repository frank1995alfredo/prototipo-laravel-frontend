import React, { useState } from "react";
import axios from "axios";
import URL from "../config/URL";
import valor_token from "../config/valor_token"

const ModalAgregar = ({ addCliente }) => {
  const initialFormState = {
    nomcliente: "",
    cedularuc: "",
    direccion: "",
    pais: "",
    ciudad: "",
    correoelec: "",
    telefono1: "",
  }; //se inicializan los inputs
  const [clien, setClien] = useState(initialFormState)

  //esta funcion es importante para poder escribir en los input
  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget
    setClien({ ...clien, [name]: value })
    console.log(clien);
  };

  const agregarCliente = async (event) => {
    event.preventDefault()
    const valor_token = localStorage.getItem("token")
    try {
      await axios
        .post(`${URL}/agregarCliente`, clien, {
          headers: {
            "content-type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${valor_token.replace(/['"]+/g, '')}`,
          },
        })
        .then((response) => {
          addCliente(response.data.data)
          console.log(response.data)
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="modalAgregar"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar Categoria
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={agregarCliente}>
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
                    value={clien.nomcliente}
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
                    value={clien.cedularuc}
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
                    value={clien.direccion}
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
                    value={clien.correoelec}
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
                    value={clien.telefono1}
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
                    value={clien.ciudad}
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
                    value={clien.pais}
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

export default ModalAgregar;
