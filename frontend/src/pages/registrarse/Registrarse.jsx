import React, { useContext, useEffect } from "react";

import axios from "axios";
import { useState, useCallback } from "react";
import staticContext from "../../context/staticContext";
import useAuth from "../../auth/useAuth";
import Context from "../../context/staticContext";
import { Redirect, useHistory, Link } from "react-router-dom";
import "./Registrarse.css";

import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";

import useChange from "../../components/hooks/useChange.jsx";


function Registrarse() {
  const [auxUser, setAuxUser] = useState([]);

  const [auxEmail, setAuxEmail] = useState([]);

  const [auxPassword, setAuxPassword] = useState([]);
  const [auxPassword2, setAuxPassword2] = useState([]);
  const history = useHistory();

  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);
  const { isLogged, login, logout } = useAuth();
  const { fromRegister, setFromRegister } = useAuth();

  const [election, setElection] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  var aux = [];
  var id;
  console.log(alert1, alert2, alert3);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useChange("registrarse")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function onChangeUserName(e) {
    setElection("usuario");
    setAuxUser(e.target.value);
  }

  const onChangePassword = (e) => {
    setAuxPassword(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangePassword2 = (e) => {
    setAuxPassword2(e.target.value);
  };

  const onChangeEmail = (e) => {
    setElection("correo");
    setAuxEmail(e.target.value);
  };

  function alertaU() {
    //if (alert1 === true) {
    return (
      <h4 className="alert" id="alert1">
        Este usuario ya existe
      </h4>
    );
    //}
  }

  function alertaC() {
    //if (alert2 === true) {
    return (
      <h4 className="alert" id="alert2">
        {" "}
        Este correo ya existe
      </h4>
    );
    //}
  }

  function alertaP() {
    //if (alert3 === true && auxPassword != "" && auxPassword2 != "") {
    return (
      <h4 className="alert" id="alert3">
        Las contraseñas no coinciden
      </h4>
    );
    //}
  }

  useEffect(() => {
    if (alert1 === false) {
      document.getElementById("alert1").style.display = "none";
    } else {
      document.getElementById("alert1").style.display = "inline";
    }

    if (alert2 === false) {
      document.getElementById("alert2").style.display = "none";
    } else {
      document.getElementById("alert2").style.display = "inline";
    }

    if (alert3 === false) {
      document.getElementById("alert3").style.display = "none";
    } else {
      document.getElementById("alert3").style.display = "inline";
    }
  }, [alert1, alert2, alert3]);

  useEffect(() => {
    async function getUse() {
      const res = await axios.get("/api/users");

      const aux1 = await res.data;

      let validar = 0;

      if (election === "usuario") {
        aux1.map((item) => aux.push(item.userName));
        for (let i in aux) {
          if (aux[i] === auxUser) {
            validar = validar + 1;
          }
        }

        if (validar !== 0) {
          setAlert1(true);
        } else {
          setAlert1(false);
        }
      }

      if (election === "correo") {
        aux1.map((item) => aux.push(item.email));

        for (let i in aux) {
          if (aux[i] === auxEmail) {
            validar = validar + 1;
          }
        }

        if (validar !== 0) {
          setAlert2(true);
        } else {
          setAlert2(false);
        }
      }
    }
    getUse();
  }, [aux, auxEmail, auxUser, election, onChangeUserName]);

  useEffect(() => {
    console.log(auxPassword);

    if (
      auxPassword !== auxPassword2 &&
      auxPassword !== "" &&
      auxPassword2 !== "" &&
      auxPassword !== undefined &&
      auxPassword2 !== undefined
    ) {
      setAlert3(true);
    } else {
      setAlert3(false);
    }
  }, [auxPassword, auxPassword2, onChangePassword2]);

  useEffect(() => {
    setAlert3(false);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = async (e) => {
    e.preventDefault();

    function delay(n) {
      return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
      });
    }

    async function alertaAnimacion() {
      console.log("owo");
      let primer = document.getElementsByClassName("alert")[0];
      let segundo = document.getElementsByClassName("alert")[1];
      let tercero = document.getElementsByClassName("alert")[2];
      document.getElementById("sub").disabled = true;

      if (alert1 === true && alert2 === false && alert3 === false) {
        primer.className = "animate__animated animate__headShake";
        console.log("1");
        await delay(0.5);
        primer.className = "alert";
      }

      if (alert1 === true && alert2 === true && alert3 === false) {
        console.log("1");
        primer.className = "animate__animated animate__headShake";
        segundo.className = "animate__animated animate__headShake";
        await delay(0.5);
        primer.className = "alert";
        segundo.className = "alert";
      }

      if (alert1 === true && alert2 === true && alert3 === true) {
        console.log("1");
        primer.className = "animate__animated animate__headShake";
        segundo.className = "animate__animated animate__headShake";
        tercero.className = "animate__animated animate__headShake";
        await delay(0.5);
        primer.className = "alert";
        segundo.className = "alert";
        tercero.className = "alert";
      }

      if (alert1 === false && alert2 === true && alert3 === false) {
        console.log("1");
        segundo.className = "animate__animated animate__headShake";
        await delay(0.5);
        segundo.className = "alert";
      }

      if (alert1 === false && alert2 === true && alert3 === true) {
        console.log("1");
        segundo.className = "animate__animated animate__headShake";
        tercero.className = "animate__animated animate__headShake";
        await delay(0.5);
        segundo.className = "alert";
        tercero.className = "alert";
      }

      // eslint-disable-next-line eqeqeq
      if (alert1 === false && alert2 === false && alert3 === true) {
        console.log("1");
        tercero.className = "animate__animated animate__headShake";
        await delay(0.5);
        tercero.className = "alert";
      }

      document.getElementById("sub").disabled = false;
    }

    if (alert1 === true || alert2 === true || alert3 === true) {
      alertaAnimacion();
    }

    if (alert1 === false && alert2 === false && alert3 === false) {
      await axios.post("api/users", {
        userName: auxUser,
        preferences: [],
        email: auxEmail,
        password: auxPassword,
      });

      async function getId() {
        const res = await axios.get("/api/users");

        const aux4 = await res.data;

        await aux4.map((item) => (id = item._id));
      }

      await getId();
      await console.log(id);

      login(id, auxUser);

      setFromRegister(true);
      history.push("/preferencias");
    }
  };

  return (
    <>
      <Container
        className="a "
        style={{
          width: "450px",
          height: "620px",
          marginTop: "0px",
          borderColor: "black",
        }}
      >
        <h1
          id="titulo"
          className="shadow-sm text-success mt-5 p-3 text-center "
        >
          Registro
        </h1>

        <Form
          className="d-grid gap-2"
          id="registerForm"
          onSubmit={(e) => onSubmit(e)}
        >
          <Form.Group className="group" controlId="formBasicUser">
            <Form.Label style={{ color: "white" }}>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Usuario"
              onChange={(e) => onChangeUserName(e)}
            />
            {alertaU(election)}
          </Form.Group>

          <Form.Group className="group" controlId="formBasicEmail">
            <Form.Label style={{ color: "white" }}>Correo</Form.Label>
            <Form.Control
              type=""
              placeholder="Correo"
              onChange={(e) => onChangeEmail(e)}
            />
            {alertaC(election)}
          </Form.Group>

          <Form.Group className="group" controlId="formBasicPassword">
            <Form.Label style={{ color: "white" }}>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              onChange={(e) => onChangePassword(e)}
            />
          </Form.Group>

          <Form.Group className="group" controlId="formBasicPassword">
            <Form.Label style={{ color: "white" }}>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              onChange={(e) => onChangePassword2(e)}
            />
            {alertaP()}
          </Form.Group>

          <div className="signup_link">
            Ya tienes cuenta? <Link>Ingresa aqui</Link>
          </div>

          <Button
            variant="success btn-block"
            type="submit"
            style={{
              backgroundColor: "var(--color4)",
              border: "none",
              height: "38px",
            }}
            id="sub"
          >
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Registrarse;
