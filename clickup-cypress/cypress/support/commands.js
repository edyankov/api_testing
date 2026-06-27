const BASE = "https://api.clickup.com/api/v2";

// Create a goal
Cypress.Commands.add("createGoal", (token, teamId, body) => {
  return cy.request({
    method: "POST",
    url: `${BASE}/team/${teamId}/goal`,
    headers: { Authorization: token, "Content-Type": "application/json" },
    body,
    failOnStatusCode: false,
  });
});

// Get a single goal by ID
Cypress.Commands.add("getGoal", (token, goalId) => {
  return cy.request({
    method: "GET",
    url: `${BASE}/goal/${goalId}`,
    headers: token ? { Authorization: token } : {},
    failOnStatusCode: false,
  });
});

// Get all goals for a team
Cypress.Commands.add("getGoals", (token, teamId) => {
  return cy.request({
    method: "GET",
    url: `${BASE}/team/${teamId}/goal`,
    headers: { Authorization: token },
    failOnStatusCode: false,
  });
});

// Update a goal
Cypress.Commands.add("updateGoal", (token, goalId, body) => {
  return cy.request({
    method: "PUT",
    url: `${BASE}/goal/${goalId}`,
    headers: { Authorization: token, "Content-Type": "application/json" },
    body,
    failOnStatusCode: false,
  });
});

// Delete a goal
Cypress.Commands.add("deleteGoal", (token, goalId) => {
  return cy.request({
    method: "DELETE",
    url: `${BASE}/goal/${goalId}`,
    headers: { Authorization: token },
    failOnStatusCode: false,
  });
});
