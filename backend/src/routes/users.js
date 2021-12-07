const { Router } = require("express");

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getImage,
  UploadImage,
} = require("../controllers/users.controller");
const router = Router();

router.route("/").get(getUsers).post(createUser);

router
  .route("/:id")

  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.route("/:id/image").get(getImage).put(UploadImage);

module.exports = router;
