const express = require("express");
const { add, subtract, multiply, divide } = require("./math");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "demo-node-app is running", status: "ok" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});

app.get("/calc/:op", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: "Query params 'a' and 'b' must be numbers" });
  }

  try {
    let result;
    switch (req.params.op) {
      case "add":
        result = add(a, b);
        break;
      case "subtract":
        result = subtract(a, b);
        break;
      case "multiply":
        result = multiply(a, b);
        break;
      case "divide":
        result = divide(a, b);
        break;
      default:
        return res.status(400).json({ error: `Unknown operation: ${req.params.op}` });
    }
    res.json({ op: req.params.op, a, b, result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Only start listening when run directly (not when required by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`demo-node-app listening on port ${PORT}`);
  });
}

module.exports = app;
