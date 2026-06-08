const express = require("express");

const app = express();

app.use(express.json());

const users = [
  {
    username: "rohit",
    password: "merohit",
  },
  {
    username: "riya",
    password: "lowkeyriya",
  },
];

const logging = (req, res, next) => {
  console.log(req.method);
  console.log(req.body);
  next();
};

app.use(logging);

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ msg: "Token missing" });
  }

  // Find user by token
  const founduser = users.find((user) => user.token == token);

  if (founduser) {
    req.user = founduser;
    next();
  } else {
    res.status(401).json({ msg: "invalid user/token" });
  }
};

// SIGNUP
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  users.push({
    username,
    password,
  });

  console.log(users);

  res
    .json({
      msg: "sign-up successfully",
    })
    .status(200);
});

// SIGNIN
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const founduser = users.find((user) => {
    return user.username === username && user.password === password;
  });

  if (founduser) {
    const token = Math.floor(Math.random() * (1, 100 + 1));
    founduser.token = token;
    console.log(users);
    res.json({
      msg: "valid user",
      token: token,
    });
  } else {
    res.status(401).json({
      msg: "invalid user",
    });
  }
});

app.get("/me", authMiddleware, (req, res) => {
  res.json({
    username: req.user.username,
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
