import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";

function useAuth(props) {
  return useContext(AuthContext);
}

export default useAuth;
