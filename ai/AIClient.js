import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

class AIClient {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not found");
    }

    this.ai = new GoogleGenAI({ apiKey });
  }

  async analyzeText(prompt) {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  }

  async analyzeWithContext(prompt, context) {
    const fullPrompt = `
Context:
${context}

User Request:
${prompt}
    `;
    return this.analyzeText(fullPrompt);
  }
}

export default AIClient;