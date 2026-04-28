import TestFailureAnalyzer from "./TestFailureAnalyzer.js";
import fs from "fs";
import path from "path";

class PlaywrightAIIntegration {
  constructor(apiKey = null) {
    this.analyzer = new TestFailureAnalyzer(apiKey);
    this.failureLog = [];
  }

  /**
   * Wrap a test to automatically analyze failures with AI
   */
  getAITestWrapper() {
    return async (testFunction, testName, testCode) => {
      try {
        await testFunction();
      } catch (error) {
        // Log failure
        const failure = {
          testName,
          errorMessage: error.message,
          testCode,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        };
        this.failureLog.push(failure);

        // Analyze with AI (non-blocking)
        this.analyzer
          .analyzeFailure(testName, error.message, testCode)
          .then((analysis) => {
            console.log(`\n✨ AI Analysis for ${testName}:`);
            console.log(analysis.analysis);
            this.saveAnalysis(analysis);
          })
          .catch((err) => console.error("Failed to analyze:", err));

        throw error; // Re-throw to fail the test
      }
    };
  }

  /**
   * Create a test reporter that uses AI for insights
   */
  async generateAIReport(failures) {
    if (failures.length === 0) {
      return { success: true, message: "All tests passed!", failures: [] };
    }

    console.log(
      `\n📊 Analyzing ${failures.length} test failures with AI...\n`
    );

    const analyses = await this.analyzer.analyzeBatchFailures(failures);
    const suggestions = await this.analyzer.suggestFixes(analyses);

    return {
      success: false,
      failureCount: failures.length,
      analyses,
      suggestions: suggestions.suggestions,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Save AI analysis to file
   */
  saveAnalysis(analysis) {
    const reportDir = path.join(process.cwd(), "reports", "ai-analysis");

    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const filename = path.join(
      reportDir,
      `${analysis.testName}-${Date.now()}.json`
    );
    fs.writeFileSync(filename, JSON.stringify(analysis, null, 2));
  }

  /**
   * Save all analyses
   */
  saveAllAnalyses(report) {
    const reportDir = path.join(process.cwd(), "reports", "ai-analysis");

    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const filename = path.join(reportDir, `ai-report-${Date.now()}.json`);
    fs.writeFileSync(filename, JSON.stringify(report, null, 2));
    console.log(`\n✅ AI Report saved to: ${filename}`);
  }
}

export default PlaywrightAIIntegration;
