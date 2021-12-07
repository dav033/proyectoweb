import React, { useContext, useEffect, useState } from "react";
import { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { ListGroup, Button } from "react-bootstrap";
import useAuth from "../../auth/useAuth";

import "./userBox.css";

function UserBox(props) {
  
  return (
    <div className="box">
      <div className="imagen" style={{ display: "inline-block" }}>
        <img src={props.imagen}></img>
      </div>

      <Link
      className = "username"
        style={{
          display: "inline-block",
          marginLeft: "5px",
          fontSize: "30px",
          textDecoration:"none"
        }}
      >
        {props.titulo}
      </Link>
    </div>
  );
}

export default UserBox;
