# AI Integration for Test Automation Framework

This framework now includes AI-powered capabilities using Claude API (Anthropic) for intelligent test failure analysis, test generation, and test insights.

## 📋 Features

### 1. **Test Failure Analysis**
- Analyze test failures with AI to understand root causes
- Get actionable recommendations for fixing tests
- Identify flaky tests and patterns
- Batch analyze multiple failures
- Receive suggestions for test suite improvements

### 2. **Test Generation**
- Generate complete test cases from requirements
- Enhance existing tests with best practices
- Create Page Object Models (POM) automatically
- Generate comprehensive test scenarios
- Identify edge cases and boundary conditions

### 3. **Test Insights**
- Understand test reliability patterns
- Get recommendations for improving test stability
- Identify common failure patterns
- Receive suggestions for test coverage improvements

## 🚀 Getting Started

### Prerequisites

1. **Anthropic API Key** - Get one from [console.anthropic.com](https://console.anthropic.com)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variable:
```bash
# Create .env file in project root
ANTHROPIC_API_KEY=your_api_key_here
```

Or set it in your system environment:
```powershell
# Windows PowerShell
$env:ANTHROPIC_API_KEY = "your_api_key_here"
```

## 📚 API Reference

### AIClient

Base client for interacting with Claude API.

```javascript
import { AIClient } from './ai/index.js';

const client = new AIClient();
const response = await client.analyzeText(prompt, systemPrompt);
```

**Methods:**
- `analyzeText(prompt, systemPrompt)` - Analyze text with AI
- `analyzeWithContext(prompt, context, systemPrompt)` - Analyze with additional context

---

### TestFailureAnalyzer

Analyze test failures and get recommendations.

```javascript
import { TestFailureAnalyzer } from './ai/index.js';

const analyzer = new TestFailureAnalyzer();

// Single failure analysis
const analysis = await analyzer.analyzeFailure(
  testName,
  errorMessage,
  testCode,
  additionalContext
);

// Batch analysis
const results = await analyzer.analyzeBatchFailures(failures);

// Get cross-cutting recommendations
const suggestions = await analyzer.suggestFixes(analysisResults);

// Detect flakiness
const flakiness = await analyzer.identifyFlakiness(testName, executionHistory);
```

**Example:**
```javascript
const failure = {
  testName: 'Login Test',
  errorMessage: 'Timeout: waiting for selector .error-message',
  testCode: `await expect(page.locator('.error-message')).toBeVisible();`,
  context: 'CI/CD environment'
};

const result = await analyzer.analyzeFailure(
  failure.testName,
  failure.errorMessage,
  failure.testCode,
  failure.context
);

console.log(result.analysis); // AI-generated analysis and recommendations
```

---

### TestGenerator

Generate and enhance test cases.

```javascript
import { TestGenerator } from './ai/index.js';

const generator = new TestGenerator();

// Generate from requirement
const test = await generator.generateTestFromRequirement(requirement);

// Enhance existing test
const enhanced = await generator.enhanceExistingTest(testCode, improvements);

// Generate POM
const pom = await generator.generatePageObjectModel(pageDesc, elements);

// Generate scenarios
const scenarios = await generator.generateTestScenarios(featureDesc, count);

// Identify edge cases
const edgeCases = await generator.generateEdgeCases(scenario);
```

**Example:**
```javascript
const requirement = `
User Story: Product Search
As a shopper, I want to search for products by keyword
So that I can find items I'm looking for
`;

const result = await generator.generateTestFromRequirement(requirement);
console.log(result.testCode); // AI-generated test code
```

---

### PlaywrightAIIntegration

Integrate AI failure analysis with Playwright tests.

```javascript
import { PlaywrightAIIntegration } from './ai/index.js';

const integration = new PlaywrightAIIntegration();

// Generate AI-powered test report
const report = await integration.generateAIReport(failures);
```

## 📖 Usage Examples

### Example 1: Analyze Test Failures

```javascript
import { TestFailureAnalyzer } from './ai/index.js';

async function analyzeMyTestFailures() {
  const analyzer = new TestFailureAnalyzer();

  const failures = [
    {
      testName: 'Login Test',
      errorMessage: 'Element not found: #error-message',
      testCode: 'await expect(page.locator("#error-message")).toBeVisible();',
      context: 'Chrome 120'
    },
    // ... more failures
  ];

  const results = await analyzer.analyzeBatchFailures(failures);
  const suggestions = await analyzer.suggestFixes(results);

  console.log('📊 Failure Analysis:');
  results.forEach(r => {
    console.log(`\n${r.testName}:`);
    console.log(r.analysis);
  });

  console.log('\n💡 Overall Recommendations:');
  console.log(suggestions.suggestions);
}

analyzeMyTestFailures();
```

**Run:** `node examples/exampleTestFailureAnalysis.js`

---

### Example 2: Generate Tests from Requirements

```javascript
import { TestGenerator } from './ai/index.js';

async function generateFromRequirement() {
  const generator = new TestGenerator();

  const requirement = `
Feature: User Registration
Users can register with email, password, and name
- Email validation required
- Password minimum 8 characters
- Success redirects to login
- Duplicate email shows error
  `;

  const result = await generator.generateTestFromRequirement(requirement);
  console.log(result.testCode);
}

generateFromRequirement();
```

**Run:** `node examples/exampleTestGeneration.js`

---

### Example 3: Enhance Existing Tests

```javascript
import { TestGenerator } from './ai/index.js';

async function improveMyTest() {
  const generator = new TestGenerator();

  const existingTest = `
test('Add to cart', async ({ page }) => {
  await page.goto('https://shop.example.com/products/123');
  await page.click('#add-btn');
  await page.click('#confirm');
});
  `;

  const enhanced = await generator.enhanceExistingTest(existingTest, [
    'Better wait conditions',
    'Add assertions',
    'Improve error handling'
  ]);

  console.log(enhanced.enhancedCode);
}

improveMyTest();
```

---

### Example 4: Create Page Object Models

```javascript
import { TestGenerator } from './ai/index.js';

async function generatePOM() {
  const generator = new TestGenerator();

  const elements = [
    { name: 'headerTitle', selector: 'h1.header' },
    { name: 'searchInput', selector: 'input[data-testid="search"]' },
    { name: 'searchButton', selector: 'button[type="submit"]' },
    { name: 'resultsList', selector: 'ul.results' }
  ];

  const pom = await generator.generatePageObjectModel(
    'Search Results Page',
    elements
  );

  console.log(pom.pomCode);
}

generatePOM();
```

---

### Example 5: Detect Flaky Tests

```javascript
import { TestFailureAnalyzer } from './ai/index.js';

async function checkFlakiness() {
  const analyzer = new TestFailureAnalyzer();

  const executionHistory = [
    { run: 1, passed: true, duration: 2500 },
    { run: 2, passed: false, duration: 15000, error: 'Timeout' },
    { run: 3, passed: true, duration: 2300 },
    // ... more runs
  ];

  const result = await analyzer.identifyFlakiness(
    'Search Results Page',
    executionHistory
  );

  console.log(result.flakiessAnalysis);
}

checkFlakiness();
```

## 🔧 Integration with Existing Tests

### Option 1: Add AI Analysis to Playwright Config

```javascript
// playwright.config.js
import { PlaywrightAIIntegration } from './ai/index.js';

const aiIntegration = new PlaywrightAIIntegration();

export default {
  // ... other config
  reporter: [
    ['html'], // Standard HTML reporter
    // Custom AI reporter could be added here
  ]
};
```

### Option 2: Manually Analyze Failed Tests

```javascript
// In your test file
import { TestFailureAnalyzer } from './ai/index.js';

const analyzer = new TestFailureAnalyzer();

test('My API Test', async ({ request }) => {
  try {
    const response = await request.get('https://api.example.com/users');
    expect(response.status()).toBe(200);
  } catch (error) {
    // Analyze failure with AI
    await analyzer.analyzeFailure(
      'My API Test',
      error.message,
      'request.get(...)',
      'API endpoint'
    );
    throw error;
  }
});
```

## 📊 Output

### Failure Analysis Output

```
✅ Analysis Complete:

**Root Cause:** The test is waiting for an element that appears after 
JavaScript rendering. The selector ".error-message" is not in the initial 
HTML but is injected after form submission.

**Why It Failed:** Race condition between form submission and element 
appearance. The test checks for the element before the DOM updates.

**Issue Type:** Test Code Issue (not application bug)

**Recommendations:**
1. Add explicit wait for element: `await page.waitForSelector('.error-message')`
2. Use `waitForNavigation()` if page redirects after submission
3. Consider using network idle: `{ waitUntil: 'networkidle' }`
4. Implement better error handling with timeout configuration

**Pattern:** This is a common timing issue in Playwright. Similar to 
previously seen failures in async form handling.
```

### Test Generation Output

```
✅ Generated Test Code:

import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://example.com/login');
  
  // Fill login form
  await page.locator('input[data-testid="email"]')
    .fill('user@example.com');
  await page.locator('input[data-testid="password"]')
    .fill('SecurePassword123!');
  
  // Submit form
  await page.locator('button:has-text("Sign In")').click();
  
  // Assert navigation to dashboard
  await expect(page).toHaveURL('https://example.com/dashboard');
  
  // Verify dashboard elements
  await expect(page.locator('h1')).toContainText('Welcome');
});
```

## 🛡️ Best Practices

1. **Environment Variables**: Always use `.env` file for API keys, never commit them
2. **Rate Limiting**: Claude API has rate limits; use batch processing for multiple analyses
3. **Context Matters**: Provide relevant context (environment, browser, network conditions) for better analysis
4. **Test Code Quality**: Clean, readable test code leads to better AI suggestions
5. **Review AI Suggestions**: Always review AI-generated code and customize as needed
6. **Cost Awareness**: Monitor API usage as each analysis uses tokens

## 🔑 API Costs

Claude API costs depend on which model is used. Check [Anthropic pricing](https://www.anthropic.com/pricing) for current rates. Typical test analysis uses:
- Single failure analysis: ~1,000-2,000 tokens
- Batch analysis of 5-10 failures: ~5,000-10,000 tokens
- Test generation from requirement: ~2,000-3,000 tokens

## 🐛 Troubleshooting

### Issue: "ANTHROPIC_API_KEY not found"

**Solution:**
```bash
# Windows CMD
set ANTHROPIC_API_KEY=your_key_here

# Windows PowerShell
$env:ANTHROPIC_API_KEY = "your_key_here"

# Linux/Mac
export ANTHROPIC_API_KEY=your_key_here
```

### Issue: Rate Limit Errors

**Solution:**
- Add delays between batch requests
- Use smaller batches (max 5-10 at a time)
- Implement exponential backoff retry logic

### Issue: Poor Quality Analysis/Generation

**Solution:**
- Provide more context in the prompt
- Include error stack traces for better analysis
- Ensure test code is clean and well-structured
- Review and customize AI suggestions before using them

## 📝 Contributing

To enhance AI integration:
1. Improve prompts in `AIClient.js` system prompts
2. Add new analysis methods in `TestFailureAnalyzer.js`
3. Add new test generation templates in `TestGenerator.js`
4. Document use cases in examples/

## 📄 License

Part of the Play2 Test Automation Framework

## 💬 Support

For issues or questions:
1. Check the examples in `/examples` directory
2. Review error messages for specific guidance
3. Ensure API key is correct and has sufficient quota
4. Verify internet connection for API calls

---

**Happy Testing with AI! 🚀**
