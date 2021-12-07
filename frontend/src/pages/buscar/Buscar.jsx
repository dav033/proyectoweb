import React, { useContext, useEffect, useState } from "react";
import { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { ListGroup, Button } from "react-bootstrap";
import useAuth from "../../auth/useAuth";

import "./Buscar.css";
import socket from "../Socket";
import { isValidObjectId } from "mongoose";
import Lista from "../../components/lista/lista.jsx";
import useChange from "../../components/hooks/useChange.jsx";
import FetchUsers from "../../components/hooks/useFetchUsers";
import GenericButton from "../../components/genericButton/genericButton.jsx";

function Buscar(props) {
  const { user, setUser } = useAuth();
  const [users, setUsers] = useState([]);

  const [solicitudes, setSolicitudes] = useState([]);
  const { lista } = useAuth();
  const [amigos, setAmigos] = useState([]);

  useChange("buscar");

  let a = FetchUsers();
  console.log(a);

  useEffect(() => {
    FetchUsers(user.id).then((users) => {
      setUsers(users);
    });

    const getFriends = async () => {
      const response = await axios.get("/api/users/" + user.id);
      setAmigos(response.data.user.amigos);
    };

    getFriends();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("n")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  async function get() {
    const res = await axios.get("/api/solicitud");

    await setSolicitudes(res.data);
  }

  async function enviarSolicitud(id) {
    console.log(id);
    const objetivo = document.getElementById(id);
    objetivo.disabled = true;
    objetivo.classList.add("button--loading");

    const hola = await axios.post("/api/solicitud", {
      emisor: user.id,
      receptor: id,
      estado: "enviado",
      mensaje: "owo",
    });

    const id_soli = hola.data;

    let res = await axios.get("/api/users/" + id);

    let res2 = await axios.get("/api/users/" + user.id);

    var data = [];
    var data2 = [];
    var data3 = [];

    data = res.data.user.solicitudesRecibidas;
    data2 = res2.data.user.solicitudesEnviadas;
    data3 = res.data.user.notificaciones;
    let userName = res2.data.user.userName;

    data3.push({
      tipo: "solicitud",
      emisor: user.id,
      receptor: id,
      id_soli: id_soli,
      mensaje: userName + " te ha enviado una solicitud de amistad",
    });

    data.push(id_soli);

    data2.push(id_soli);

    await axios.put("/api/users/" + user.id, {
      solicitudesEnviadas: data2,
    });

    await axios.put("/api/users/" + id, {
      solicitudesRecibidas: data,
      notificaciones: data3,
    });

    let usuario = res.data.user.userName;
    let idUser = user.id;
    let idSolicitud = hola.data;
    let usuarioEmisor = res2.data.user.userName;

    for (let i = 0; i < lista[0].length; i++) {
      if (lista[0][i].user_id === id) {
        let socketId = lista[0][i].socket_id;

        socket.emit("solicitud", {
          usuario,
          usuarioEmisor,
          idUser,
          socketId,
          idSolicitud,
        });
      } else {
        console.log("owo triste");
      }
    }

    //console.log(id);
    get();
    objetivo.disabled = false;
    objetivo.classList.remove("button--loading");
  }

  async function eliminarSolicitud(id) {
    console.log(id);
    const objetivo = document.getElementById(id);
    objetivo.disabled = true;
    objetivo.classList.add("button--loading");

    let aux = solicitudes;

    let aux1 = [];
    let id_soli;

    aux.map((item) => aux1.push(item.emisor));
    for (let i in aux) {
      if (aux[i].emisor === user.id && aux[i].receptor === id) {
        id_soli = aux[i]._id;
      }
    }
    //alert(id_soli);

    let res = await axios.get("/api/users/" + id);

    let res2 = await axios.get("/api/users/" + user.id);

    let data = await res.data.user.solicitudesRecibidas;
    let data2 = await res2.data.user.solicitudesEnviadas;

    function removeItemFromArr(arr, item) {
      var i = arr.indexOf(item);

      if (i !== -1) {
        arr.splice(i, 1);
      }
    }

    removeItemFromArr(data, id_soli);

    removeItemFromArr(data2, id_soli);

    await axios.put("/api/users/" + id, {
      solicitudesRecibidas: data,
    });

    await axios.put("/api/users/" + user.id, {
      solicitudesEnviadas: data2,
    });

    await axios.delete("/api/solicitud/" + id_soli);

    get();
    objetivo.disabled = false;
    objetivo.classList.remove("button--loading");
  }

  useEffect(() => {
    async function get() {
      const res = await axios.get("/api/solicitud");

      await setSolicitudes(res.data);
    }

    get();
  }, []);

  function renderButton(id) {
    var a = 0;

    let aux = solicitudes;

    let aux1 = [];

    aux.map((item) => aux1.push(item.emisor));
    for (let i in aux) {
      if (aux[i].emisor === user.id && aux[i].receptor === id) {
        a = 1;
      }

      if (aux[i].estado === "rechazada") {
        a = 0;
      }
    }

    for (let i in amigos) {
      if (amigos[i] === id) {
        a = 2;
      }
    }

    if (a == 1) {
      return (
        <GenericButton
          onClick={eliminarSolicitud}
          variant="danger"
          className="genericButton soliButtons"
          id={id}
          valor={id}
        >
          <span className="button__text">
            <i
              id="solicitud"
              className="icon-eliminar"
              style={{ fontSize: "30px" }}
            ></i>
          </span>
        </GenericButton>
      );
    }

    if (a == 0) {
      return (
        <GenericButton
          onClick={enviarSolicitud}
          variant="success"
          className="genericButton soliButtons"
          id={id}
          valor={id}
        >
          <span className="button__text">
            <i
              id="solicitud"
              className="icon-solicitud"
              style={{ fontSize: "30px" }}
            ></i>
          </span>
        </GenericButton>
      );
    }

    if (a == 2) {
      return <h1>amigos</h1>;
    }
  }

  return (
    <div
      style={{
        backgroundColor: "",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        id="myInput"
        onKeyUp={(e) => myFunction()}
        placeholder="Search for names..."
        style={{
          backgroundColor: "",
          display: "inline-block",

          height: "60px",
        }}
      ></input>

      <Lista contenido={users} tipo="listUser" derecha={renderButton}></Lista>
    </div>
  );
}

export default Buscar;
