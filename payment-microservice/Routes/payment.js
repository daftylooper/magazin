const express = require('express')
const router = express.Router()
const {credit} = require('../Models/card')
const {upi} = require('../Models/card')
// const Upi = require('../Models/upi')

router.post('/upi',async (req,res)=>{

    console.log(req.body)
    // const upi = new upi(req.body)
    const newUpiTX = new upi({
        identifier:req.body.identifier,
        cart_id:req.body.cart_id,
        upi_id:req.body.upi_id,
        password:req.body.password,
        total:req.body.total,
        is_auth:req.body.is_auth
    })
    try {
        console.log(newUpiTX);
        const upi = await newUpiTX.save()
        res.status(200).json(upi)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

router.post('/creditcard',async (req,res)=>{

    console.log(req.body)
    const newCardTX = new card({
        identifier: req.body.identifier,
        total: req.body.total,
        card_no: req.body.card_no,
        password: req.body.password,
        total:req.body.total,
        is_auth:req.body.is_auth
    })
    try {
        //insert into mongodb
        console.log(newCardTX);
        const card = await newCardTX.save()
        //send success request to frontend
        res.status(200).json(card)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

module.exports = router