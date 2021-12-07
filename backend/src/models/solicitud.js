const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    emisor: {
      type: String,
      required: true,
      trim: true,
    },

    receptor: {
      type: String,
      required: true,
      trim: true,
    },

    estado: {
      type: String
    },

    mensaje: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = model("Solicitud", noteSchema);
