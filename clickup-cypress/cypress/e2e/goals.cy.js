describe("ClickUp Goals API - full lifecycle", () => {
  const token = Cypress.env("token");
  const teamId = Cypress.env("teamId");
  const userId = Number(Cypress.env("userId"));

  let goalId;
  const goalName = `cypress_goal_${Date.now()}`;
  const updatedName = `cypress_goal_updated_${Date.now()}`;

  // 1. CREATE — create the object
  it("creates a goal (POST /team/{team_id}/goal)", () => {
    cy.createGoal(token, teamId, {
      name: goalName,
      due_date: Date.now() + 7 * 24 * 60 * 60 * 1000,
      description: "Created by Cypress autotest",
      multiple_owners: true,
      owners: [userId],
      color: "#32a852",
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.goal).to.have.property("id");
      expect(res.body.goal.name).to.eq(goalName);
      goalId = res.body.goal.id;
    });
  });

  // 2. VERIFY — check by ID
  it("verifies the goal by id (GET /goal/{goal_id})", () => {
    cy.getGoal(token, goalId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.goal.id).to.eq(goalId);
      expect(res.body.goal.name).to.eq(goalName);
    });
  });

  // 2b. VERIFY — check in the list
  it("finds the goal in the list (GET /team/{team_id}/goal)", () => {
    cy.getGoals(token, teamId).then((res) => {
      expect(res.status).to.eq(200);
      const allGoals = res.body.goals || [];
      const ids = allGoals.map((g) => g.id);
      cy.log("All goal IDs: " + JSON.stringify(ids));
      expect(ids).to.include(goalId);
    });
  });

  // 3. UPDATE — update the object
  it("updates the goal (PUT /goal/{goal_id})", () => {
    cy.updateGoal(token, goalId, {
      name: updatedName,
      due_date: Date.now() + 14 * 24 * 60 * 60 * 1000,
      description: "Updated by Cypress autotest",
      rem_owners: [],
      add_owners: [userId],
      color: "#e63946",
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.goal.name).to.eq(updatedName);
      expect(res.body.goal.id).to.eq(goalId);
    });
  });

  // NEGATIVE — request without token should fail
  it("cannot get the goal without a token (negative)", () => {
    cy.getGoal(null, goalId).then((res) => {
      expect(res.status).to.be.oneOf([400, 401]);
    });
  });

  // 4. DELETE — delete the object
  it("deletes the goal (DELETE /goal/{goal_id})", () => {
    cy.deleteGoal(token, goalId).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
