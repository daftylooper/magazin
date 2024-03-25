const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemRouter = require("./Routes");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

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
