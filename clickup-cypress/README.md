# ClickUp Goals API — Cypress Tests

Cypress API tests for ClickUp Goals endpoint with full object lifecycle:
**Create → Verify → Update → Negative check → Delete**

---

## Project Structure

```
clickup-cypress/
├── .env                        # your secrets (not committed to Git)
├── .env.example                # template — committed to Git
├── .gitignore
├── package.json
├── cypress.config.js
└── cypress/
    ├── e2e/
    │   └── goals.cy.js         # all tests
    └── support/
        ├── commands.js         # custom commands (createGoal, getGoal, etc.)
        └── e2e.js
```

---

## Requirements

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

Check if you have Node.js installed:

```bash
node --version
npm --version
```

---

## Setup

### 1. Clone or download the project

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd clickup-cypress
```

Or just copy the project folder to your machine.

### 2. Install dependencies

```bash
npm install
```

This will install Cypress and dotenv locally into `node_modules/`.

### 3. Create the `.env` file

Copy the example file and fill in your real values:

```bash
cp .env.example .env
```

Open `.env` and fill in:

```
CLICKUP_TOKEN=
CLICKUP_TEAM_ID=
CLICKUP_USER_ID=
```

| Variable | Where to find it |
|---|---|
| `CLICKUP_TOKEN` | ClickUp → Settings → Apps → API Token |
| `CLICKUP_TEAM_ID` | Visible in the URL: `app.clickup.com/{team_id}/...` |
| `CLICKUP_USER_ID` | `GET https://api.clickup.com/api/v2/user` → `id` field |

> ⚠️ Never commit `.env` to Git — it is already excluded via `.gitignore`

---

## Running Tests

### Headless mode (terminal output only)

```bash
npm test
```

### Interactive mode (Cypress UI)

```bash
npm run open
```

Then in the Cypress window:
1. Choose **E2E Testing**
2. Choose a browser (Chrome recommended)
3. Click `goals.cy.js`

---

## Test Lifecycle

Each full run executes these steps in order:

| # | Test | Method | Endpoint |
|---|------|--------|----------|
| 1 | Creates a goal | `POST` | `/team/{team_id}/goal` |
| 2 | Verifies the goal by ID | `GET` | `/goal/{goal_id}` |
| 3 | Finds the goal in the list | `GET` | `/team/{team_id}/goal` |
| 4 | Updates the goal | `PUT` | `/goal/{goal_id}` |
| 5 | Negative: no token → 401 | `GET` | `/goal/{goal_id}` |
| 6 | Deletes the goal | `DELETE` | `/goal/{goal_id}` |

---

## Troubleshooting

**`ENOENT: .env` not found**
→ Run `cp .env.example .env` and fill in the values.

**`401 Token invalid`**
→ Your token has expired or was regenerated. Go to ClickUp Settings → Apps and copy the current token.

**`401 Team not authorized`**
→ The `CLICKUP_TEAM_ID` is wrong. Check the URL in ClickUp: `app.clickup.com/{team_id}/...`

**Tests pass individually but fail when run together**
→ `goalId` is shared between tests via a `let` variable — make sure tests run in order (Cypress does this by default).
