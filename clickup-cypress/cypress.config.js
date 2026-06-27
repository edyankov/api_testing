const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api.clickup.com/api/v2",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      config.env.token = process.env.CLICKUP_TOKEN;
      config.env.teamId = process.env.CLICKUP_TEAM_ID;
      config.env.userId = process.env.CLICKUP_USER_ID;
      return config;
    },
  },
});
