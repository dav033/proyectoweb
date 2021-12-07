import React from "react";
import socket from "../Socket";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../auth/useAuth";
import { ListGroup, Button } from "react-bootstrap";
import UserBox from "../../components/userBox/userBox";
import "./solicitudes.css";
import useChange from "../../components/hooks/useChange.jsx";

function Solicitudes() {
  const { user, setUser } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [usersSoli, setUsersSoli] = useState([]);
  const { lista } = useAuth();
  var aux = [];
  var aux2 = [];

  useChange("solicitudes");
  async function getInfo() {
    const res = await axios.get("/api/users/" + user.id);
    const usersId = await axios.get("/api/users");
    const allSolis = await axios.get("api/solicitud");
    let solis = res.data.user.solicitudesRecibidas;

    setUsersData(usersId.data);

    for (let i in solis) {
      for (let j in allSolis.data) {
        if (
          solis[i] === allSolis.data[j]._id &&
          allSolis.data[j].estado != "rechazada" &&
          allSolis.data[j].estado != "aceptada"
        ) {
          let use = allSolis.data[j];

          let object = {
            usuario: use.emisor,
            solicitud: solis[i],
          };

          aux.push(object);
        }
      }
    }
    setUsers(aux);
    setSolicitudes(solis);
  }

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    for (let i in users) {
      for (let j in usersData) {
        if (users[i].usuario == usersData[j]._id) {
          let object = {
            usuarioData: usersData[j],
            solicitud: users[i].solicitud,
          };
          aux2.push(object);
        }
      }
    }

    setUsersSoli(aux2);
  }, [users]);

  useEffect(() => {}, [usersSoli]);

  async function aceptar(e, idSolicitud, emisorId) {
    let aux = [];
    let aux2 = [];

    // await axios.put("/api/solicitud/" + idSolicitud, {
    //   estado: "aceptada",
    // });

    let res = await axios.get("/api/users/" + user.id);

    let res2 = await axios.get("/api/users/" + emisorId);

    aux = res.data.user.amigos;
    aux2 = res2.data.user.amigos;

    aux.push(emisorId);

    aux2.push(user.id);

    await axios.put("/api/users/" + user.id, {
      amigos: aux,
    });

    await axios.put("/api/users/" + emisorId, {
      amigos: aux2,
    });

    for (let i = 0; i < lista[0].length; i++) {
      if (lista[0][i].user_id === emisorId) {
        let socketId = lista[0][i].socket_id;

        socket.emit("aceptarSolicitud", {
          idSolicitud: idSolicitud,
          receptor: emisorId,
          emisor: user.id,
          socketId: socketId,
        });

        console.log("owow");
      }
    }

    await axios.put("/api/solicitud/" + idSolicitud, {
      estado: "aceptada",
    });

    getInfo();
  }

  async function rechazar(e, idSolicitud) {
    await axios.put("/api/solicitud/" + idSolicitud, {
      estado: "rechazada",
    });

    getInfo();
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", backgroundColor: "" }}
    >
      <ListGroup
        id="myUL"
        style={{
          width: "1000px",
          display: "flex",
          marginTop: "",
          backgroundColor: "",
        }}
      >
        {usersSoli.map((item) => (
          <li>
            <ListGroup.Item
              style={{
                maxWidth: "",
                backgroundColor: "var(--color3)",
                height: "100px",
              }}
            >
              <UserBox
                titulo={item.usuarioData.userName}
                imagen={item.usuarioData.profileImage}
              />
              <div className="optionBox" style={{ marginLeft: "auto" }}>
                <Button
                  variant="success"
                  style={{ marginRight: "5px" }}
                  onClick={(e) =>
                    aceptar(e, item.solicitud, item.usuarioData._id)
                  }
                  className="ac"
                >
                  Aceptar
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => rechazar(e, item.solicitud)}
                  className="ac"
                >
                  Rechazar
                </Button>
              </div>
            </ListGroup.Item>

            {/* <h1 style={{ color: "white" }}>{item}</h1> */}
          </li>
        ))}
      </ListGroup>
    </div>
  );
}

export default Solicitudes;
