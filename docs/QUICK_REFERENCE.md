# 🚀 AI Spec Files - Quick Reference

## ⚡ Quick Start (30 seconds)

```bash
# 1. Set API key (Windows PowerShell)
$env:ANTHROPIC_API_KEY = "sk-ant-xxxxx"

# 2. Run interactive guide
npm run ai:quickstart

# 3. Run AI failure analysis
npm run ai:analyze-failures

# 4. Run AI test generation
npm run ai:generate-tests
```

---

## 📋 All Commands

### Pre-Built AI Examples (No coding required)

```bash
# Interactive menu with all features explained
npm run ai:quickstart

# Analyze 3 sample test failures
npm run ai:analyze-failures

# Generate tests from requirements
npm run ai:generate-tests
```

### Run Your Own Test Files

```bash
# Run all tests in tests/ folder
npx playwright test

# Run specific AI test file
npx playwright test tests/ai-generated.spec.js

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# View HTML report after running
npx playwright show-report
```

### Run Custom Scripts

```bash
# Batch analyze failed tests (create script first)
node scripts/analyze-all-failures.js

# Generate test scenarios (create script first)
node scripts/generate-scenarios.js

# Enhance existing test
node scripts/enhance-test.js
```

---

## 🎯 Use Cases & Commands

### I want to... | Command
---|---
See AI features in action | `npm run ai:quickstart`
Understand failure root causes | `npm run ai:analyze-failures`
Generate new test cases | `npm run ai:generate-tests`
Run my own AI test | `npx playwright test tests/my-ai-test.spec.js`
Analyze real test failures | `node scripts/analyze-all-failures.js`
Generate test scenarios | `node scripts/generate-scenarios.js`
Create Page Object Model with AI | Create script + `node scripts/generate-pom.js`
Detect flaky tests | Use `TestFailureAnalyzer.identifyFlakiness()`

---

## 📁 Key Locations

**Pre-built Examples:**
- `examples/exampleTestFailureAnalysis.js` - Failure analysis examples
- `examples/exampleTestGeneration.js` - Test generation examples

**AI Modules:**
- `ai/AIClient.js` - Base Claude API client
- `ai/TestFailureAnalyzer.js` - Failure analysis
- `ai/TestInsights.js` - Test generation
- `ai/index.js` - All exports

**Documentation:**
- `docs/RUN_AI_SPECS.md` - Complete guide (this file + more)
- `ai/README.md` - Complete API reference
- `.env.example` - Configuration template

---

## 💻 Code Examples

### Analyze a Test Failure

```javascript
import { TestFailureAnalyzer } from "./ai/index.js";

const analyzer = new TestFailureAnalyzer();
const result = await analyzer.analyzeFailure(
  'My Test',
  'Timeout: waiting for selector',
  'test code here',
  'Context info'
);
console.log(result.analysis);
```

### Generate a Test from Requirement

```javascript
import { TestGenerator } from "./ai/index.js";

const generator = new TestGenerator();
const result = await generator.generateTestFromRequirement(`
  User can login with email and password
`);
console.log(result.testCode);
```

### Detect Flaky Tests

```javascript
const executionHistory = [
  { run: 1, passed: true },
  { run: 2, passed: false },
  { run: 3, passed: true },
];
const result = await analyzer.identifyFlakiness(
  'My Test',
  executionHistory
);
console.log(result.flakiessAnalysis);
```

---

## 🔍 Example Test File

```javascript
// tests/ai-example.spec.js
import { test, expect } from "@playwright/test";
import { TestFailureAnalyzer } from "../ai/index.js";

test("Login test with AI analysis", async ({ page }) => {
  const analyzer = new TestFailureAnalyzer();
  
  try {
    await page.goto("https://example.com/login");
    await page.fill('input[name="email"]', "user@example.com");
    await page.click("button[type=submit]");
    await expect(page).toHaveURL("/dashboard");
  } catch (error) {
    const analysis = await analyzer.analyzeFailure(
      "Login test",
      error.message,
      "test code here",
      "Browser info"
    );
    console.error(analysis.analysis);
    throw error;
  }
});
```

---

## ✅ Checklist for First Run

- [ ] Have Anthropic API key ready (https://console.anthropic.com)
- [ ] Set `ANTHROPIC_API_KEY` environment variable
- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run ai:quickstart` for interactive guide
- [ ] Run `npm run ai:analyze-failures` to see examples
- [ ] Create your first AI test file
- [ ] Run tests with `npx playwright test`
- [ ] View results in HTML report

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| API key not found | `$env:ANTHROPIC_API_KEY = "sk-ant-xxxxx"` |
| Module not found | `npm install` |
| Tests not running | Check `.env` file exists |
| API errors | Verify API key is valid at console.anthropic.com |

---

## 📞 More Info

- Full guide: `docs/RUN_AI_SPECS.md`
- API reference: `ai/README.md`
- Examples: `examples/` folder
- Configuration: `.env.example`

---

**Most common workflow:**

```bash
npm run ai:quickstart              # Explore features
npm run ai:analyze-failures        # See examples
npm run ai:generate-tests          # See test generation
npx playwright test tests/my.spec  # Run your tests
```
