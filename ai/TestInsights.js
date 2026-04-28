import AIClient from "./AIClient.js";

class TestGenerator {
  constructor(apiKey = null) {
    this.aiClient = new AIClient(apiKey);
  }

  async generateTestFromRequirement(requirement, testingFramework = "playwright") {
    const systemPrompt = `You are an expert test automation engineer specializing in ${testingFramework}.
You write comprehensive, production-ready test cases.
Follow best practices:
1. Clear descriptive test names
2. Proper setup and teardown
3. Use Page Object Model when appropriate
4. Include assertions
5. Handle waits properly
6. Use data-driven testing where applicable
Generate ONLY valid ${testingFramework} code.`;

    const prompt = `Generate a ${testingFramework} test case for the following requirement:\n\n${requirement}\n\nReturn ONLY the test code without explanation.`;

    try {
      const testCode = await this.aiClient.analyzeText(prompt, systemPrompt);
      return {
        success: true,
        testCode,
        framework: testingFramework,
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

  async enhanceExistingTest(testCode, improvements = []) {
    const systemPrompt = `You are an expert test automation engineer.
Enhance the provided test code with best practices:
- Better locators and waits
- Improved error handling
- Better assertions
- Code clarity and maintainability
Return ONLY the enhanced test code without explanation.`;

    const improveList =
      improvements.length > 0
        ? `\nFocus on these improvements: ${improvements.join(", ")}`
        : "";

    const prompt = `Enhance this test code:${improveList}\n\n${testCode}\n\nReturn ONLY the enhanced code.`;

    try {
      const enhancedCode = await this.aiClient.analyzeText(prompt, systemPrompt);
      return {
        success: true,
        originalCode: testCode,
        enhancedCode,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        originalCode: testCode,
      };
    }
  }

  async generatePageObjectModel(pageDescription, elementList) {
    const systemPrompt = `You are an expert in Page Object Model design patterns.
Generate a complete, production-ready POM class in JavaScript (ES6 modules).
Follow best practices:
1. Clear method naming
2. Proper encapsulation
3. Reusable selectors
4. Helper methods
Return ONLY valid JavaScript code without explanation.`;

    const elementsContext = Array.isArray(elementList)
      ? elementList.map((e) => `- ${e.name}: ${e.selector}`).join("\n")
      : elementList;

    const prompt = `Generate a Page Object Model for: ${pageDescription}
Elements to include:
${elementsContext}

Return ONLY the ES6 module code.`;

    try {
      const pomCode = await this.aiClient.analyzeText(prompt, systemPrompt);
      return {
        success: true,
        pomCode,
        pageDescription,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        pageDescription,
      };
    }
  }

  async generateTestScenarios(featureDescription, count = 5) {
    const systemPrompt = `You are a QA test strategist.
Generate comprehensive, realistic test scenarios based on the feature description.
Each scenario should:
1. Have a clear objective
2. Include preconditions
3. List steps
4. Specify expected results
5. Be independent and atomic`;

    const prompt = `Generate ${count} test scenarios for:\n${featureDescription}\n\nFormat each scenario clearly with: Name, Preconditions, Steps, Expected Results.`;

    try {
      const scenarios = await this.aiClient.analyzeText(prompt, systemPrompt);
      return {
        success: true,
        scenarios,
        featureDescription,
        count,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        featureDescription,
      };
    }
  }

  async generateEdgeCases(testScenario) {
    const systemPrompt = `You are an expert in identifying edge cases and corner scenarios.
Generate comprehensive edge cases and boundary conditions.
Focus on:
1. Boundary values
2. Negative scenarios
3. Error conditions
4. Concurrency issues
5. Performance boundaries`;

    const prompt = `Identify important edge cases and boundary conditions for:\n${testScenario}\n\nList at least 5 edge cases with descriptions and how to test them.`;

    try {
      const edgeCases = await this.aiClient.analyzeText(prompt, systemPrompt);
      return {
        success: true,
        edgeCases,
        originalScenario: testScenario,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        originalScenario: testScenario,
      };
    }
  }
}

export default TestGenerator;
