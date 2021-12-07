import { useEffect } from "react";
import useChange from "../../components/hooks/useChange.jsx";
import React from "react";

function Inicio(props) {
  useChange("inicio");

  return (
    <div>
      <h1>Esta es la pestaña de inicio</h1>
    </div>
  );
}

export default Inicio;
