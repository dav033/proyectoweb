import { useEffect, useState } from "react";

function useChange(id) {
  useEffect(() => {
    if (!!document.getElementsByClassName("active")[0]) {
      document.getElementsByClassName("active")[0].classList.remove("active");
    }

    if (!!document.getElementsByClassName("active")[1]) {
      document.getElementsByClassName("active")[1].classList.remove("active");
    }

    document.getElementById(id).classList.add("active");
  }, []);
}

export default useChange;
