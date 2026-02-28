// cucumber.js
export default {
  default: {
    require: [
      "features/step-definitions/**/*.js",
      "features/support/hooks.js",
      "features/support/world.js",
    ],
    paths: ["features/**/*.feature"],
    format: [
      "json:reports/report.json", // required by cucumber-html-reporter
      "html:reports/cucumber-html-output.html", // optional if you still want raw HTML
    ],
    publishQuiet: true,
  },
};
