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
  res.json({ message: "You Have Reached User Microservice!" });
});

const loginRoute = require("./Routes/login");
app.use("/", loginRoute);
const signupRoute = require("./Routes/signup");
app.use("/", signupRoute);

mongoose
  .connect(process.env.MURL)
  .then(() => {
    app.listen(5001, () => console.log("User Microservice Is Running On 5001"));
  })
  .catch((error) => {
    console.log(error);
  });
