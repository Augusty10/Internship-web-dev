
import { GoogleGenAI, Type } from "@google/genai";
import { Habit } from "../types";

export const getAIHabitCoaching = async (habits: Habit[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const habitSummary = habits.map(h => ({
    name: h.name,
    category: h.category,
    completions: h.completions.length,
    history: h.completions.slice(-5)
  }));

  const prompt = `Analyze my habit data and provide a concise, motivational coaching insight. 
  Habits: ${JSON.stringify(habitSummary)}
  
  Focus on:
  1. Identifying the strongest habit.
  2. Suggesting one improvement.
  3. A personalized motivational quote.
  Keep it under 100 words. Respond in JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: "Analysis of performance" },
            suggestion: { type: Type.STRING, description: "One practical tip" },
            motivation: { type: Type.STRING, description: "Personalized quote" }
          },
          required: ["analysis", "suggestion", "motivation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      analysis: "Keep pushing forward! Your consistency is the key to success.",
      suggestion: "Try scheduling your hardest habit for first thing in the morning.",
      motivation: "The secret of your future is hidden in your daily routine."
    };
  }
};
