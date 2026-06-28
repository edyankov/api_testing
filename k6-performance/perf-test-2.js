import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const TOKEN = __ENV.CLICKUP_TOKEN;
const BASE = "https://api.clickup.com/api/v2";

export const options = {
  scenarios: {
    rampup_profile: {
      executor: "ramping-arrival-rate",
      startRate: 20,
      timeUnit: "1s",
      preAllocatedVUs: 50,
      maxVUs: 300,
      stages: [
        { target: 20, duration: "20s" },  // 20 req/s for 20s
        { target: 100, duration: "30s" }, // ramp up to 100 req/s over 30s
      ],
    },
  },
};

export default function () {
  const res = http.get(`${BASE}/user`, {
    headers: { Authorization: TOKEN },
  });
  check(res, {
    "status is 200": (r) => r.status === 200,
    "has user": (r) => r.json("user") !== undefined,
  });
}

export function handleSummary(data) {
  return {
    "perf-report-2.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
