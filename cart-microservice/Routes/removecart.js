const express = require('express');
const router = express.Router();
const CartSchema = require('../Models/models');

router.get('/removecart/:identifier', async (req, res) => {
    const identifier = req.params.identifier;

    try {
        // Delete the document matching the identifier
        const result = await CartSchema.deleteOne({ identifier });
        return res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
