const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    identifier: {
        type: String,
        required: true,
    },
    products: mongoose.Schema.Types.Mixed,
    total: {
        type: Number
    }
})

module.exports = mongoose.model('carts', cartSchema)