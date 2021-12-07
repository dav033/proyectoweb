const itemsCtrl = {};

const Item = require("../models/item");

itemsCtrl.getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

itemsCtrl.createItem = async (req, res) => {
  const { name, image, description, type, author } = req.body;
  const newItem = new Item({
    name: name,
    image: image,
    description: description,
    type: type,
    author: author,
  });

  console.log(newItem);
  await newItem.save();
  res.json({ message: "iitem creado" });
};

itemsCtrl.getItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json({ message: "asasaas" });
  console.log(item);
};

itemsCtrl.updateItem = async (req, res) => {
  const { name, image, description, type, author } = req.body;
  await Item.findByIdAndUpdate(req.params.id, {
    name: name,
    image: image,
    description: description,
    type: type,
    author: author,
  });
  res.json({ message: "item actualizado" });
};

itemsCtrl.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "item eliminado" });
};

module.exports = itemsCtrl;
