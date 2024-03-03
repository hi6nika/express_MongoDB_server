const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: [true, "Image is required!"],
  },

  condition: {
    type: String,
    required: [true, "Condition is required!"],
  },

  price: {
    type: Number,
    required: [true, "Price is required!"],
  },

  description: {
    type: String,
    required: [true, "Description is required!"],
  },

  owner: {
    type: Array,
    required: [true, "Owner is required!"],
  },

  views: {
    type: Number,
    required: [true, "Views is required!"],
  },

  buyers: {
    type: Array,
    required: [true, "Buyers is required!"],
  },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
