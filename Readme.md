# 🧪 Play2 - Advanced Test Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.54+-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-orange)
![License](https://img.shields.io/badge/License-ISC-yellow)

**A comprehensive End-to-End Test Automation Framework** built with **Playwright + JavaScript + Cucumber + AI**

This framework provides enterprise-grade testing capabilities with AI-powered test analysis, automated test generation, and intelligent failure diagnostics.

---

## ✨ Key Features

### Testing & Automation
- ✅ **Playwright** - Modern browser automation
- ✅ **Cucumber/BDD** - Behavior-Driven Development with Gherkin syntax
- ✅ **Page Object Model (POM)** - Scalable test architecture
- ✅ **API Testing** - REST & Bearer token authentication
- ✅ **Cross-browser Testing** - Chrome, Firefox, Safari, Edge support

### Reporting & Monitoring
- ✅ **Allure Reports** - Beautiful HTML test reports
- ✅ **Applitools** - Visual regression testing
- ✅ **Screenshot Capture** - Automatic screenshots on failures
- ✅ **Video Recording** - Test execution recordings
- ✅ **Multiple Report Formats** - JSON, HTML, Cucumber

### 🤖 AI-Powered Intelligence
- ✅ **Intelligent Failure Analysis** - AI root cause analysis of test failures
- ✅ **Automatic Test Generation** - Generate tests from requirements
- ✅ **Flakiness Detection** - Identify and fix unreliable tests
- ✅ **Edge Case Generation** - AI-powered test scenario creation
- ✅ **Smart Recommendations** - Get actionable fixing suggestions

### CI/CD Integration
- ✅ **GitHub Actions** - Automated testing on every push/PR
- ✅ **Artifact Management** - Reports stored as artifacts
- ✅ **Parallel Execution** - Run tests concurrently
- ✅ **Scheduled Testing** - Nightly and periodic test runs

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Git**
- **npm** (comes with Node.js)
- **Anthropic API Key** (for AI features - optional but recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Jintojose39/play2.git
cd play2

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Environment Setup

Create a `.env` file in the project root:

```bash
# AI Integration (get from https://console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# API Testing
API_TOKEN=your_bearer_token_here
BASE_URL=https://api.example.com

# Visual Testing (Applitools)
APPLITOOLS_API_KEY=your_applitools_key
```

---

## 📖 Usage

### Run Tests

```bash
# All Playwright tests
npx playwright test

# Specific test file
npx playwright test tests/api.spec.js

# Run Cucumber BDD tests
npx cucumber-js

# Run tests with specific tag
npx cucumber-js --tags @smoke

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug
```

### AI Features

```bash
# Interactive AI setup guide
npm run ai:quickstart

# Analyze test failures with AI
npm run ai:analyze-failures

# Generate tests from requirements
npm run ai:generate-tests
```

### Generate Reports

```bash
# Generate Allure report
allure generate allure-results --clean -o allure-report && allure open allure-report

# View Playwright HTML report
npx playwright show-report

# Generate Cucumber reports
npm run report

# API Testing with Newman
npm run test:newman

# All tests with reports
npm run test:with-report
```

---

## 🏗️ Project Structure

```
play2/
│
├── 📁 ai/                              # AI Integration (Claude)
│   ├── AIClient.js                     # Base Claude API client
│   ├── TestFailureAnalyzer.js          # Failure analysis & diagnostics
│   ├── TestInsights.js                 # Test generation & recommendations
│   ├── PlaywrightAIIntegration.js      # Playwright-specific AI hooks
│   ├── index.js                        # Module exports
│   └── README.md                       # Complete AI API documentation
│
├── 📁 examples/                        # AI Usage Examples
│   ├── exampleTestFailureAnalysis.js   # Failure analysis examples
│   └── exampleTestGeneration.js        # Test generation examples
│
├── 📁 tests/                           # Test Specifications
│   ├── *.spec.js                       # Playwright test files
│   ├── api.spec.js                     # API endpoint tests
│   ├── UIBasics.spec.js                # UI interaction tests
│   ├── upload/                         # Test data files
│   └── cucumber/
│       ├── features/                   # .feature files (Gherkin)
│       ├── step_definitions/           # Step implementations
│       ├── support/
│       │   ├── hooks.js                # Before/After hooks
│       │   └── world.js                # Shared test context
│       └── Ecommerce.feature           # Sample BDD feature
│
├── 📁 e2e/                             # End-to-End test scenarios
│   └── example.spec.js                 # E2E example
│
├── 📁 features/                        # Cucumber features (alternative)
│   └── Ecommerce.feature               # Sample feature file
│
├── 📁 pages/                           # Page Object Models
│   ├── LoginPage.js                    # Login page POM
│   ├── CartPage.js                     # Shopping cart POM
│   ├── CheckOutPage.js                 # Checkout page POM
│   ├── OrderPage.js                    # Order confirmation POM
│   └── CommonPage.js                   # Shared page elements
│
├── 📁 utils/                           # Utility & Helper Classes
│   ├── POManager.js                    # Page Object Manager
│   ├── ApiUtils.js                     # API helper methods
│   └── constants.js                    # Test constants
│
├── 📁 testData/                        # Test Data Files
│   ├── loginCredentials.json           # Login test data
│   ├── apiTestData.json                # API test data
│   ├── testData.json                   # General test data
│   └── env.json                        # Environment config
│
├── 📁 reports/                         # Generated Reports
│   ├── cucumber-report.html            # Cucumber report
│   ├── report.json                     # JSON report
│   ├── ai-analysis/                    # AI analysis reports
│   ├── api/                            # API test reports
│   ├── newman/                         # Newman API reports
│   └── playwright/                     # Playwright reports
│
├── 📁 playwright-report/               # Playwright HTML reports
│   └── index.html                      # Report viewer
│
├── 📁 recordings/                      # Video recordings
│   └── [test-videos]                   # Recorded test runs
│
├── 📁 downloads/                       # Downloaded files during tests
│   └── [test-downloads]                # Files downloaded by tests
│
├── 📄 package.json                     # NPM dependencies & scripts
├── 📄 playwright.config.js             # Playwright configuration
├── 📄 playwright.service.config.js     # Service-based config
├── 📄 cucumber.js                      # Cucumber configuration
├── 📄 .env                             # Environment variables (gitignored)
├── 📄 .env.example                     # Example env template
├── 📄 ai-quickstart.js                 # AI interactive setup
├── 📄 README.md                        # This file
└── 📄 .gitignore                       # Git ignore rules
```

---

## ✅ Features Implemented

| Feature | Implemented | Location |
|---------|-------------|----------|
| BDD with Cucumber | ✅ | `features/`, `cucumber.js` |
| Page Object Model | ✅ | `pages/`, `utils/POManager.js` |
| API Testing with Bearer Token | ✅ | `tests/api.spec.js` |
| Visual Testing (Applitools) | ✅ | Integrated with Playwright |
| GitHub Actions CI | ✅ | `.github/workflows/` |
| Playwright Hooks | ✅ | Automatic setup/teardown |
| Screenshot on Failure | ✅ | `playwright.config.js` |
| HTML/JSON Reports | ✅ | `reports/` directory |
| AI Failure Analysis | ✅ | `ai/TestFailureAnalyzer.js` |
| AI Test Generation | ✅ | `ai/TestInsights.js` |
| AI POM Generation | ✅ | `ai/TestInsights.js` |
| Flakiness Detection | ✅ | `ai/TestFailureAnalyzer.js` |

---

## 🤖 AI Integration Guide

### Test Failure Analysis

Automatically analyze failing tests to understand root causes:

```javascript
import { TestFailureAnalyzer } from './ai/index.js';

const analyzer = new TestFailureAnalyzer();

// Analyze single failure
const result = await analyzer.analyzeFailure(
  'Login Test',
  'Timeout: waiting for selector .error-message',
  'await expect(page.locator(".error-message")).toBeVisible();',
  'Chrome 120, staging environment'
);

console.log(result.analysis);

// Analyze batch of failures
const failures = [
  { testName: 'Test 1', errorMessage: '...', testCode: '...' },
  { testName: 'Test 2', errorMessage: '...', testCode: '...' }
];
const results = await analyzer.analyzeBatchFailures(failures);

// Get recommendations
const suggestions = await analyzer.suggestFixes(results);
```

### Test Generation

Generate complete test cases from requirements:

```javascript
import { TestGenerator } from './ai/index.js';

const generator = new TestGenerator();

// Generate from user story
const requirement = `
  User Story: Product Search
  - User can search by keyword
  - Results filtered by relevance
  - User can sort by price
`;
const test = await generator.generateTestFromRequirement(requirement);
console.log(test.testCode);

// Enhance existing test
const enhanced = await generator.enhanceExistingTest(existingCode, [
  'Better waits',
  'Improved assertions'
]);

// Generate POM
const pom = await generator.generatePageObjectModel('Login Page', [
  { name: 'emailInput', selector: 'input[data-testid="email"]' },
  { name: 'submitBtn', selector: 'button[type="submit"]' }
]);
```

👉 **See [ai/README.md](ai/README.md) for complete API documentation**

---

## 📋 Available npm Scripts

```bash
npm test                        # Run all Playwright tests
npm run test:api                # Run API tests
npm run test:api:report         # Run API tests with report
npm run test:newman             # Run Newman (Postman) API tests
npm run test:all                # Run all tests
npm run clean-report            # Clean reports directory
npm run report                  # Generate Cucumber reports
npm run test:with-report        # Run tests and generate reports
npm run ai:quickstart           # Interactive AI setup guide
npm run ai:analyze-failures     # Analyze test failures with AI
npm run ai:generate-tests       # Generate tests from requirements
```

---

## 📦 Dependencies

### Core Testing
- **@playwright/test** (^1.54.1) - Browser automation
- **@cucumber/cucumber** (^12.0.0) - BDD framework

### AI Integration
- **@anthropic-ai/sdk** (^0.24.0) - Claude AI API

### Reporting
- **cucumber-html-reporter** (^7.2.0) - Cucumber reports
- **multiple-cucumber-html-reporter** (^3.9.3) - Enhanced reports
- **newman** (^4.6.1) - Postman API testing

### Visual Testing
- **@applitools/eyes-playwright** (^1.38.0) - Visual regression

### Utilities
- **exceljs** (^4.4.0) - Excel file handling
- **dotenv** (^17.2.0) - Environment variables
- **rimraf** (^6.0.1) - File cleanup

---

## 🔐 Configuration

### Playwright Configuration

Edit `playwright.config.js` to customize:
- Browser types and headless mode
- Timeouts and retries
- Screenshot/video capture
- Parallel execution settings

### Environment Variables

Required for full functionality:
- `ANTHROPIC_API_KEY` - Claude API key for AI features
- `API_TOKEN` - Bearer token for API testing
- `APPLITOOLS_API_KEY` - Applitools visual testing key
- `BASE_URL` - Application base URL

---

## 📊 Reports Generated

| Report Type | Command | Location |
|-------------|---------|----------|
| Playwright HTML | `npx playwright show-report` | `playwright-report/` |
| Cucumber HTML | `npm run report` | `reports/cucumber-report.html` |
| Allure | `allure open allure-report` | `allure-report/` |
| AI Analysis | `npm run ai:analyze-failures` | `reports/ai-analysis/` |
| Newman API | `npm run test:newman` | `newman-report.html` |

---

## 🐛 Troubleshooting

### Common Issues

**API Key not found**
```bash
# Windows PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-xxxxx"

# Windows CMD
set ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**Tests timing out**
- Increase timeout in `playwright.config.js`
- Check application is running
- Verify network connectivity

**Port conflicts**
- Change base URL in configuration
- Kill process: `netstat -ano | findstr :3000`

---

## 📚 Resources

- **[Playwright Docs](https://playwright.dev)** - Browser automation
- **[Cucumber Docs](https://cucumber.io/docs/cucumber/)** - BDD specifications
- **[Claude API](https://docs.anthropic.com/)** - AI integration
- **[AI Guide](ai/README.md)** - Complete AI API reference

---

## 🔄 CI/CD Integration

Tests run automatically on GitHub Actions:
- Every push to main branch
- Pull requests
- Scheduled nightly builds

Configure in `.github/workflows/playwright.yml`

---

## 📈 Best Practices

### Test Organization
- Keep related tests in feature files
- Use meaningful test names
- Organize test data in `testData/`
- Use Page Objects for UI elements

### Reliability
- Use explicit waits instead of sleeps
- Handle dynamic content with proper selectors
- Implement proper error handling
- Use appropriate timeouts

### Maintainability
- Follow DRY (Don't Repeat Yourself) principle
- Use helper methods in utils
- Document complex scenarios
- Keep tests independent

### AI Usage
- Provide context for better analysis
- Review AI-generated code before using
- Monitor API usage and costs
- Use in development and CI pipelines

---

## 📄 License

This project is licensed under the **ISC License**

---

## 👨‍💻 Author

**Jinto Jose**  
QA Automation Engineer  
_JavaScript | Playwright | WebDriverIO | Cucumber | BDD_

- 🌐 GitHub: [@Jintojose39](https://github.com/Jintojose39)
- 📧 Contact: Open to collaboration & feedback

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🗺️ Roadmap

- [ ] GitHub Actions build status badge
- [ ] Applitools dashboard integration
- [ ] Azure DevOps integration
- [ ] Enhanced video recording on failures
- [ ] Custom HTML report templates
- [ ] Performance metrics reporting
- [ ] Database integration testing

---

## ⚠️ Important Notes

- **Never commit** `.env` files with secrets
- Always use environment variables for sensitive data
- Keep API keys secure
- Test locally before pushing
- Update dependencies regularly for security

---

**Happy Testing! 🚀**

_For issues, feature requests, or questions, please open an issue on GitHub._






