const { Router } = require("express");

const {
  getSolicitudes,
  createSolicitud,
  getSolicitud,
  updateSolicitud,
  deleteSolicitud,
} = require("../controllers/solicitud.controllers");

const router = Router();

router.route("/").get(getSolicitudes).post(createSolicitud);

router
  .route("/:id")

  .get(getSolicitud)
  .put(updateSolicitud)
  .delete(deleteSolicitud);

module.exports = router;
