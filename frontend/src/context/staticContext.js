import React, { useState, useEffect } from "react";
import AuthProvider from "../auth/AuthProvider";
import useAuth from "../auth/useAuth";
import socket from "../pages/Socket";
const Context = React.createContext({});

export function StaticContextProvider({ children }) {
  const [lista, setLista] = useState([]);
  const { fromRegister } = useAuth();
  const { user, setUser } = useAuth();
  const { isLogged, login, logout } = useAuth();
  const [identificador, setIdentificador] = useState();

  

  return (
    <Context.Provider
      value={{
        lista,
        setLista,
        identificador,
        setIdentificador
      }}
    >
      {children}
    </Context.Provider>
  );
}
export default Context;
