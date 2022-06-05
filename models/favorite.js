const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema: In this file, create a new Mongoose Schema named favoriteSchema
const favoriteSchema = new Schema(
  {
    user: {
      //The favoriteSchema should have two fields: user and campsites.
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    campsites: [
      //should be in an array daw
      {
        type: mongoose.Schema.Types.ObjectId, //mongoose.Schema.Types.ObjectId
        ref: "Campsites",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite; //Model: Create and export a Model named Favorite from this Schema
