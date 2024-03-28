const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({

    identifier: {
        type: String,
        required: true,
    },
    cart_id: {
        type: String,
        required: true,
    },
    card_no:{
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true
    },
    total:{
        type: Number,
        required:true
    },
    isauth: {
        type: Boolean,
        default: false,
    }
});

// const credit = mongoose.model("payment",creditSchema);
// module.exports.saveRequest = function (newcredit, callback){
//     newcredit.save(this.callback);
// };

const upiSchema = new mongoose.Schema({

    identifier: {
        type: String,
        required: true,
    },
    cart_id: {
        type: String,
        required: true,
    },
    upi_id:{
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true
    },
    total:{
        type: Number,
        required:true
    },
    isauth: {
        type: Boolean,
        default: false,
    }
});

const upi = mongoose.model("payment",upiSchema);
// module.exports.saveRequest = function (newupi, callback){
//     newupi.save(this.callback);
// };

// module.exports = mongoose.model('payment', creditSchema)
// module.exports = mongoose.model('payment', upiSchema)
module.exports = {
    upi:upi
    // credit:credit
}   