const usersCtrl = {};

const User = require("../models/user.js");
const AWS = require("aws-sdk");

const spacesEndpoint = new AWS.Endpoint("sfo3.digitaloceanspaces.com");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
});
usersCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

usersCtrl.createUser = async (req, res) => {
  const {
    userName,
    amigos,
    preferences,
    password,
    email,
    profileImage,
    solicitudesEnviadas,
    solicitudesRecibidas,
    notificaciones,
  } = req.body;
  const newUser = new User({
    userName: userName,
    email: email,
    amigos: amigos,
    preferences: preferences,
    password: password,
    profileImage: "https://ani.sfo3.digitaloceanspaces.com/comics.jpg",
    solicitudesEnviadas: solicitudesEnviadas,
    solicitudesRecibidas: solicitudesRecibidas,
    notificaciones: notificaciones,
  });
  await newUser.save();
  res.json({ message: "usuario guardado" });
};

usersCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ user });
  console.log(user);
};

usersCtrl.updateUser = async (req, res) => {
  try {
    const {
      userName,
      amigos,
      preferences,
      password,
      email,
      profileImage,
      solicitudesEnviadas,
      solicitudesRecibidas,
      notificaciones,
    } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
      userName: userName,
      email: email,
      amigos: amigos,
      preferences: preferences,
      password: password,
      profileImage: profileImage,
      solicitudesEnviadas: solicitudesEnviadas,
      solicitudesRecibidas: solicitudesRecibidas,
      notificaciones: notificaciones,
    });
    res.json({ message: "usuario actuzlizado" });
  } catch (error) {
    console.log("error");
  }
};

usersCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "usuario eliminado" });
};

usersCtrl.getImage = async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(req.files);
};

usersCtrl.UploadImage = async (req, res) => {
  const { image } = req.files;
  console.log("esta es la informacion de la imagen", image);
  const {
    userName: userName,
    email: email,
    amigos: amigos,
    preferences: preferences,
    password: password,
    profileImage: profileImage,
    solicitudesEnviadas: solicitudesEnviadas,
    solicitudesRecibidas: solicitudesRecibidas,
    notificaciones: notificaciones,
  } = req.body;

  try {
    const upload = await s3
      .putObject({
        ACL: "public-read",
        Bucket: "ani",
        Body: image.data,
        Key: image.name,
      })
      .promise();

    const urlImage = `https://ani.sfo3.digitaloceanspaces.com/${image.name}`;

    await User.findByIdAndUpdate(req.params.id, {
      userName: userName,
      email: email,
      amigos: amigos,
      preferences: preferences,
      password: password,
      profileImage: urlImage,
      notificaciones: notificaciones,
    });
    res.send({ message: "owo" });
  } catch (error) {
    console.log(error);
    res.send(error);
    console.log("oeownn");
  }
};

module.exports = usersCtrl;
