// Small utility functions kept separate from the server
// so they can be unit-tested without spinning up Express.

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

function isEven(n) {
  return n % 2 === 0;
}

module.exports = { add, subtract, multiply, divide, isEven };
