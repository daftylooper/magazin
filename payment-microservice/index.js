const express = require('express')
const cors = require('cors')
const mongoose=require('mongoose')
require('dotenv').config()
// const UserSchema = require('./Models/models')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.get('/',(req,res)=>{
    res.json({message:"You Have Reached payment Microservice!"})
})

const startsessionRoute = require('./Routes/startsession')
app.use('/', startsessionRoute)
const paymentRoute = require("./Routes/payment")
app.use('/pay', paymentRoute)

mongoose.connect(process.env.MURL)
.then(()=>{
    app.listen(4001,()=>console.log("payment Microservice Is Running On 4001"))
}).catch((error) => {
    console.log(error)
})
