import React from "react";
import { useEffect } from "react";
import useChange from "../../components/hooks/useChange.jsx";


function Editar() {
  useChange("editar")
  return (
    <div>
      <h1>Esta es la pesataña editar</h1>
    </div>
  );
}

export default Editar;
