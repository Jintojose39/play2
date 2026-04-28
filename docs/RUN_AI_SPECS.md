# 🤖 How to Run AI-Based Spec Files

This guide shows you how to run and use AI features in your test automation framework.

---

## 📖 Quick Commands

### Run AI Examples (No Setup Required)

```bash
# Interactive AI setup guide
npm run ai:quickstart

# Analyze test failures with AI
npm run ai:analyze-failures

# Generate tests from requirements
npm run ai:generate-tests
```

---

## 🎯 Method 1: Run Pre-Built Examples

### 1. Test Failure Analysis Examples

```bash
npm run ai:analyze-failures
```

**What it does:**
- Analyzes 3 sample test failures
- Shows AI root cause analysis
- Demonstrates batch failure analysis
- Shows flakiness detection

**Location:** `examples/exampleTestFailureAnalysis.js`

**Example Output:**
```
🔍 Analyzing test failures with AI...

✨ AI Analysis for Login Test:
**Root Cause:** The test is waiting for an element that appears 
after JavaScript rendering...

**Why It Failed:** Race condition between form submission and 
element appearance...

**Recommendations:**
1. Add explicit wait for element
2. Use waitForNavigation() if page redirects
3. Consider using network idle
```

---

### 2. Test Generation Examples

```bash
npm run ai:generate-tests
```

**What it does:**
- Generates test from user story
- Enhances existing test code
- Creates Page Object Models
- Generates test scenarios
- Identifies edge cases

**Location:** `examples/exampleTestGeneration.js`

**Example Output:**
```javascript
✅ Generated Test Code:

import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.locator('input[data-testid="email"]')
    .fill('user@example.com');
  // ... more generated code
});
```

---

### 3. Interactive Setup Guide

```bash
npm run ai:quickstart
```

**What it does:**
- Interactive menu system
- Installation instructions
- Feature explanations
- Usage examples
- Environment setup help

---

## 💻 Method 2: Use AI in Your Own Test Files

### Create a New AI Test File

Create `tests/ai-analysis.spec.js`:

```javascript
import { test, expect } from "@playwright/test";
import { TestFailureAnalyzer } from "../ai/index.js";

// Test that intentionally fails for AI analysis
test("User Login - Intentional Failure for AI Analysis", async ({ page }) => {
  // This will fail and we'll analyze it with AI
  await page.goto("https://example.com/login");
  await page.locator("[data-testid='username']").fill('testuser');
  await page.locator("[data-testid='password']").fill('wrongpassword');
  await page.locator("button#signin").click();
  
  // This will fail and trigger our AI analysis hook
  await expect(page.locator(".error-message")).toContainText("Invalid");
});

// Test that uses AI to generate recommendations after failure
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== "passed") {
    const analyzer = new TestFailureAnalyzer();
    
    const result = await analyzer.analyzeFailure(
      testInfo.title,
      testInfo.error?.message || "Test failed",
      `Test: ${testInfo.title}`,
      `Browser: ${testInfo.project.name}`
    );
    
    if (result.success) {
      console.log("\n🤖 AI Recommendation:");
      console.log(result.analysis);
    }
  }
});
```

**Run it:**
```bash
npx playwright test tests/ai-analysis.spec.js
```

---

## 🧪 Method 3: Generate Tests from Requirements

Create `tests/ai-generated.spec.js`:

```javascript
import { test, expect } from "@playwright/test";
import { TestGenerator } from "../ai/index.js";

// Generate test code from requirements at runtime
test("Generate and run test from requirement", async () => {
  const generator = new TestGenerator();
  
  const requirement = `
    User Story: Password Reset
    - User can request password reset
    - Email is sent with reset link
    - User can set new password
    - Login works with new password
  `;
  
  const result = await generator.generateTestFromRequirement(requirement);
  
  if (result.success) {
    console.log("\n✅ AI Generated Test:");
    console.log(result.testCode);
    
    // You can also save this to a file
    // export * from generated test
  }
});
```

**Run it:**
```bash
npx playwright test tests/ai-generated.spec.js
```

---

## 📊 Method 4: Analyze Real Failures

### Step 1: Make a Test Fail Intentionally

```javascript
// tests/failing-test.spec.js
import { test, expect } from "@playwright/test";

test("This test will fail", async ({ page }) => {
  await page.goto("https://example.com");
  // Wrong selector on purpose
  await expect(page.locator(".non-existent-element")).toBeVisible();
});
```

### Step 2: Capture the Failure

```bash
npx playwright test tests/failing-test.spec.js 2>&1 | tee failure.log
```

### Step 3: Analyze with AI

Create `analyze-failure.js`:

```javascript
import { TestFailureAnalyzer } from "./ai/index.js";

const analyzer = new TestFailureAnalyzer();

const failure = {
  testName: "This test will fail",
  errorMessage: "Timeout: waiting for locator '.non-existent-element'",
  testCode: `
    await page.goto("https://example.com");
    await expect(page.locator(".non-existent-element")).toBeVisible();
  `,
  context: "Chrome 120, staging environment"
};

const result = await analyzer.analyzeFailure(
  failure.testName,
  failure.errorMessage,
  failure.testCode,
  failure.context
);

console.log(result.analysis);
```

**Run it:**
```bash
node analyze-failure.js
```

---

## 🛠️ Method 5: Create Custom AI Test Scripts

### Batch Analysis Script

Create `scripts/analyze-all-failures.js`:

```javascript
import { TestFailureAnalyzer } from "../ai/index.js";
import fs from "fs";

const analyzer = new TestFailureAnalyzer();

// Read test results
const results = JSON.parse(
  fs.readFileSync("test-results/results.json", "utf8")
);

// Filter failures
const failures = results.tests
  .filter(t => t.status === "failed")
  .map(t => ({
    testName: t.name,
    errorMessage: t.error,
    testCode: t.testCode,
    context: `Browser: ${t.browser}, OS: ${t.os}`
  }));

// Analyze each failure
console.log(`📊 Analyzing ${failures.length} test failures...\n`);

const analyses = await analyzer.analyzeBatchFailures(failures);

// Get recommendations
const suggestions = await analyzer.suggestFixes(analyses);

console.log("💡 Overall Recommendations:");
console.log(suggestions.suggestions);

// Save report
fs.writeFileSync(
  "reports/ai-failure-analysis.json",
  JSON.stringify(analyses, null, 2)
);
```

**Run it:**
```bash
node scripts/analyze-all-failures.js
```

---

## 🔄 Method 6: Integrate AI into Playwright Config

Create `AI hooks` in `playwright.config.js`:

```javascript
import { TestFailureAnalyzer } from "./ai/index.js";

const analyzer = new TestFailureAnalyzer();

export default {
  testDir: "./tests",
  
  // Other config...
  
  reporter: [
    ["html"],
    ["json", { outputFile: "test-results/results.json" }]
  ],
  
  // Add AI analysis on failure
  webServer: {
    command: "npm run start",
    port: 3000,
  },
  
  // Custom hook after all tests
  globalTeardown: require.resolve("./ai/globalTeardown.js"),
};
```

Create `ai/globalTeardown.js`:

```javascript
import { TestFailureAnalyzer } from "./AIClient.js";
import fs from "fs";

export default async () => {
  const failedTests = JSON.parse(
    fs.readFileSync("test-results/failed-tests.json", "utf8")
  );
  
  if (failedTests.length > 0) {
    const analyzer = new TestFailureAnalyzer();
    const analyses = await analyzer.analyzeBatchFailures(failedTests);
    
    // Save AI analysis
    fs.writeFileSync(
      "reports/ai-analysis-report.json",
      JSON.stringify(analyses, null, 2)
    );
  }
};
```

---

## 📋 Method 7: Create AI Test Scenarios

### Generate Multiple Test Scenarios

Create `scripts/generate-scenarios.js`:

```javascript
import { TestGenerator } from "../ai/index.js";
import fs from "fs";

const generator = new TestGenerator();

const featureDescription = `
E-commerce Shopping Cart Feature:
- User can add products to cart
- User can view cart summary
- User can update item quantities
- User can remove items from cart
- Cart persists across sessions
- Discounts are applied correctly
- Tax and shipping are calculated
- Checkout process works smoothly
`;

console.log("🎬 Generating test scenarios...\n");

const result = await generator.generateTestScenarios(featureDescription, 8);

if (result.success) {
  console.log(result.scenarios);
  
  // Save scenarios
  fs.writeFileSync(
    "testData/generated-scenarios.txt",
    result.scenarios
  );
  
  console.log("\n✅ Scenarios saved to testData/generated-scenarios.txt");
}
```

**Run it:**
```bash
node scripts/generate-scenarios.js
```

---

## 🎯 Method 8: Real-World Example - Login Test

### Before (Without AI)

```javascript
// tests/login.spec.js
import { test, expect } from "@playwright/test";

test("User can login", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[name="email"]', "user@example.com");
  await page.fill('input[name="password"]', "SecurePass123");
  await page.click("button[type=submit]");
  await expect(page).toHaveURL("/dashboard");
});
```

### After (With AI)

```javascript
// tests/login-with-ai.spec.js
import { test, expect } from "@playwright/test";
import { TestGenerator, TestFailureAnalyzer } from "../ai/index.js";

// Step 1: Generate test from requirement using AI
test.beforeAll(async () => {
  const generator = new TestGenerator();
  const requirement = `
    User Story: Secure Login
    - User enters email and password
    - Form validates input
    - Valid credentials grant access
    - Invalid credentials show error
    - Password is masked in input field
  `;
  
  const generated = await generator.generateTestFromRequirement(requirement);
  console.log("Generated test ideas:", generated.testCode);
});

// Step 2: Enhanced test with AI improvements
test("User can login with AI enhancements", async ({ page, browserName }) => {
  const analyzer = new TestFailureAnalyzer();
  
  try {
    await page.goto("/login");
    await page.fill('input[data-testid="email"]', "user@example.com");
    await page.fill('input[data-testid="password"]', "SecurePass123");
    await page.click('button[data-testid="submit"]');
    
    // AI-recommended: explicit wait instead of generic toHaveURL
    await page.waitForURL("/dashboard", { waitUntil: "networkidle" });
    await expect(page).toHaveTitle(/Dashboard/i);
    
  } catch (error) {
    // Analyze failure with AI
    const analysis = await analyzer.analyzeFailure(
      "User can login",
      error.message,
      "Login test code here",
      `Browser: ${browserName}`
    );
    
    console.error("\n🤖 AI Analysis:");
    console.error(analysis.analysis);
    throw error;
  }
});

// Step 3: Generate edge cases with AI
test("Login with edge cases (AI-generated)", async ({ page }) => {
  const generator = new TestGenerator();
  
  const edgeCases = await generator.generateEdgeCases(
    "User login with password reset flow"
  );
  
  console.log("Edge cases to test:");
  console.log(edgeCases.edgeCases);
  
  // Empty password
  await page.goto("/login");
  await page.fill('input[data-testid="email"]', "user@example.com");
  await page.click('button[data-testid="submit"]');
  await expect(page.locator(".error")).toContainText("Password required");
});
```

**Run it:**
```bash
npx playwright test tests/login-with-ai.spec.js --headed
```

---

## 🚀 Full Workflow Example

### Complete AI-Powered Testing Flow

```bash
# 1. Run interactive setup to verify everything works
npm run ai:quickstart

# 2. Run AI examples to understand capabilities
npm run ai:analyze-failures
npm run ai:generate-tests

# 3. Create your first AI-enhanced test
# (Copy examples from this guide)

# 4. Run your test with AI analysis
npx playwright test tests/ai-generated.spec.js

# 5. View Playwright HTML reports
npx playwright show-report

# 6. Analyze failures with batch AI analysis
node scripts/analyze-all-failures.js

# 7. Generate test scenarios for a new feature
node scripts/generate-scenarios.js
```

---

## 📝 Environment Setup

Before running AI scripts, ensure `.env` is configured:

```bash
# 1. Copy example file
cp .env.example .env

# 2. Add your Anthropic API Key
# Get from: https://console.anthropic.com
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# 3. Verify setup
npm run ai:quickstart
```

---

## 🐛 Troubleshooting

### Error: "ANTHROPIC_API_KEY not found"

```bash
# Windows PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-xxxxx"

# Windows CMD
set ANTHROPIC_API_KEY=sk-ant-xxxxx

# Or add to .env file
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

### Error: "API Rate Limited"

```bash
# Wait a bit before trying again
# Or add delays between batch requests
# Edit the script to add: await new Promise(resolve => setTimeout(resolve, 1000));
```

### Error: "Module not found"

```bash
# Reinstall dependencies
npm install
```

---

## 📚 Command Reference

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run ai:quickstart` | Interactive setup guide | Menu system in terminal |
| `npm run ai:analyze-failures` | Run failure analysis examples | AI analysis of 3 sample failures |
| `npm run ai:generate-tests` | Run test generation examples | Generated test code samples |
| `npx playwright test tests/ai-*.spec.js` | Run your custom AI tests | Playwright HTML report |
| `node scripts/analyze-all-failures.js` | Batch analyze real failures | JSON report with AI insights |
| `node scripts/generate-scenarios.js` | Generate test scenarios | Scenarios saved to file |

---

## 🎯 Next Steps

1. **Try examples first**: `npm run ai:generate-tests`
2. **Understand AI capabilities**: Read `ai/README.md`
3. **Create your test file**: Use examples from this guide
4. **Run with Playwright**: `npx playwright test tests/your-file.spec.js`
5. **Analyze failures**: Use AI analysis to improve tests
6. **Generate new tests**: Use AI to create tests from requirements

---

**Ready to use AI in your tests? Start with:**

```bash
npm run ai:quickstart
```

Happy Testing! 🚀
