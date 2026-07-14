const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const app = require("../src/index");

function withServer(fn) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, async () => {
      const { port } = server.address();
      try {
        await fn(port);
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        server.close();
      }
    });
  });
}

function getJson(port, path) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (err) {
          reject(err);
        }
      });
    }).on("error", reject);
  });
}

test("GET / returns ok status", async () => {
  await withServer(async (port) => {
    const { status, body } = await getJson(port, "/");
    assert.equal(status, 200);
    assert.equal(body.status, "ok");
  });
});

test("GET /health returns healthy", async () => {
  await withServer(async (port) => {
    const { status, body } = await getJson(port, "/health");
    assert.equal(status, 200);
    assert.equal(body.status, "healthy");
  });
});

test("GET /calc/add sums two query params", async () => {
  await withServer(async (port) => {
    const { status, body } = await getJson(port, "/calc/add?a=4&b=5");
    assert.equal(status, 200);
    assert.equal(body.result, 9);
  });
});

test("GET /calc/divide with b=0 returns 400", async () => {
  await withServer(async (port) => {
    const { status, body } = await getJson(port, "/calc/divide?a=4&b=0");
    assert.equal(status, 400);
    assert.match(body.error, /Cannot divide by zero/);
  });
});
