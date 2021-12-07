const { Router } = require("express");
const {
  getItem,
  updateItem,
  deleteItem,
  getItems,
  createItem,
} = require("../controllers/items.controllers");

const router = Router();

router.route("/").get(getItems).post(createItem);

router
  .route("/:id")

  .get(getItem)
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;
