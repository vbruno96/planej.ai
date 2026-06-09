interface GeminiResponse {
  candidates: {
    content: {
      role?: string;
      parts: { text: string }[];
    };
  }[];
}

export interface GeminiPayload {
  contents: {
    role?: "user" | "model";
    parts: { text: string }[];
  }[];
}

export interface InsightData {
  feasibility: {
    status: "viable" | "needs_adjustment" | "unfeasible";
    content: string;
  };
  diagnosis: {
    content: string;
  };
  suggestions: {
    items: string[];
  };
  extraIncome: {
    items: string[];
  };
  investment: {
    items: string[];
  };
  motivation: {
    content: string;
  };
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY);
const MODEL_NAME = "gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

async function callGeminiApi(payload: GeminiPayload) {
  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseData = await response.json();
    console.error(responseData);
    throw new Error(`Request error: ${response.status}`);
  }

  return (await response.json()) as GeminiResponse;
}

export async function getInsight(prompt: string) {
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const response = await callGeminiApi(payload);
  const json = response.candidates[0].content.parts[0].text;
  return JSON.parse(json) as InsightData;
}

export async function getAiAnswer(payload: GeminiPayload) {
  const response = await callGeminiApi(payload);
  return response.candidates[0].content;
}
