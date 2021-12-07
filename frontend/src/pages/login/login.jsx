import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import useAuth from "../../auth/useAuth";

import { Link } from "react-router-dom";
import Buttonn from "@material-ui/core/Button";
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

import "./login.css";

const userCredentials = {};

export default function Login() {
  const { login } = useAuth();

  useChange("ingresar");

  return (
    <>
      <Container
        style={{
          width: "400px",
          height: "500px",
          marginTop: "70px",
        }}
        className="a"
      >
        <h1
          id="titulo"
          className="shadow-sm text-success mt-5 p-3 text-center "
        >
          Ingresar
        </h1>

        <Form className="d-grid gap-2 " id="loginForm">
          <Form.Group className="group" controlId="formBasicEmail">
            <Form.Label style={{ color: "white" }}>Usuario</Form.Label>
            <Form.Control type="user" placeholder="Usuario" />
          </Form.Group>

          <Form.Group className="group" controlId="formBasicPassword">
            <Form.Label style={{ color: "white" }}>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          <div className="signup_link">
            No tienes cuenta? <Link>Registrate aqui</Link>
          </div>

          <Button
            variant="success btn-block"
            type="submit"
            style={{
              backgroundColor: "var(--color4)",
              border: "none",
              height: "38px",
            }}
            id="loginB"
            onClick={(e) => login("6187f1bfd2e5a63d203c4bec")}
          >
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}
