const express = require("express");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// Connection
// -> connection.js
connectMongoDb("mongodb://127.0.0.1:27017/node-js-1").then(() =>
  console.log("MongoDb Connected.")
);

// Schema
// -> models/user.js

// Middleware - plugin
// -> middlewares/index

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

// ROUTES
// -> routes/user.js
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server Started at: ${PORT} `));
