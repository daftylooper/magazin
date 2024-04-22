const express = require("express");
const router = express.Router();

const CartSchema = require("../Models/models");

router.get("/getcart/:identifier", async (req, res) => {
  const identifier = req.params.identifier;
  // console.log(identifier)
  try {
    const r = await CartSchema.findOne({ identifier });
    // console.log("--->", r)
    res.status(200).json(r);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
