const mongoose = require("mongoose");

// const url = process.env.MONGODB_URL
//   ? process.env.MONGODB_URL
//   : "mongodb://localhost/27017/hola";
const url =
  "mongodb+srv://david:clavesegura03@cluster0.a6p1v.mongodb.net/hola?retryWrites=true&w=majority";
//const url = "mongodb://localhost/hola";

mongoose.connect(url, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB is connected");
});
