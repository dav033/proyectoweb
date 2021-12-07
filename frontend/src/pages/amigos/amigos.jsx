import React from "react";
import socket from "../Socket";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../auth/useAuth";
import useChange from "../../components/hooks/useChange.jsx";


function Amigos() {
  const { user, setUser } = useAuth();
  const [amigos, setAmigos] = useState([]);

  useChange("amigos")
  useEffect(() => {
    async function getInfo() {
      const res = await axios.get("/api/users/" + user.id);
      const res2 = await axios.get("/api/users");

      const users = res2.data;
      let amis = res.data.user.amigos;
      let aux = [];

      for (let i in amis) {
        for (let j in users) {
          if (amis[i] === users[j]._id) {
            aux.push(users[j]);
          }
        }
      }

      setAmigos(aux);
      console.log(aux);
    }

    getInfo();
  }, []);
  return (
    <div>
      {amigos.map((item) => (
        <div>
          {" "}
          <h1 style={{ color: "white" }}>{item.userName}</h1>
        </div>
      ))}
    </div>
  );
}

export default Amigos;
