const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  console.log("I am in Get", req.myUsername);
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    let user = users.find((user) => user.id === id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    user = { ...user, ...body };

    const updatedUsers = users.map((u) => (u.id === id ? user : u));

    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(updatedUsers, null, 2),
      (err) => {
        if (err) {
          return res
            .status(500)
            .json({ status: "error", message: "Failed to update user" });
        }
        return res.json({ status: "success", user });
      }
    );
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    users.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to delete user" });
      }
      return res.json({ status: "success", message: "User deleted" });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server Started at: ${PORT} `));
