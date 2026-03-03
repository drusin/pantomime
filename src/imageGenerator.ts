import { GoogleGenAI } from "@google/genai";

function getFullPrompt(topic: string) {
  return `${topic}. Flat vector illustration for a children's card game. Large expressive eyes, simplified shapes, soft textured digital art style. Vibrant pastel colors, grainy paper texture, clean minimalist background. High contrast, playful and friendly atmosphere. No text, no symbols, no watermarks. --ar 1:1`;
}

export async function generate(topic: string, apiKey: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: apiKey });
  const prompt = getFullPrompt(topic);
  const response = await ai.models.generateContent({ model: "gemini-2.5-flash-image", contents: prompt, });
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.text) {
      console.log(part.text);
    }
    else if (part.inlineData) {
      const base64Data = part.inlineData.data;
      const mimeType = part.inlineData.mimeType;
      return `data:${mimeType};base64,${base64Data}`;
    }
  }
  return '';
}
