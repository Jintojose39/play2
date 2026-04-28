// tests/ai-starter-template.spec.js
// Copy this file to create your first AI-powered test

import { test, expect } from "@playwright/test";
import { TestFailureAnalyzer, TestGenerator } from "../ai/index.js";

// ============================================
// EXAMPLE 1: Basic Test with AI Analysis
// ============================================
test("Example 1: Login test with AI failure analysis", async ({ page }) => {
  const analyzer = new TestFailureAnalyzer();
  
  try {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('input[name="username"]').fill("rahulshettyacademy");
    await page.locator('input[name="password"]').fill("learning");
    await page.locator("#signInBtn").click();
    
    // Wait for redirect
    await page.waitForURL(/integrations/, { timeout: 5000 });
    await expect(page).toHaveTitle(/Rahul Shetty Academy/);
    
  } catch (error) {
    // AI analyzes the failure and provides insights
    const analysis = await analyzer.analyzeFailure(
      "Login test",
      error.message,
      'Login flow test - enter credentials and submit',
      'Chrome browser, staging environment'
    );
    
    console.error("\n🤖 AI ROOT CAUSE ANALYSIS:");
    console.error(analysis.analysis);
    throw error;
  }
});

// ============================================
// EXAMPLE 2: Generate Test from Requirements
// ============================================
test("Example 2: AI-generated test from requirement", async () => {
  const generator = new TestGenerator();
  
  // Define what you want to test
  const requirement = `
    User Story: Search Products
    - User can enter search term
    - Results load within 2 seconds
    - Results show product cards
    - User can filter by price
    - Results can be sorted by name
  `;
  
  // AI generates complete test code
  const result = await generator.generateTestFromRequirement(requirement);
  
  if (result.success) {
    console.log("\n✅ AI GENERATED TEST CODE:");
    console.log(result.testCode);
    
    // You can save this and use it in another test file
    console.log("\n💡 Tip: Copy the generated code and create a new test file");
  }
});

// ============================================
// EXAMPLE 3: Enhance Existing Test Code
// ============================================
test("Example 3: Enhance test with AI improvements", async () => {
  const generator = new TestGenerator();
  
  // Your existing test code
  const existingTest = `
    test('Add to cart', async ({ page }) => {
      await page.goto('/products');
      await page.click('#product-123');
      await page.fill('#quantity', '2');
      await page.click('#add-cart');
    });
  `;
  
  // AI improves it with best practices
  const result = await generator.enhanceExistingTest(
    existingTest,
    [
      'Better wait conditions',
      'Improved error handling',
      'Add assertions',
      'Use data-testid selectors'
    ]
  );
  
  if (result.success) {
    console.log("\n✅ AI ENHANCED TEST CODE:");
    console.log(result.enhancedCode);
  }
});

// ============================================
// EXAMPLE 4: Generate Page Object Model
// ============================================
test("Example 4: Generate Page Object Model with AI", async () => {
  const generator = new TestGenerator();
  
  // Define page elements
  const elements = [
    { name: 'emailInput', selector: 'input[data-testid="email"]' },
    { name: 'passwordInput', selector: 'input[data-testid="password"]' },
    { name: 'loginButton', selector: 'button[type="submit"]' },
    { name: 'errorMessage', selector: '.error-notification' },
    { name: 'rememberMe', selector: 'input[type="checkbox"]' }
  ];
  
  // AI generates complete POM class
  const result = await generator.generatePageObjectModel(
    'Login Page',
    elements
  );
  
  if (result.success) {
    console.log("\n✅ AI GENERATED PAGE OBJECT MODEL:");
    console.log(result.pomCode);
    console.log("\n💡 Tip: Save this as pages/LoginPage.js");
  }
});

// ============================================
// EXAMPLE 5: Generate Test Scenarios
// ============================================
test("Example 5: Generate test scenarios from feature", async () => {
  const generator = new TestGenerator();
  
  // Describe your feature
  const featureDescription = `
    E-commerce Checkout Flow:
    - User can add items to cart
    - User can view cart summary with totals
    - User can enter shipping address
    - User can select payment method
    - Order confirmation is displayed
    - Email confirmation is sent
  `;
  
  // AI generates comprehensive test scenarios
  const result = await generator.generateTestScenarios(
    featureDescription,
    6  // Generate 6 scenarios
  );
  
  if (result.success) {
    console.log("\n✅ AI GENERATED TEST SCENARIOS:");
    console.log(result.scenarios);
    console.log("\n💡 Now create test_X() for each scenario");
  }
});

// ============================================
// EXAMPLE 6: Generate Edge Cases
// ============================================
test("Example 6: Generate edge cases for testing", async () => {
  const generator = new TestGenerator();
  
  // Define the scenario
  const scenario = `
    Test: User Registration
    Steps:
    1. User enters email
    2. User enters password
    3. User confirms password
    4. User clicks Register
    5. Account created successfully
  `;
  
  // AI identifies important edge cases
  const result = await generator.generateEdgeCases(scenario);
  
  if (result.success) {
    console.log("\n✅ AI GENERATED EDGE CASES:");
    console.log(result.edgeCases);
    console.log("\n💡 These are important scenarios to test!");
  }
});

// ============================================
// EXAMPLE 7: Batch Failure Analysis
// ============================================
test("Example 7: Analyze multiple failures at once", async () => {
  const analyzer = new TestFailureAnalyzer();
  
  // Simulate multiple test failures
  const failures = [
    {
      testName: 'Login Test',
      errorMessage: 'Timeout: waiting for selector .dashboard',
      testCode: 'await expect(page.locator(".dashboard")).toBeVisible();',
      context: 'Chrome 120'
    },
    {
      testName: 'Payment Test',
      errorMessage: 'expected "Success" but got "Error"',
      testCode: 'await expect(page.locator(".status")).toContainText("Success");',
      context: 'Firefox, production environment'
    },
    {
      testName: 'Search Test',
      errorMessage: 'Element is not clickable (hidden by another element)',
      testCode: 'await page.locator("button#search").click();',
      context: 'Safari, mobile viewport'
    }
  ];
  
  // Batch analyze all failures
  console.log(`\n🔍 Analyzing ${failures.length} test failures...\n`);
  
  const analyses = await analyzer.analyzeBatchFailures(failures);
  
  // Get cross-cutting recommendations
  const suggestions = await analyzer.suggestFixes(analyses);
  
  // Print results
  console.log("📊 INDIVIDUAL FAILURE ANALYSES:");
  analyses.forEach((analysis, index) => {
    console.log(`\n${index + 1}. ${analysis.testName} ${analysis.success ? '✅' : '❌'}`);
    if (analysis.success) {
      console.log(analysis.analysis);
    }
  });
  
  console.log("\n💡 OVERALL RECOMMENDATIONS:");
  console.log(suggestions.suggestions);
});

// ============================================
// EXAMPLE 8: Detect Flaky Tests
// ============================================
test("Example 8: Analyze test flakiness", async () => {
  const analyzer = new TestFailureAnalyzer();
  
  // Execution history of a test (from previous runs)
  const executionHistory = [
    { run: 1, passed: true, duration: 2500 },
    { run: 2, passed: false, duration: 15000, error: 'Timeout' },
    { run: 3, passed: true, duration: 2200 },
    { run: 4, passed: true, duration: 2600 },
    { run: 5, passed: false, duration: 14500, error: 'Timeout' },
    { run: 6, passed: true, duration: 2300 },
    { run: 7, passed: true, duration: 2700 },
    { run: 8, passed: false, duration: 15000, error: 'Timeout' },
    { run: 9, passed: true, duration: 2400 },
    { run: 10, passed: true, duration: 2500 }
  ];
  
  // AI analyzes the pattern
  const result = await analyzer.identifyFlakiness(
    'Search Results Load',
    executionHistory
  );
  
  if (result.success) {
    console.log("\n📈 FLAKINESS ANALYSIS:");
    console.log(result.flakiessAnalysis);
    console.log("\n🎯 This test needs investigation!");
  }
});

// ============================================
// EXAMPLE 9: Real-World Usage
// ============================================
test("Example 9: Real checkout flow with AI enhancements", async ({ page }) => {
  const analyzer = new TestFailureAnalyzer();
  const generator = new TestGenerator();
  
  try {
    // Add product to cart
    await page.goto("https://example.com/products");
    await page.locator('[data-testid="product-1"]').click();
    
    // AI-recommended: explicit wait with proper condition
    await page.waitForSelector('[data-testid="add-to-cart"]', { 
      state: 'visible',
      timeout: 5000 
    });
    
    await page.locator('[data-testid="add-to-cart"]').click();
    await page.goto("/cart");
    
    // Verify cart
    const cartItems = await page.locator('[data-testid="cart-item"]').count();
    expect(cartItems).toBeGreaterThan(0);
    
    console.log("✅ Checkout flow successful");
    
  } catch (error) {
    // Get AI insights on what went wrong
    const analysis = await analyzer.analyzeFailure(
      "Checkout flow",
      error.message,
      "Add product and checkout flow",
      "Chrome browser"
    );
    
    console.error("\n🤖 AI Analysis:");
    console.error(analysis.analysis);
    
    // Generate improved test
    const improved = await generator.enhanceExistingTest(
      'checkout test',
      ['Better waits', 'Improved selectors', 'Better error handling']
    );
    
    console.log("\n✨ Improved test suggestion:");
    console.log(improved.enhancedCode);
    
    throw error;
  }
});

// ============================================
// SETUP & TEARDOWN WITH AI
// ============================================

test.beforeEach(async ({ page }) => {
  console.log("🚀 Test starting...");
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== "passed") {
    console.log(`\n⚠️ Test failed: ${testInfo.title}`);
    console.log(`📝 For AI analysis, error was: ${testInfo.error?.message}`);
  }
});

// ============================================
// TIPS & BEST PRACTICES
// ============================================

/*
1. BEFORE RUNNING:
   - Set ANTHROPIC_API_KEY environment variable
   - Run: npm install
   
2. RUN COMMANDS:
   - npm run ai:quickstart         (See all AI features)
   - npm run ai:analyze-failures   (See example analyses)
   - npm run ai:generate-tests     (See test generation)
   - npx playwright test tests/ai-starter-template.spec.js  (Run this file)
   
3. BEST PRACTICES:
   ✅ Always use data-testid selectors (AI recommends this)
   ✅ Add explicit waits, not hard sleeps
   ✅ Test one thing per test (AI enforces this)
   ✅ Use meaningful error messages (AI analyzes these)
   ✅ Keep tests independent (AI assumes this)
   ✅ Add context when analyzing failures (AI uses this)
   
4. NEXT STEPS:
   - Copy examples that match your needs
   - Create your own test files using these patterns
   - Run tests with: npx playwright test tests/your-file.spec.js
   - Analyze failures with AI when tests fail
   - Iterate and improve tests based on AI insights
   
5. COMMON PATTERNS:
   - Wrap in try-catch to analyze failures
   - Use ai/index.js to import AI classes
   - Always check result.success before using analysis
   - Add descriptive context for better AI insights
   - Save AI-generated code and customize for your needs
*/
