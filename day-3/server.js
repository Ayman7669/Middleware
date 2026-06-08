const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey";

const app = express();

app.use(express.json());

const users = [
  {
    username: "rohit",
    password: "merohit",
    todos: ["go to school", "buy meat", "wash car"],
  },
  {
    username: "riya",
    password: "lowkeyriya",
    todos: ["go to mall", "wash utensil", "sell moms cloths"],
  },
];

const generateToken = () => {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let token = "";
  for (let i = 0; i < options.length; i++) {
    token = token + options[Math.floor(Math.random() * options.length)];
  }
  return token;
};

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
  const founduser = jwt.verify(token, JWT_SECRET);

  if (founduser.username) {
    req.username_token = founduser.username;

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
    todos: [],
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
    const token = jwt.sign({ username: founduser.username }, JWT_SECRET);
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
    msg: "valid token",
    username: req.username_token,
  });
});

app.get("/todos", authMiddleware, (req, res) => {
  const username = req.username_token;

  // db call on this username to get todos

  const userObj = users.find((u) => {
    return u.username == username;
  });
  console.log(userObj);
  res.json({ todos: userObj.todos });
});

app.post("/todos", authMiddleware, (req, res) => {
  const { todos } = req.body;

  const user = users.find((u) => u.username === req.username_token);

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  user.todos.push(todos);

  res.status(201).json({
    msg: "Todo added",
    todos: user.todos,
  });
});

app.delete("/todos", authMiddleware, (req, res) => {
  const { todos } = req.body;

  const user = users.find((u) => u.username === req.username_token);

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  const filtertodo = user.todos.filter((t) => t !== todos);
  user.todos = filtertodo;

  res.status(200).json({
    msg: "Todo delete",
    todos: user.todos,
  });
});

app.put("/todos", authMiddleware, (req, res) => {
  const { oldtodo, newtodo } = req.body;

  const user = users.find((u) => u.username === req.username_token);

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  const updatedtodos = user.todos.map((todo) => {
    if (todo === oldtodo) {
      return newtodo;
    } else {
      return todo;
    }
  });
  user.todos = updatedtodos;

  res.status(200).json({
    msg: "Todo updated",
    todos: user.todos,
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
