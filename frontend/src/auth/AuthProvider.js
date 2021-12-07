import { children, createContext, useState, useEffect } from "react";
import React from "react";
import { Redirect } from "react-router-dom";
import socket from "../pages/Socket";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  //const[user , setUser] = useState(null);
  const [user, setUser] = useState(null);
  const [fromRegister, setFromRegister] = useState(false);
  const [identificador, setIdentificador] = useState();
  const [lista, setLista] = useState();
  const [notificacion, setNotificacion] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  const login = (userCredentials_id, userCredentials_username) => {
    setUser({
      id: userCredentials_id,
      username: userCredentials_username,
    });

    socket.connect();
    socket.emit("conectado", userCredentials_id);
  };

  const register = (userCredentials_id, userCredentials_username) => {
    setUser({
      id: userCredentials_id,
      username: userCredentials_username,
    });

    socket.connect();
    socket.emit("conectado", userCredentials_id);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logout = () => {
    setUser(null);
    document.getElementById("inicio").className = "active";
    socket.disconnect();
  };

  const isLogged = () => !!user;

  useEffect(() => {
    socket.on("lista", (...args) => {
      setLista(args);
    });

    return () => {
      socket.off();
    };
  }, [isLogged, fromRegister, logout, lista]);

  useEffect(() => {
    if (isLogged()) {
      socket.on("identificador", (...args) => {
        setIdentificador(args[0]);
      });
    }
  }, [isLogged]);

  async function getNoti() {
    const res = await axios.get("/api/users/" + user.id);

    const notis = res.data.user.notificaciones;
  }
  useEffect(() => {
    if (isLogged()) {
      socket.on("notificacion", (...args) => {
        alert(args[0].mensaje);

        setNotificaciones([...notificaciones, args[0]]);
      });

      return () => {
        socket.off();
      };
    }
  }, [isLogged, notificacion, notificaciones]);

  socket.on("notificacion", (...args) => {
    console.log("owao");
  });

  const contextValue = {
    user,
    isLogged,
    login,
    logout,
    register,
    fromRegister,
    setFromRegister,
    identificador,
    lista,
    notificaciones,
    setNotificaciones,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
