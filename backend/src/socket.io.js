const http = require("http");
const app = express();
const { Server } = require("socket.io");
const httpServer = http.createServer(app);
const io = new Server(httpServer);
var ConnectCounter = 0;
var ListaUsuarios = [];

io.on("connection", (socket) => {
  socket.on("conectado", (...args) => {
    console.log("usuario conectado", socket.id);

    io.to(socket.id).emit("identificador", socket.id);
    ConnectCounter++;
    console.log(ConnectCounter);
    ListaUsuarios.push({ user_id: args[0], socket_id: socket.id });
    console.log(ListaUsuarios);

    io.emit("lista", ListaUsuarios);
  });

  socket.on("solicitud", (...args) => {
    // console.log(args);
    // console.log(args[0].socketId);
    let objetivo = args[0].socketId;
    let usuario = args[0].usuario;
    let idUser = args[0].idUser;
    let idSolicitud = args[0].idSolicitud;

    console.log("objetivo", objetivo);
    io.to(objetivo).emit("notificacion", {
      tipo: "solicitud",
      objetivo: args[0].socketId,
      usuario: args[0].usuario,
      idUser: args[0].idUser,
      idSolicitud: args[0].idSolicitud,
      mensaje:
        "El usuario " +
        args[0].usuarioEmisor +
        " te ha enviado una solicitud de amistad",
    });
  });

  socket.on("disconnect", (...args) => {
    io.emit("respuesta", {
      httpServer: "servidor",
      mensaje: "Ha abandonado la sala",
    });

    console.log("deconeccion", socket.id);

    for (let i = 0; i < ListaUsuarios.length; i++) {
      if (ListaUsuarios[i].socket_id == socket.id) {
        ListaUsuarios.splice(i, 1);
      }
    }
    ConnectCounter--;
    console.log(ConnectCounter);
    console.log(ListaUsuarios);
    io.emit("lista", ListaUsuarios);
  });

  socket.on("mensaje", (...args) => {});

  socket.on("aceptarSolicitud", (...args) => {
    io.to(args[0].socketId).emit("notificacion", {
      emisor: args[0].emisor,
      receptor: args[0].receptor,
      idSolicitud: args[0].idSolicitud,
      mensaje: "Solicitud aceptada",
    });
  });
});

export default io;
