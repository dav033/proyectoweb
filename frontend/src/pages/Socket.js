import io from "socket.io-client";

let socket = io();

socket.on("notificacion", () => {
  console.log("te sineto");
  alert("owoowo")
});

export default socket;
