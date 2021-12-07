import React from "react";

import { useEffect } from "react";
import useChange from "../../components/hooks/useChange.jsx";

function Ajustes() {
  useChange("ajustes");
  return (
    <div>
      <h1>Esta es la pestaña de ajustes</h1>
    </div>
  );
}

export default Ajustes;
