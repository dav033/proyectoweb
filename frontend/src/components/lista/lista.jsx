import React, { useContext, useEffect, useState, useRef } from "react";
import { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { ListGroup, Button } from "react-bootstrap";
import useAuth from "../../auth/useAuth";
import UserBox from "../../components/userBox/userBox.jsx";

import "./lista.css";

function Lista(props) {
  const { contenido, derecha, tipo } = props;

  const titulo = props.contenido;

  console.log(titulo);

  function owo(id) {
    props.derecha(id);
  }

  return (
    <ListGroup
      id="myUL"
      style={{
        width: "1000px",
        display: "flex",
        marginTop: "10px",
        backgroundColor: "",
      }}
    >
      {contenido.map((item) => (
        <li>
          <ListGroup.Item
            style={{
              maxWidth: "",
              backgroundColor: "var(--color3)",
              height: "100px",
            }}
          >
            <n>
              <UserBox
                imagen={item.profileImage}
                titulo={item.userName}
              ></UserBox>
            </n>

            {derecha(item._id)}
          </ListGroup.Item>
        </li>
      ))}
    </ListGroup>
  );
}

export default Lista;
