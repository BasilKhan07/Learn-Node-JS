const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Connecion
mongoose
  .connect("mongodb://127.0.0.1:27017/node-js-1")
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.log("Mongo Error: ", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

// Middleware - plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.method}: ${req.path}\n`,
    (err, data) => {
      console.log("Hello from Middleware 1");
      req.myUsername = "basil.dev";
      next();
    }
  );
  // for not sending to next function
  // return res.json({msgs: "Hello from Middleware 1"})
});

app.use((req, res, next) => {
  console.log("Hello from Middleware 2", req.myUsername);
  // Routes ke pass nhi jayega
  // return res.end('hey')
  next();
});

// ROUTES
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
    ${allDbUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not Found." });
    return res.json(user);
  })
  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      lastName: "Changed",
    });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    return res.json({ status: "Success" });
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({
    msg: "Success",
  });
});

app.listen(PORT, () => console.log(`Server Started at: ${PORT} `));
