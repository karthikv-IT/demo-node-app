const test = require("node:test");
const assert = require("node:assert/strict");
const { add, subtract, multiply, divide, isEven } = require("../src/math");

test("add() adds two numbers", () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, 1), 0);
});

test("subtract() subtracts two numbers", () => {
  assert.equal(subtract(5, 3), 2);
  assert.equal(subtract(3, 5), -2);
});

test("multiply() multiplies two numbers", () => {
  assert.equal(multiply(4, 3), 12);
  assert.equal(multiply(-2, 3), -6);
});

test("divide() divides two numbers", () => {
  assert.equal(divide(10, 2), 5);
  assert.equal(divide(7, 2), 3.5);
});

test("divide() throws on division by zero", () => {
  assert.throws(() => divide(1, 0), /Cannot divide by zero/);
});

test("isEven() detects even and odd numbers", () => {
  assert.equal(isEven(4), true);
  assert.equal(isEven(7), false);
});
