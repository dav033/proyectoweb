
const http =require ("http")
const {Server} = require("socket.io")


const path = require("path");

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer)

// settings
io.on("connection" , () =>{

  console.log("nueva coneccion")
})
app.set("port", process.env.PORT || 4000);

// midlewares
app.use(
  fileUpload({
    tempFileDir: "/temp",
  })
);
app.use(cors());
app.use(express.json());

// routes

app.use("/api/users", require("./routes/users"));
app.use("/api/items", require("./routes/items"));
app.use("/api/solicitud", require("./routes/solicitudes"));

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
