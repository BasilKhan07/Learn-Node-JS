const express = require("express");
const { connectMongoDb } = require("./connect");
const urlRoute = require("./routes/url");
const redirectUrlRoute = require("./routes/redirect_url");

const app = express();
const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDb Connected.")
);

app.use(express.json());

app.use("/url", urlRoute);

app.use("/", redirectUrlRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
