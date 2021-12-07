const soliCtrl = {};

const Solicitud = require("../models/solicitud.js");

soliCtrl.getSolicitudes = async (req, res) => {
  const solicitudes = await Solicitud.find();
  res.json(solicitudes);
};

soliCtrl.createSolicitud = async (req, res) => {
  const { emisor, receptor, estado, mensaje } = req.body;
  const newSolicitud = new Solicitud({
    emisor: emisor,
    receptor: receptor,
    estado: estado,
    mensaje: mensaje,
  });
  await newSolicitud.save(function (err, room) {
    res.json(room.id);
  });
};

soliCtrl.getSolicitud = async (req, res) => {
  const solicitud = await Solicitud.findById(req.params.id);
  res.json({ solicitud });
  console.log(solicitud);
};

soliCtrl.updateSolicitud = async (req, res) => {
  try {
    const { emisor, receptor, estado, mensaje } = req.body;
    await Solicitud.findByIdAndUpdate(req.params.id, {
      emisor: emisor,
      receptor: receptor,
      estado: estado,
      mensaje: mensaje,
    });
    res.json({ message: "usuario actuzlizado" });
  } catch (error) {
    console.log("error");
  }
};

soliCtrl.deleteSolicitud = async (req, res) => {
  await Solicitud.findByIdAndDelete(req.params.id);
  res.json({ message: "usuario eliminado" });
};

module.exports = soliCtrl;
