//Task 1

// #1 create partner.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//require('mongoose-currency).loadType(mongoose);
//const Currency= mongoose.Types.Currency;

// # 2- 3 partnerSchema
/*
Schema: In this file, create a new Mongoose Schema named partnerSchema. Use this sample partner document given below as your guide:
{
    "name": "Mongo Fly Shop",
    "image": "images/mongo-logo.png",
    "featured": false,
    "description": "Need a new fishing pole, a tacklebox, or flies of all kinds? Stop by Mongo Fly Shop."
}
*/

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // #3 Schema Fields: All fields should be required except for "featured", and the name should be unique.
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // # 4 Timestamps: Ensure that each document created from this Schema will automatically be given CreatedAt and UpdatedAt fields.
  }
);

const Partner = mongoose.model("Partner", partnerSchema); // # 5 Model: Create a Model named Partner from this Schema.

module.exports = Partner; // # 6 Export: Export the Partner Model from this module.
