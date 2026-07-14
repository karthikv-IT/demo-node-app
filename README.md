# demo-node-app

A small Express app used for the **Jenkins Freestyle CI** hands-on lab
(DVein Innovations — DevOps Internship).

It has:
- A tiny Express server (`src/index.js`) with a few JSON routes
- Pure utility functions (`src/math.js`) that are easy to unit test
- Tests written with Node's built-in test runner (`node --test`) — no test framework to install

## Run locally

```bash
npm install
npm start
# visit http://localhost:3000
```

## Run tests

```bash
npm install
npm test
```

## Routes

| Route | Description |
|---|---|
| `GET /` | Returns `{ message, status: "ok" }` |
| `GET /health` | Returns `{ status: "healthy", uptime }` |
| `GET /calc/:op?a=&b=` | `op` is one of `add`, `subtract`, `multiply`, `divide` |

---

## Using this repo with Jenkins (Freestyle CI)

This is the exact repo referenced in the Freestyle CI lab guide. Steps below match that guide.

### 1. Push this project to GitHub

```bash
cd demo-node-app
git init
git add .
git commit -m "Initial commit: demo-node-app"
git branch -M main
git remote add origin https://github.com/<your-username>/demo-node-app.git
git push -u origin main
```

If prompted for a password, use a GitHub **Personal Access Token**, not your account password.

### 2. Create the Freestyle job in Jenkins

1. Jenkins dashboard → **New Item** → name it `demo-node-app-ci` → **Freestyle project** → OK
2. **Source Code Management** → Git
   - Repository URL: `https://github.com/<your-username>/demo-node-app.git`
   - Credentials: add your GitHub username + Personal Access Token (only needed for private repos)
   - Branch Specifier: `*/main`
3. **Build Triggers** → check **Poll SCM** → schedule: `H/5 * * * *`
4. **Build Steps** → **Execute shell**:
   ```bash
   echo "Installing dependencies..."
   npm install

   echo "Running tests..."
   npm test
   ```
   On native Windows agents, use **Execute Windows batch command** instead, with the same two commands.
5. **Post-build Actions** → **Archive the artifacts** → `**/*.log`
6. **Save**, then click **Build Now**

### 3. Verify

- Open **Console Output** on the new build — you should see `npm install` output followed by all tests passing (10 tests across the two files).
- The build should finish **SUCCESS** (blue/green).

### 4. Test the CI loop

Make a small change (e.g. edit this README), commit, and push:

```bash
git add .
git commit -m "Test CI trigger"
git push
```

Within the poll interval (or immediately if using a webhook), Jenkins should start a new build automatically.

### Breaking a test on purpose (optional, for the lab)

To see what a **failed** build looks like, temporarily change the expected value in
`tests/math.test.js` (e.g. `assert.equal(add(2, 3), 6)`), push, and watch the build turn red.
Revert the change afterward and push again to get back to green.
