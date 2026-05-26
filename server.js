const express = require("express");
const app = express();

app.use(express.json());

let requestCount = 0;

function rateLimiter(req, res, next) {
  requestCount += 1;
  req.name = "Ayman";
  console.log("Total Number of request = ", requestCount);

  if (requestCount < 6) {
    next();
  } else {
    res.json({
      msg: "limit exceed",
    });
  }
}

function loggerMiddleware(req, res, next) {
  console.log("  Request Recived ");
  console.log("Method: ", req.method);
  console.log("Route: ", req.url);
  console.log("Time: ", new Date().toISOString());
  next();
}

function authenticationMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (token == "ayman") {
    next();
  } else {
    res.json({
      message: "not authorized to access",
    });
  }
}

app.use(rateLimiter);
app.use(loggerMiddleware);
app.use(authenticationMiddleware);

app.get("/sum/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const name = req.name;
  const result = parseInt(a) + parseInt(b);

  res.json({
    result: result,
    name,
  });
});

app.get(
  "/multiply/:a/:b",

  (req, res) => {
    const { a, b } = req.params;
    const result = parseInt(a) * parseInt(b);
    res.json({
      result: result,
    });
  },
);

app.get(
  "/divide/:a/:b",

  (req, res) => {
    const { a, b } = req.params;
    const result = parseInt(a) / parseInt(b);
    res.json({
      result: result,
    });
  },
);

app.get(
  "/subtract/:a/:b",

  (req, res) => {
    const { a, b } = req.params;
    const result = parseInt(a) - parseInt(b);
    res.json({
      result: result,
    });
  },
);

app.listen(8080, () => {
  console.log("server is listenting on port 8080");
});
