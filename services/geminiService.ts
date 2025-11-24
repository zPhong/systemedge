import { GoogleGenAI } from "@google/genai";
import { Trade, Nudge } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash';

export const analyzeTradeBatch = async (trades: Trade[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Demo Mode: API Key missing. Showing simulated analysis.";
  }

  try {
    const tradeSummary = trades.slice(0, 5).map(t => 
      `${t.side} ${t.symbol} at ${t.entryTime}. PnL: ${t.pnl}. Context: ${t.session}/${t.volatility}`
    ).join('\n');

    const prompt = `
      You are an expert trading coach named SystemEdge AI.
      Analyze these recent trades:
      ${tradeSummary}

      Provide a 2-sentence summary of the trader's performance focusing on session timing and volatility management.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Analysis temporarily unavailable.";
  }
};

export const generateNudge = async (context: string): Promise<Nudge> => {
  // Simulate an async call or real call based on key availability
  if (!process.env.API_KEY) {
     return {
        id: Math.random().toString(),
        type: 'Behavioral',
        title: 'High Volatility Warning',
        message: 'Your win rate drops by 15% during "Extreme" volatility events like CPI.',
        confidence: 0.88,
        isNew: true
     };
  }

  try {
    const prompt = `
      Context: ${context}
      Generate a short trading "Nudge" (insight) for a trader. 
      Return ONLY the raw JSON object with fields: title, message (short), confidence (0.0-1.0 float).
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const data = JSON.parse(response.text || '{}');
    return {
      id: Math.random().toString(),
      type: 'Pattern',
      title: data.title || "Pattern Detected",
      message: data.message || "Review your recent entries.",
      confidence: data.confidence || 0.75,
      isNew: true
    };

  } catch (e) {
    return {
        id: Math.random().toString(),
        type: 'Behavioral',
        title: 'System Insight',
        message: 'Consider tightening stops during London Open.',
        confidence: 0.85,
        isNew: true
     };
  }
};
