const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDesc: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Item", productSchema);
