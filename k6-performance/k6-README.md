# ClickUp API — k6 Performance Tests

Performance tests for ClickUp `GET /user` endpoint using [k6](https://k6.io/).

**Endpoint tested:** `GET https://api.clickup.com/api/v2/user`

---

## Load Profiles

### Test 1 — Spike (`perf-test-1.js`)

| Phase | Load | Duration |
|-------|------|----------|
| Baseline | 10 req/s | 20s |
| Spike | 100 req/s | 5s |
| Recovery | 10 req/s | 20s |

**Results (`perf-report-1.html`):**

| Metric | Value |
|--------|-------|
| Total requests | 1475 |
| Avg response time | 73.85 ms |
| p95 response time | 96.34 ms |
| Max response time | 277.04 ms |
| Failed requests | 93.65% |

---

### Test 2 — Ramp Up (`perf-test-2.js`)

| Phase | Load | Duration |
|-------|------|----------|
| Baseline | 20 req/s | 20s |
| Ramp Up | 20 → 100 req/s | 30s |

**Results (`perf-report-2.html`):**

| Metric | Value |
|--------|-------|
| Total requests | 2099 |
| Avg response time | 74.77 ms |
| p95 response time | 93.50 ms |
| Max response time | 454.34 ms |
| Failed requests | 95.45% |

---

## Note on Failed Requests

The high failure rate (93–95%) is expected — ClickUp enforces a rate limit
of ~100 requests/minute per token. At 100 req/s the API returns
**429 Too Many Requests**, which k6 counts as failed. This is normal behavior
for a public API under load and does not indicate a problem with the test setup.

---

## Requirements

- [k6](https://k6.io/) — `brew install k6`

---

## Running the Tests

```bash
export CLICKUP_TOKEN="your_token_here"

k6 run perf-test-1.js
k6 run perf-test-2.js
```

HTML reports are generated automatically after each run:
- `perf-report-1.html`
- `perf-report-2.html`

---

## Project Structure

```
k6-performance/
├── perf-test-1.js       # Spike load profile
├── perf-test-2.js       # Ramp up load profile
├── perf-report-1.html   # Report for test 1
├── perf-report-2.html   # Report for test 2
└── README.md
```
