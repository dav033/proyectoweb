import React, { useContext, useEffect } from "react";

import staticContext from "../../context/staticContext";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
  NavLinkProps,
} from "react-router-dom";
import routes from "../../helpers/routes";
import useAuth from "../../auth/useAuth";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Toast,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "./Navigation.css";
import { useState } from "react";
import socket from "../Socket";
import { io } from "socket.io-client";
import ReactDOM from "react-dom";

var actual = [];
function Navigation(props) {
  const { eleccion, setEleccion } = useContext(staticContext);

  const { fromRegister } = useAuth();
  const { identificador } = useAuth();
  const { lista } = useAuth();
  const { user, setUser } = useAuth();
  const { isLogged, login, logout } = useAuth();
  const [showA, setShowA] = useState(true);

  const { notificaciones, setNotificaciones } = useAuth();
  const [notificaciones2, setNotificaciones2] = useState([]);
  const [showB, setShowB] = useState(true);

  const [respuesta, setRespuesta] = useState([]);

  const noLogLeft = [
    {
      id: "inicio",
      valor: "Inicio",
      icono: "icon-inicio",
      link: routes.inicio,
      posicion: "left",
    },
  ];

  const noLogRight = [
    {
      id: "registrarse",
      valor: "Registrarse",
      icono: "icon-registrarse",
      link: routes.registro,
      posicion: "right",
    },
    {
      id: "ingresar",
      valor: "Ingresar",
      icono: "icon-ingresar",
      link: routes.ingresar,
      posicion: "right",
    },
  ];

  const logLeft = [
    {
      id: "inicio",
      valor: "Inicio",
      icono: "icon-inicio",
      link: routes.inicio,
      posicion: "left",
    },
    {
      id: "editar",
      valor: "Editar",
      icono: "icon-editar",
      link: routes.editar,
      posicion: "left",
    },
    {
      id: "buscar",
      valor: "Buscar",
      icono: "icon-buscar",
      link: routes.buscar,
      posicion: "left",
    },
    {
      id: "descubrir",
      valor: "Descubrir",
      icono: "icon-descubrir",
      link: routes.descubrir,
      posicion: "left",
    },
  ];

  const logRight = [
    {
      id: "ajustes",
      valor: "Ajustes",
      icono: "icon-ajustes",
      link: routes.ajustes,
      posicion: "right",
    },
  ];

  function drop() {
    if (isLogged()) {
      return (
        <div className="cuenta">
          <NavDropdown
            title="Cuenta"
            id="collasible-nav-dropdown"
            className="awa"
          >
            <NavDropdown.Item as={NavLink} to="/cuenta" id="perfil">
              <i className="icon-cuenta"></i> Perfil
            </NavDropdown.Item>

            <NavDropdown.Item as={NavLink} to={routes.amigos} id="amigos">
              <i className="icon-amigos"></i> Amigos
            </NavDropdown.Item>

            <NavDropdown.Item as={NavLink} to={"/solicitudes"} id="solicitudes">
              <i className="icon-solicitudes"></i> Solicitudes
            </NavDropdown.Item>

            <NavDropdown.Item
              as="button"
              id="salir"
              onClick={(e) => logout()}
              style={{ color: "white" }}
            >
              <i className="icon-salir"></i> Salir
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      );
    }
  }

  function Toa() {
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "absolute",
        zIndex: 1,
        top: "30px",
        right: "20px",
      }}
    >
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </div>;
  }
  // const [identificador, setIdentificador] = useState();
  // const [lista, setLista] = useState();

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  useEffect(() => {
    socket.on("notificacion", (solicitud) => {
      console.log("2swdaaasdsd");
      setRespuesta([...respuesta, solicitud]);
    });

    return () => {
      socket.off();
    };
  }, [respuesta]);

  useEffect(() => {
    console.log(identificador);
    console.log(lista);
  }, [isLogged, identificador, lista, fromRegister]);

  useEffect(() => {
    console.log(notificaciones);
  }, [notificaciones]);

  function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);

    if (i !== -1) {
      arr.splice(i, 1);
    }
  }
  async function eliminarNotificacion(e, data) {
    console.log(data);
    let aux = notificaciones2;

    removeItemFromArr(aux, data);

    await axios.put(`/api/users/` + user.id, {
      notificaciones: aux,
    });

    getNotificaciones();
  }

  useEffect(() => {
    if (isLogged()) {
       getNotificaciones();
    }
    console.log("#A")
  }, [user]);

  function notificacionesActivas() {
    if (notificaciones2.length > 0) {
      return notificaciones2.map((item) => (
        <NavDropdown.Item
          to="/cuenta"
          id="perfil"
          style={{ display: "flex", padding: "5px" }}
        >
          <Link
            id="hola"
            to="/solicitudes"
            onClick={(e) => eliminarNotificacion(e, item)}
          >
            {" "}
            {item.mensaje}
          </Link>{" "}
          <button
            className="quitarNoti"
            onClick={(e) => eliminarNotificacion(e, item)}
          >
            <i className="icon-rechazar"></i>
          </button>
        </NavDropdown.Item>
      ));
    } else {
      return (
        <p style={{ color: "white" }}>
          No hay notificaciones , jaja nadie te quiere
        </p>
      );
    }
  }
  var showMe = function () {
    return notificacionesActivas();
  };

  function Example() {
    if (isLogged()) {
      return (
        <div className="noti">
          <NavDropdown
            title={<i className="icon-notificacion"></i>}
            id="collasible-nav-dropdown"
            className="quitar"
          >
            {showMe()}
          </NavDropdown>
        </div>
      );
    }
  }

  var actualLeft = [];

  var actualRight = [];

  if (isLogged()) {
    actualLeft = logLeft.slice();
    actualRight = logRight.slice();
  } else {
    actualLeft = noLogLeft.slice();
    actualRight = noLogRight.slice();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getNotificaciones() {
    const respuesta = await axios.get("/api/users/" + user.id);
    setNotificaciones2(respuesta.data.user.notificaciones);
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        {actualLeft.map((item) => (
          <div key={item.id} className={item.posicion}>
            <Nav.Link as={NavLink} to={item.link} key={item.id} id={item.id}>
              <i key={item.icono} className={item.icono}></i> {item.valor}
            </Nav.Link>
          </div>
        ))}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {Example()}
            {actualRight.map((item) => (
              <div key={item.id} className={item.posicion}>
                <Nav.Link
                  as={NavLink}
                  to={item.link}
                  key={item.id}
                  id={item.id}
                >
                  <i key={item.icono} className={item.icono}></i> {item.valor}
                </Nav.Link>
              </div>
            ))}

            {drop()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Navigation;
