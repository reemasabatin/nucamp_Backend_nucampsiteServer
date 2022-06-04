// # 1 Model module: In the nucampsiteServer/models folder, create a new file named promotion.js.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// #5 Cost: Use the mongoose-currency library's Currency type for the cost field.
//require("mongoose-currency").loadType(mongoose);
//const Currency = mongoose.Types.Currency;

// # 2 Schema: In this file, create a new Mongoose Schema named promotionSchema. Use this sample promotion document given below as your guide:

/*
{
    "name": "Mountain Adventure",
    "image": "images/breadcrumb-trail.jpg",
    "featured": true,
    "cost": 1299,
    "description": "Book a 5-day mountain trek with a seasoned outdoor guide! Fly fishing equipment and lessons provided."
}
*/

const promotionSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // # 3 Schema Fields: All fields should be required except for "featured", and the name should be unique.
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      required: false,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //# 4 Timestamps: Ensure that each document created from this Schema will automatically be given CreatedAt and UpdatedAt fields.
  }
);

const Promotion = mongoose.model("Promotion", promotionSchema); // # 6  Model: Create a Model named Promotion from this Schema.

module.exports = Promotion; // #7 Export: Export the Promotion Model from this module.
