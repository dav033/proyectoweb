const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    description: String,
    type: Array,
    author: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Item", userSchema);
