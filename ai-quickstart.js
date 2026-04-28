#!/usr/bin/env node

/**
 * Quick Start Guide for AI Integration (Gemini Version)
 */

import * as readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (q) => new Promise((resolve) => rl.question(q, resolve));

async function showMenu() {
  console.clear();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║       AI Integration for Test Automation Framework         ║");
  console.log("║                 (Powered by Gemini API)                    ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log("Select an option:\n");
  console.log("1. 📖 View Installation Instructions");
  console.log("2. 🔍 Learn about Test Failure Analysis");
  console.log("3. 🎯 Learn about Test Generation");
  console.log("4. 💡 View Common Use Cases");
  console.log("5. 🚀 Run Examples");
  console.log("6. ❌ Exit\n");

  const choice = await question("Enter your choice (1-6): ");
  return choice.trim();
}

function showInstallation() {
  console.clear();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                    Installation Steps                      ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log("Step 1: Get API Key");
  console.log("--------");
  console.log("1. Go to https://aistudio.google.com/");
  console.log("2. Sign in with your Google account");
  console.log("3. Click 'Get API Key'");
  console.log("4. Create and copy the API key\n");

  console.log("Step 2: Set Environment Variable");
  console.log("--------");
  console.log("Option A - Create .env file:");
  console.log("  GEMINI_API_KEY=AIzaSy-xxxxx\n");

  console.log("Option B - Windows PowerShell:");
  console.log("  $env:GEMINI_API_KEY = 'AIzaSy-xxxxx'\n");

  console.log("Option C - Windows CMD:");
  console.log("  set GEMINI_API_KEY=AIzaSy-xxxxx\n");

  console.log("Step 3: Install Dependencies");
  console.log("--------");
  console.log("  npm install\n");

  console.log("Step 4: Verify Setup");
  console.log("--------");
  console.log("  node examples/exampleTestFailureAnalysis.js\n");
}

function showFailureAnalysis() {
  console.clear();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║           Test Failure Analysis with AI                    ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log("📊 What It Does:");
  console.log("--------");
  console.log("Analyzes test failures to understand:");
  console.log("  • Root causes of failures");
  console.log("  • Whether issue is in test code or application");
  console.log("  • Flaky test patterns");
  console.log("  • Specific recommendations to fix\n");

  console.log("🧪 Try It:");
  console.log("--------");
  console.log("  node examples/exampleTestFailureAnalysis.js\n");
}

function showTestGeneration() {
  console.clear();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║             Test Generation with AI                        ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log("🎯 What It Does:");
  console.log("--------");
  console.log("Generates test code from:");
  console.log("  • User story requirements");
  console.log("  • Feature descriptions");
  console.log("  • Existing test patterns\n");

  console.log("🧪 Try It:");
  console.log("--------");
  console.log("  node examples/exampleTestGeneration.js\n");
}

function showUseCases() {
  console.clear();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║              Common Use Cases & Examples                   ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log("📌 Use Case 1: Analyze CI/CD Failures");
  console.log("📌 Use Case 2: Generate Tests from Requirements");
  console.log("📌 Use Case 3: Detect Flaky Tests");
  console.log("📌 Use Case 4: Enhance Test Coverage");
  console.log("📌 Use Case 5: Create Page Object Models");
  console.log("📌 Use Case 6: Improve Existing Tests\n");
}

async function runExamples() {
  console.clear();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                     Run Examples                           ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  // 🔥 Check API Key
  if (!process.env.GEMINI_API_KEY) {
    console.log("⚠️ GEMINI_API_KEY not found!");
    console.log("Please set it in .env before running examples.\n");
    return;
  }

  console.log("Available Examples:\n");
  console.log("1. Test Failure Analysis");
  console.log("   node examples/exampleTestFailureAnalysis.js\n");

  console.log("2. Test Generation");
  console.log("   node examples/exampleTestGeneration.js\n");

  const proceed = await question("Would you like to run an example? (y/n): ");
  if (proceed.toLowerCase() !== "y") return;

  const example = await question("Enter 1 or 2: ");

  if (example === "1") {
    console.log("\n🚀 Run this command:");
    console.log("node examples/exampleTestFailureAnalysis.js\n");
  } else if (example === "2") {
    console.log("\n🚀 Run this command:");
    console.log("node examples/exampleTestGeneration.js\n");
  }
}

async function main() {
  let running = true;

  while (running) {
    const choice = await showMenu();

    switch (choice) {
      case "1":
        showInstallation();
        break;
      case "2":
        showFailureAnalysis();
        break;
      case "3":
        showTestGeneration();
        break;
      case "4":
        showUseCases();
        break;
      case "5":
        await runExamples();
        break;
      case "6":
        running = false;
        console.log("\n👋 Thanks for using AI Integration!\n");
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }

    if (running) {
      await question("Press Enter to continue...");
    }
  }

  rl.close();
}

main().catch(console.error);