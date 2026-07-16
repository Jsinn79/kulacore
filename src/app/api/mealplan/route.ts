import { NextResponse } from "next/server";

async function callOpenAI(system: string, user: string): Promise<{ text?: string; error?: string }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return { error: "AI isn't configured yet — add an OPENAI_API_KEY to enable this." };
  }
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.7,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    return { error: `AI request failed: ${text.slice(0, 200)}` };
  }
  const data = await res.json();
  return { text: data.choices?.[0]?.message?.content || "" };
}

export async function POST(req: Request) {
  const { diet, goal, days } = await req.json();
  const system =
    "You are an AI meal planning assistant for a yoga practice app. Build a practical meal plan with a grocery list. Keep it concise, structured with headers per day.";
  const user = `Dietary preference: ${diet || "no restrictions"}. Goal: ${goal || "balanced energy for yoga practice"}. Number of days: ${days || 3}.`;
  const result = await callOpenAI(system, user);
  return NextResponse.json(result);
}
