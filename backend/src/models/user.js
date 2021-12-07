const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
    },

    preferences: Array,

    amigos: Array,

    password: {
      type: String,
      required: true,
      trim: true,
    },

    profileImage: {
      type: String,
      trim: true,
    },

    solicitudesEnviadas: Array,

    solicitudesRecibidas: Array,

    notificaciones:Array
  },

  {
    timestamps: true,
  }
);

module.exports = model("User", noteSchema);
