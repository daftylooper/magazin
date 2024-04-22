const express = require("express");
const router = express.Router();

const CartSchema = require("../Models/models");

router.post("/addcart/:identifier", async (req, res) => {
  const identifier = req.params.identifier;
  const { products, total } = req.body;

  try {
    let existingCart = await CartSchema.findOne({ identifier: identifier });

    if (existingCart) {
      existingCart.products = products;
      existingCart.total = total;
      const updatedCart = await existingCart.save();
      res.status(200).json(updatedCart);
    } else {
      const newCart = new CartSchema({
        identifier: identifier,
        products: products,
        total: total,
      });
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
