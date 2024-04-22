const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemRouter = require("./Routes");
const mongoose=require('mongoose')
require('dotenv').config()


const app = express();
const apiPort = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", itemRouter);

mongoose
  .connect(process.env.MURL)
  .then(() => {
    app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
  })
  .catch((error) => {
    console.log(error);
  });
