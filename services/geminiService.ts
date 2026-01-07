
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartServiceSuggestions = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sugira melhorias profissionais e detalhadas em português para esta descrição de solicitação de serviço e estime um preço justo em Reais (BRL): "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedDescription: { type: Type.STRING },
            suggestedPrice: { type: Type.NUMBER },
            complexity: { type: Type.STRING },
          },
          required: ["improvedDescription", "suggestedPrice", "complexity"],
        },
      },
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
