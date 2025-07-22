# 🧪 Playwright E2E Testing Framework with Cucumber, Visual Testing & GitHub Actions

This is an **End-to-End Test Automation Framework** using **Playwright + JavaScript + Cucumber**. It supports:

✅ BDD Methodology  
✅ Applitools for Visual Testing  
✅ GitHub Actions CI/CD Integration  
✅ Allure & HTML Reporting  
✅ Screenshot on Test Failure  
✅ API Token Testing  
✅ Organized Folder Structure  
✅ Reusable Page Object Model (POM)

---

## 🚀 Quick Start

```bash
git clone https://github.com/Jintojose39/play2.git
cd play2
npm install
npx playwright install


🔧 Run Tests

# Run all Playwright tests
npx playwright test

# Run Cucumber tests (BDD)
npx cucumber-js

# Run tagged scenario
npx cucumber-js --tags "@checkout"



✅ Features

| Feature                        | Implemented | Location or File                         |
| ------------------------------ | ----------- | ---------------------------------------- |
| BDD with Cucumber              | ✅           | `tests/cucumber/features/*.feature`      |
| Page Object Model (POM)        | ✅           | `utils/POManager.js`                     |
| API Testing with Bearer Token  | ✅           | `tests/apiToken.spec.js`                 |
| Visual Testing with Applitools | ✅           | `tests/visualTesting.spec.js`            |
| GitHub Actions CI Integration  | ✅           | `.github/workflows/playwright.yml`       |
| Cucumber Hooks (Before/After)  | ✅           | `tests/cucumber/hooks/`                  |
| Shared World Context for Steps | ✅           | `tests/cucumber/world.js`                |
| Screenshot on Scenario Failure | ✅           | `tests/cucumber/hooks/screenshotHook.js` |
| Allure and HTML Reports        | ✅           | `reports/` folder                        |


🧪 Folder Structure

play2/
├── .github/
│   └── workflows/
│       └── playwright.yml            # GitHub Actions CI
├── tests/
│   ├── apiToken.spec.js              # API testing with token
│   ├── visualTesting.spec.js         # Applitools visual testing
│   └── cucumber/
│       ├── features/                 # Cucumber feature files
│       ├── steps/                    # Step Definitions
│       ├── hooks/                    # Before/After hooks & screenshot
│       └── world.js                  # Shared World Context
├── utils/
│   ├── POManager.js                  # Page Object Manager
│   └── applitools.config.js          # Applitools setup
├── screenshots/                      # Screenshots on failure
├── reports/                          # Allure & HTML reports
├── .env                              # Contains API tokens (gitignored)
├── package.json
└── README.md

🔐 API Testing with Bearer Token
Using Playwright’s request.newContext() with token:

# const apiContext = await request.newContext({
#   baseURL: "https://api.example.com",
#   extraHTTPHeaders: {
#     Authorization: `Bearer ${process.env.API_TOKEN}`,
#   },
# });

👁️‍🗨️ Visual Testing with Applitools
Integrated with Playwright for cross-browser UI validation.

# const eyes = new Eyes();
# await eyes.open(page, 'Visual App', 'Homepage');
# await eyes.check('Main View', Target.window());
# await eyes.close();


Configure your Applitools API key in .env:

APPLITOOLS_API_KEY=your_real_key

📸 Cucumber Screenshot on Failure:

Automatically captures screenshot when a scenario fails.

📁 Saved in /screenshots/

💡 Hook implemented in:
tests/cucumber/hooks/screenshotHook.js

📊 Reports

| Report Type                       | Command                                                                                |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| Allure Report                     | `allure generate allure-results --clean -o allure-report && allure open allure-report` |
| HTML Report                       | Auto-generated in CI and uploaded as artifacts                                         |
| Cucumber Summary with screenshots | Auto-attached in CI run                                                                |



⚙️ GitHub Actions CI
CI is triggered on every push and PR.

Path: .github/workflows/playwright.yml

# name: Playwright Tests

# on: [push, pull_request]

# jobs:
#   test:
#     runs-on: ubuntu-latest
#     steps:
#       - name: Checkout
#         uses: actions/checkout@v3

#       - name: Setup Node.js
#         uses: actions/setup-node@v3
#         with:
#           node-version: '18'

#       - name: Install dependencies
#         run: npm ci

#       - name: Run BDD Tests
#         run: npx cucumber-js

#       - name: Upload Artifacts
#         uses: actions/upload-artifact@v3
#         with:
#           name: cucumber-report
#           path: reports/


🧠 BDD Testing Methodology

Feature: Checkout Flow

  Scenario: User places order successfully
    Given the user is logged in
    When the user adds "backpack" to the cart
    And the user completes the checkout process
    Then the order should be visible in order history

Steps mapped in tests/cucumber/steps/

🧑‍💻 Author
Jinto Jose
QA Automation Engineer (JavaScript | Playwright | WebDriverIO | Cucumber|BDD)

🌐 GitHub
📬 Open to collaboration & feedback!



✅ Future Enhancements
 Add CI badge to README

 Add Applitools dashboard screenshot

 Integrate Azure DevOps (optional)

 Include video recording on failures


 
---

Let me know if you'd like:
- a downloadable `.md` file,
- a badge for GitHub Actions build status,
- or help pushing this to your repo directly.






