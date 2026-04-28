import TestGenerator from "../ai/TestInsights.js";

/**
 * Example: Generating Tests with AI
 *
 * This example demonstrates how to use AI to:
 * - Generate tests from requirements
 * - Enhance existing tests
 * - Create Page Object Models
 * - Generate test scenarios
 * - Identify edge cases
 */

async function exampleGenerateTestFromRequirement() {
  const generator = new TestGenerator();

  const requirement = `
User Story: User Login
As a user, I want to log in to the application with my credentials
So that I can access my account

Acceptance Criteria:
1. User can enter username and password
2. User can click login button
3. Valid credentials allow access to dashboard
4. Invalid credentials show error message
5. Password should be masked
  `;

  console.log("🎯 Generating test from requirement...\n");
  console.log("Requirement:", requirement);
  console.log("\n" + "-".repeat(80) + "\n");

  try {
    const result = await generator.generateTestFromRequirement(requirement);

    if (result.success) {
      console.log("✅ Generated Test Code:\n");
      console.log(result.testCode);
    } else {
      console.log("❌ Error:", result.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function exampleEnhanceExistingTest() {
  const generator = new TestGenerator();

  const existingTest = `
test('Login', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.fill('#user', 'john@example.com');
  await page.fill('#pass', 'password123');
  await page.click('#btn');
  const title = await page.textContent('.dashboard-title');
  console.log(title);
});
  `;

  const improvements = [
    "Better wait conditions",
    "Use data-driven approach",
    "Add proper assertions",
    "Improve selectors",
  ];

  console.log("🎨 Enhancing existing test...\n");
  console.log("Original Test:", existingTest);
  console.log("Improvements sought:", improvements.join(", "));
  console.log("\n" + "-".repeat(80) + "\n");

  try {
    const result = await generator.enhanceExistingTest(
      existingTest,
      improvements
    );

    if (result.success) {
      console.log("✅ Enhanced Test Code:\n");
      console.log(result.enhancedCode);
    } else {
      console.log("❌ Error:", result.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function exampleGeneratePageObjectModel() {
  const generator = new TestGenerator();

  const pageDescription = "E-commerce Product Details Page";
  const elements = [
    { name: "productTitle", selector: 'h1[data-testid="product-title"]' },
    { name: "productPrice", selector: 'span[data-testid="price"]' },
    {
      name: "addToCartButton",
      selector: 'button[data-testid="add-to-cart"]',
    },
    { name: "quantityInput", selector: 'input[data-testid="quantity"]' },
    { name: "ratingStars", selector: 'div[data-testid="rating"]' },
    { name: "reviewsSection", selector: 'section[data-testid="reviews"]' },
  ];

  console.log("🏗️  Generating Page Object Model...\n");
  console.log("Page:", pageDescription);
  console.log("Elements:", elements.map((e) => e.name).join(", "));
  console.log("\n" + "-".repeat(80) + "\n");

  try {
    const result = await generator.generatePageObjectModel(
      pageDescription,
      elements
    );

    if (result.success) {
      console.log("✅ Generated POM:\n");
      console.log(result.pomCode);
    } else {
      console.log("❌ Error:", result.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function exampleGenerateTestScenarios() {
  const generator = new TestGenerator();

  const featureDescription = `
Feature: Shopping Cart
Users should be able to add products to cart, view cart, update quantities, 
remove items, and proceed to checkout. The cart should persist across browser 
sessions for logged-in users. Prices should be calculated correctly with tax and shipping.
  `;

  console.log("🎬 Generating test scenarios...\n");
  console.log("Feature:", featureDescription);
  console.log("\n" + "-".repeat(80) + "\n");

  try {
    const result = await generator.generateTestScenarios(featureDescription, 6);

    if (result.success) {
      console.log("✅ Generated Test Scenarios:\n");
      console.log(result.scenarios);
    } else {
      console.log("❌ Error:", result.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function exampleGenerateEdgeCases() {
  const generator = new TestGenerator();

  const testScenario = `
Test: User can update product quantity in cart
Steps:
1. Add product to cart with quantity 1
2. Open shopping cart
3. Change quantity to 5
4. Verify total price is updated
5. Verify inventory check
  `;

  console.log("🔍 Generating edge cases...\n");
  console.log("Scenario:", testScenario);
  console.log("\n" + "-".repeat(80) + "\n");

  try {
    const result = await generator.generateEdgeCases(testScenario);

    if (result.success) {
      console.log("✅ Identified Edge Cases:\n");
      console.log(result.edgeCases);
    } else {
      console.log("❌ Error:", result.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run examples
console.log("🚀 AI Test Generation Examples\n");
console.log("=".repeat(80) + "\n");

console.log("Example 1: Generate Test from Requirement");
console.log("-".repeat(80));
await exampleGenerateTestFromRequirement();

console.log("\n\nExample 2: Enhance Existing Test");
console.log("-".repeat(80));
await exampleEnhanceExistingTest();

console.log("\n\nExample 3: Generate Page Object Model");
console.log("-".repeat(80));
await exampleGeneratePageObjectModel();

console.log("\n\nExample 4: Generate Test Scenarios");
console.log("-".repeat(80));
await exampleGenerateTestScenarios();

console.log("\n\nExample 5: Generate Edge Cases");
console.log("-".repeat(80));
await exampleGenerateEdgeCases();
