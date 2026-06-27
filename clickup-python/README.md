# ClickUp Goals API — Python Tests + CircleCI

Python tests (pytest + requests) for ClickUp Goals API with full object lifecycle:
**Create → Verify → Update → Negative check → Delete**

---

## Project Structure

```
api_testing/
├── .circleci/
│   └── config.yml              # CI/CD config for all 3 projects
├── clickup-python/             # this project
│   ├── .env                    # your secrets (not committed to Git)
│   ├── .env.example            # template — committed to Git
│   ├── .gitignore
│   ├── requirements.txt
│   ├── pytest.ini
│   ├── api/
│   │   ├── __init__.py
│   │   └── clickup_client.py   # API client class with all methods
│   └── tests/
│       ├── __init__.py
│       └── test_goals.py       # all tests — full lifecycle
└── clickup-cypress/            # previous homework
```

---

## Requirements

- [Python 3.8+](https://www.python.org/downloads/)
- pip (comes with Python)

Check if you have Python installed:

```bash
python3 --version
pip --version
```

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/edyankov/api_testing.git
cd api_testing/clickup-python
```

### 2. Create a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate       # macOS / Linux
# or
venv\Scripts\activate          # Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Create the `.env` file

```bash
cp .env.example .env
```

Open `.env` and fill in your real values:

```
CLICKUP_TOKEN=pk_210245699_V49DWVLJQ0TQKTA6PKNR6KAY3BNVL70M
CLICKUP_TEAM_ID=90121775581
CLICKUP_USER_ID=210245699
```

| Variable | Where to find it |
|---|---|
| `CLICKUP_TOKEN` | ClickUp → Settings → Apps → API Token |
| `CLICKUP_TEAM_ID` | Visible in the URL: `app.clickup.com/{team_id}/...` |
| `CLICKUP_USER_ID` | `GET https://api.clickup.com/api/v2/user` → `id` field |

> ⚠️ Never commit `.env` to Git — it is already excluded via `.gitignore`

---

## Running Tests

```bash
pytest
```

Expected output:

```
tests/test_goals.py::TestGoalLifecycle::test_create_goal PASSED
tests/test_goals.py::TestGoalLifecycle::test_get_goal PASSED
tests/test_goals.py::TestGoalLifecycle::test_goal_in_list PASSED
tests/test_goals.py::TestGoalLifecycle::test_update_goal PASSED
tests/test_goals.py::TestGoalLifecycle::test_get_goal_without_token PASSED
tests/test_goals.py::TestGoalLifecycle::test_delete_goal PASSED

6 passed in X.XXs
```

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

## CircleCI Setup

CircleCI runs all 3 projects automatically on every push.

### 1. Connect the repository

1. Go to [circleci.com](https://circleci.com) and log in with GitHub
2. Click **Projects** → find `api_testing` → click **Set Up Project**
3. CircleCI will detect `.circleci/config.yml` automatically

### 2. Add Environment Variables

Go to **Project Settings → Environment Variables** and add:

| Variable | Value |
|---|---|
| `CLICKUP_TOKEN` | your API token |
| `CLICKUP_TEAM_ID` | `90121775581` |
| `CLICKUP_USER_ID` | `210245699` |
| `CLICKUP_FOLDER_ID` | `901211403440` |
| `CLICKUP_SPACE_ID` | `90127720907` |

> These replace the `.env` file in CI — CircleCI injects them as environment variables automatically.

### 3. Trigger the pipeline

Push any change to GitHub — CircleCI will start the pipeline automatically:

```bash
git add .
git commit -m "trigger CI"
git push origin main
```

### 4. Check results

Open CircleCI dashboard → your project → click the latest pipeline.
You should see 3 green jobs: `python-tests`, `postman-tests`, `cypress-tests`.

Take a **screenshot** of the green pipeline and add it to the `screenshots/` folder in the repo.

---

## Troubleshooting

**`ModuleNotFoundError: No module named 'api'`**
→ Make sure you run `pytest` from inside the `clickup-python/` folder, not from the repo root.

**`401 Token invalid`**
→ Your token has expired or was regenerated. Go to ClickUp Settings → Apps and copy the current token into `.env`.

**`AssertionError: 403`**
→ Your network blocks `api.clickup.com`. Try a different network or check firewall settings.

**Tests fail on step 2+ because `goal_id` is None**
→ Step 1 (create) failed — fix it first, the rest depend on it.
