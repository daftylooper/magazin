const express = require('express')
const router = express.Router()

const CartSchema = require('../Models/models')

router.post('/addcart/:identifier', async (req, res) => {
    const identifier = req.params.identifier;
    const { products, total } = req.body;

    try {
        const newCart = new CartSchema({
            identifier: identifier,
            products: products,
            total: total
        });

        const r = await newCart.save(); // Save the cart to the database
        res.status(200).json(r);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router
