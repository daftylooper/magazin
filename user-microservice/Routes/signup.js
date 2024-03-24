const express = require('express')
const router = express.Router()
const UserSchema = require('../Models/models')

router.post('/signup',async (req,res)=>{

    console.log(req.body)
    const UserInstance = new UserSchema({
        identifier: req.body.identifier,
        email: req.body.email,
        password: req.body.password,
        status: true
    })
    try {
        console.log(UserInstance);
        const user = await UserInstance.save()
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

module.exports = router