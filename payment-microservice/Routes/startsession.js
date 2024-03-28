const express = require('express')
const router = express.Router()
// const upiSchema = require('../Models/upi')
// const cartSchema = require('../Models/cart')

router.get('/start_session/:id', async(req,res)=>{
    
    try{
        const product_id = req.params.id
        const cartInstance = await cartSchema.findOne(product_id);
        // make request to frontend to route to payment page( use makes payment and frontend makes a request to backend to "/pay/upi or card" )
        const paymentRedirectUrl = '/payment';
        res.json({ paymentRedirectUrl });

    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
})

module.exports = router