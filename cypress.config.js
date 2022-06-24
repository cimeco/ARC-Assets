const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack"
    },
    specPattern: "**/*.cy.{js,jsx,ts,tsx}"
  },
});
