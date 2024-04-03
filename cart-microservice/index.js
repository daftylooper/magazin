const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const UserSchema = require("./Models/models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "You Have Reached Cart Microservice!" });
});

const loginRoute = require("./Routes/removecart");
app.use("/", loginRoute);
const signupRoute = require("./Routes/addtocart");
app.use("/", signupRoute);

mongoose
  .connect(process.env.MURL)
  .then(() => {
    app.listen(7001, () => console.log("Cart Microservice Is Running On 7001"));
  })
  .catch((error) => {
    console.log(error);
  });
