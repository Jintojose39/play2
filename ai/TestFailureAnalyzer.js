import AIClient from "./AIClient.js";

class TestFailureAnalyzer {
  constructor(apiKey = null) {
    this.aiClient = new AIClient(apiKey);
  }

  async analyzeFailure(testName, errorMessage, testCode, additionalContext = null) {
    const systemPrompt = `You are an expert QA engineer and test automation specialist. 
When analyzing test failures, provide:
1. Root cause analysis
2. Why the test failed
3. Whether it's a flaky test issue, bug in application, or test code issue
4. Specific recommendations to fix the test
5. Whether this is a known pattern
Keep the response concise but actionable.`;

    const context = `
Test Name: ${testName}
Error Message:
${errorMessage}

Test Code:
${testCode}
${additionalContext ? "\nAdditional Context:\n" + additionalContext : ""}
    `;

    const prompt =
      "Analyze this test failure and provide root cause analysis with recommendations.";

    try {
      const analysis = await this.aiClient.analyzeWithContext(
        prompt,
        context,
        systemPrompt
      );
      return {
        success: true,
        testName,
        analysis,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        testName,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async analyzeBatchFailures(failures) {
    const results = [];
    for (const failure of failures) {
      const result = await this.analyzeFailure(
        failure.testName,
        failure.errorMessage,
        failure.testCode,
        failure.context
      );
      results.push(result);
      // Add small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return results;
  }

  async suggestFixes(analysisResults) {
    const failuresSummary = analysisResults
      .filter((r) => r.success)
      .map(
        (r) =>
          `Test: ${r.testName}\nAnalysis: ${r.analysis}\n---`
      )
      .join("\n");

    const systemPrompt = `You are an expert QA automation engineer. 
Based on the test failure analyses, provide:
1. Common patterns in the failures
2. Priority areas to fix first
3. Systemic issues in the test suite
4. Overall recommendations for test stability`;

    const prompt =
      "Based on these test failure analyses, what are the common issues and recommended fixes?";

    try {
      const suggestions = await this.aiClient.analyzeWithContext(
        prompt,
        failuresSummary,
        systemPrompt
      );
      return {
        success: true,
        suggestions,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async identifyFlakiness(testName, executionHistory) {
    const systemPrompt = `You are a test reliability expert. 
Analyze the execution history and determine:
1. Is this test flaky?
2. Success rate percentage
3. Root causes of flakiness
4. Recommendations to stabilize
5. Suggested timeout or retry adjustments`;

    const context = `Test: ${testName}\nExecution History:\n${JSON.stringify(executionHistory, null, 2)}`;
    const prompt = "Analyze this test's execution history and determine flakiness patterns.";

    try {
      const analysis = await this.aiClient.analyzeWithContext(
        prompt,
        context,
        systemPrompt
      );
      return {
        success: true,
        testName,
        flakiessAnalysis: analysis,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        testName,
        error: error.message,
      };
    }
  }
}

export default TestFailureAnalyzer;
