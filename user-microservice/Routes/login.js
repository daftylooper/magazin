const express = require('express')
const router = express.Router()
const UserSchema = require('../Models/models')

router.post('/login', async(req,res)=>{
    const {email,password}=req.body
    try{
        const data =await UserSchema.findOne({email})
        if (!data) {
            throw Error('Email Not Registered')
        }
        else if (data.password != password) {
            throw Error('Incorrect Password')
        }
        else {
            const done = await UserSchema.findOneAndUpdate({"email": email}, {$set: {isauth:true}}, {upsert: true})
            res.status(200).json(done)
        }
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
})

module.exports = router