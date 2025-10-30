import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Only initialize if API key exists
// Using gemini-2.5-flash-lite (lite model) as it supports both text and vision capabilities
// This is Google's smaller, faster flash model variant
export const geminiModel = apiKey ? genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" }) : null;
export const geminiVisionModel = apiKey ? genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" }) : null;

export async function analyzeDisease(imagePart: { inlineData: { data: string; mimeType: string } }, diseaseResult: any) {
  if (!geminiVisionModel) {
    console.warn("Gemini API key not configured. Using fallback analysis.");
    return null; // Return null instead of throwing - caller will use fallback
  }
  
  try {
    const prompt = `You are an expert agricultural pathologist. Analyze this plant leaf image.
    
The ML model detected: ${diseaseResult.disease} with ${diseaseResult.confidence}% confidence.

Provide a comprehensive analysis including:
1. Disease confirmation and symptoms
2. Possible causes
3. Treatment recommendations (both organic and chemical)
4. Prevention measures
5. Expected recovery timeline

Be clear, actionable, and farmer-friendly in your language.`;

    const result = await geminiVisionModel.generateContent([prompt, imagePart]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Vision API error:", error);
    return null; // Return null on error - caller will use fallback
  }
}

export async function chatWithAI(message: string, context?: string) {
  if (!geminiModel) {
    console.warn("Gemini API key not configured. Chat feature unavailable.");
    return null;
  }
  
  try {
    const chat = geminiModel.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 2000,
      },
    });

    const prompt = context 
      ? `Context: ${context}\n\nUser question: ${message}\n\nProvide a helpful, accurate answer about agriculture, plant diseases, or farming practices. Use markdown formatting, including tables and lists where appropriate. If analyzing data, you can suggest charts and tables.`
      : `You are an expert agricultural advisor and plant pathologist. Answer this question with detailed, actionable advice: ${message}\n\nUse markdown formatting including:\n- **Bold** for emphasis\n- Tables for comparisons\n- Lists for steps\n- Math notation when needed using LaTeX (e.g., \\(x^2\\) for inline, \\[equation\\] for blocks)\n\nProvide comprehensive, farmer-friendly explanations.`;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
}

export async function* streamChatResponse(message: string, imageData?: string, context?: string) {
  if (!geminiModel) {
    console.warn("Gemini API key not configured. Streaming unavailable.");
    yield "I apologize, but the AI service is currently unavailable. Please check back later or contact support.";
    return;
  }

  const prompt = context 
    ? `Context: ${context}\n\nUser question: ${message}\n\nProvide a helpful, detailed answer about agriculture, plant diseases, or farming practices. Use markdown formatting, including tables, lists, and LaTeX math notation where appropriate.`
    : `You are an expert agricultural advisor and plant pathologist. Answer this question with detailed, actionable advice: ${message}\n\nUse markdown formatting including:\n- **Bold** for emphasis\n- Tables for data comparisons (use proper markdown table syntax)\n- Numbered/bulleted lists for steps and recommendations\n- LaTeX math notation when needed: \\(inline\\) or \\[block\\]\n- Code blocks for formulas or calculations\n\nProvide comprehensive, in-depth, farmer-friendly explanations with scientific accuracy.`;

  try {
    let result;
    if (imageData) {
      // Handle image + text
      const base64Data = imageData.includes(',') ? imageData.split(',')[1] : imageData;
      const mimeType = imageData.includes(',') ? imageData.split(';')[0].split(':')[1] : 'image/jpeg';
      
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      };

      result = await geminiVisionModel!.generateContentStream([prompt, imagePart]);
    } else {
      // Text only
      result = await geminiModel.generateContentStream(prompt);
    }

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      yield chunkText;
    }
  } catch (error) {
    console.error('Stream error:', error);
    throw error;
  }
}

export async function generateYieldOptimization(cropType: string, region: string, currentIssues?: string) {
  if (!geminiModel) {
    throw new Error("Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.");
  }
  
  const prompt = `Generate a comprehensive yield optimization plan for ${cropType} in ${region}.
  ${currentIssues ? `Current issues: ${currentIssues}` : ''}
  
Include:
1. Crop rotation recommendations
2. Optimal planting and harvest times
3. Water management schedule
4. Fertilization plan
5. Common disease prevention for this crop and region

Format the response in a clear, actionable way.`;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function translateContent(text: string, targetLanguage: 'es' | 'en') {
  if (!geminiModel) {
    throw new Error("Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.");
  }
  
  const prompt = `Translate the following agricultural content to ${targetLanguage === 'es' ? 'Spanish' : 'English'}. Maintain technical accuracy:\n\n${text}`;
  
  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

2