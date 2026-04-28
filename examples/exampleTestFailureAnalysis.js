import TestFailureAnalyzer from "../ai/TestFailureAnalyzer.js";
import { exec } from "child_process";

/**
 * Example: Analyzing Test Failures with AI
 *
 * This example demonstrates how to use AI to analyze test failures
 * and get smart recommendations for fixing them.
 */

async function exampleAnalyzeSingleFailure() {
  const analyzer = new TestFailureAnalyzer();

  // Example failure data
  const testName = "Login with Invalid Credentials";
  const errorMessage =
    "AssertionError: expected element to contain text 'Incorrect username/password.' but it had no content";
  const testCode = `
test('Login with Invalid Credentials', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.locator('[data-testid="username"]').fill('wronguser');
  await page.locator('[data-testid="password"]').fill('wrongpass');
  await page.locator('#signInBtn').click();
  await expect(page.locator('[data-testid="error-msg"]')).toContainText('Incorrect username/password.');
});
  `;

  console.log("🔍 Analyzing test failure with AI...\n");

  try {
    const result = await analyzer.analyzeFailure(
      testName,
      errorMessage,
      testCode,
      "Environment: Production staging, Browser: Chrome"
    );

    if (result.success) {
      console.log("✅ Analysis Complete:\n");
      console.log(result.analysis);
      console.log("\n" + "=".repeat(80) + "\n");
    } else {
      console.log("❌ Analysis failed:", result.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function exampleAnalyzeBatchFailures() {
  const analyzer = new TestFailureAnalyzer();

  const failures = [
    {
      testName: "Login Test",
      errorMessage: "Timeout waiting for selector #error-message",
      testCode: 'await expect(page.locator("#error-message")).toBeVisible();',
      context: "Chrome 120",
    },
    {
      testName: "Payment Processing",
      errorMessage: 'Expected "Payment Success" but got "Server Error"',
      testCode:
        'expect(responseJson.status).toBe("success"); expect(responseJson.orderId).toBeTruthy();',
      context: "API Response timeout issue",
    },
    {
      testName: "Form Submission",
      errorMessage: "Element not clickable at point (100, 200)",
      testCode: 'await page.locator("button#submit").click();',
      context: "Modal not visible",
    },
  ];

  console.log("🔍 Analyzing batch of test failures...\n");

  try {
    const results = await analyzer.analyzeBatchFailures(failures);

    // Analyze results to get overall recommendations
    const suggestions = await analyzer.suggestFixes(results);

    console.log("📊 Failure Analysis Summary:\n");
    results.forEach((result) => {
      console.log(`\n--- ${result.testName} ---`);
      if (result.success) {
        console.log(result.analysis);
      } else {
        console.log(`Error: ${result.error}`);
      }
    });

    console.log("\n" + "=".repeat(80));
    console.log("💡 Overall Recommendations:\n");
    if (suggestions.success) {
      console.log(suggestions.suggestions);
    }
    console.log("=".repeat(80) + "\n");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function exampleDetectFlakiness() {
  const analyzer = new TestFailureAnalyzer();

  const executionHistory = [
    { run: 1, passed: true, duration: 2500 },
    { run: 2, passed: false, duration: 15000, error: "Timeout" },
    { run: 3, passed: true, duration: 2300 },
    { run: 4, passed: true, duration: 2600 },
    { run: 5, passed: false, duration: 12000, error: "Timeout" },
    { run: 6, passed: true, duration: 2400 },
    { run: 7, passed: true, duration: 2700 },
    { run: 8, passed: false, duration: 14000, error: "Timeout" },
    { run: 9, passed: true, duration: 2500 },
    { run: 10, passed: true, duration: 2450 },
  ];

  console.log("🔍 Analyzing test for flakiness...\n");

  try {
    const result = await analyzer.identifyFlakiness(
      "Search Results Page Load",
      executionHistory
    );

    if (result.success) {
      console.log("📈 Flakiness Analysis:\n");
      console.log(result.flakiessAnalysis);
    } else {
      console.log("Error:", result.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run examples
console.log("🚀 AI Test Failure Analysis Examples\n");
console.log("=".repeat(80) + "\n");

console.log("Example 1: Single Failure Analysis");
console.log("-".repeat(80));
await exampleAnalyzeSingleFailure();

console.log("\nExample 2: Batch Failure Analysis");
console.log("-".repeat(80));
await exampleAnalyzeBatchFailures();

console.log("\nExample 3: Flakiness Detection");
console.log("-".repeat(80));
await exampleDetectFlakiness();
