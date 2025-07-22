// cucumber.js
export default {
  default: {
    require: [
      "Cucumber/features/step-definitions/**/*.js",
      "Cucumber/features/support/hooks.js",
      "Cucumber/features/support/world.js",
    ],
    paths: ["Cucumber/features/**/*.feature"],
    format: [
      "json:reports/report.json", // required by cucumber-html-reporter
      "html:reports/cucumber-html-output.html", // optional if you still want raw HTML
    ],
    publishQuiet: true,
  },
};
