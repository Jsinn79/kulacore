"use client";
import { useState } from "react";

export default function Dashboard() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("beginner");
  const [focus, setFocus] = useState("");
  const [flow, setFlow] = useState("");
  const [flowLoading, setFlowLoading] = useState(false);

  const [diet, setDiet] = useState("");
  const [mealGoal, setMealGoal] = useState("");
  const [days, setDays] = useState(3);
  const [plan, setPlan] = useState("");
  const [planLoading, setPlanLoading] = useState(false);

  async function getFlow() {
    setFlowLoading(true);
    setFlow("");
    const res = await fetch("/api/instructor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal, level, focus }),
    });
    const data = await res.json();
    setFlow(data.text || data.error || "");
    setFlowLoading(false);
  }

  async function getPlan() {
    setPlanLoading(true);
    setPlan("");
    const res = await fetch("/api/mealplan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ diet, goal: mealGoal, days }),
    });
    const data = await res.json();
    setPlan(data.text || data.error || "");
    setPlanLoading(false);
  }

  return (
    <main className="min-h-screen bg-sand-50 pt-16 pb-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="pt-16 pb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-ocean-900 tracking-tight">Welcome to KulaCore</h1>
          <p className="mt-2 text-mist-500">Your AI instructor and meal planner are ready.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-ocean-100 p-7">
            <h3 className="text-xl font-semibold text-ocean-900 mb-4">AI Yoga Instructor</h3>
            <div className="space-y-3">
              <input
                className="w-full rounded-lg border border-ocean-200 px-3.5 py-2.5 text-ocean-900 placeholder:text-mist-400 focus:outline-none focus:ring-2 focus:ring-ocean-400/50"
                placeholder="Goal (e.g. flexibility)"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
              <select
                className="w-full rounded-lg border border-ocean-200 px-3.5 py-2.5 text-ocean-900"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <input
                className="w-full rounded-lg border border-ocean-200 px-3.5 py-2.5 text-ocean-900 placeholder:text-mist-400 focus:outline-none focus:ring-2 focus:ring-ocean-400/50"
                placeholder="Focus area (e.g. lower back)"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
              />
              <button
                onClick={getFlow}
                disabled={flowLoading}
                className="w-full rounded-full bg-ocean-600 py-2.5 text-white font-semibold hover:bg-ocean-700 disabled:opacity-60 transition"
              >
                {flowLoading ? "Building flow…" : "Get my flow"}
              </button>
            </div>
            {flow && (
              <pre className="mt-4 whitespace-pre-wrap text-sm text-mist-700 font-sans">{flow}</pre>
            )}
          </div>

          <div className="rounded-2xl bg-white border border-ocean-100 p-7">
            <h3 className="text-xl font-semibold text-ocean-900 mb-4">AI Meal Planner</h3>
            <div className="space-y-3">
              <input
                className="w-full rounded-lg border border-ocean-200 px-3.5 py-2.5 text-ocean-900 placeholder:text-mist-400 focus:outline-none focus:ring-2 focus:ring-ocean-400/50"
                placeholder="Dietary preference (e.g. vegetarian)"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
              />
              <input
                className="w-full rounded-lg border border-ocean-200 px-3.5 py-2.5 text-ocean-900 placeholder:text-mist-400 focus:outline-none focus:ring-2 focus:ring-ocean-400/50"
                placeholder="Goal (e.g. more energy)"
                value={mealGoal}
                onChange={(e) => setMealGoal(e.target.value)}
              />
              <input
                type="number"
                min={1}
                max={7}
                className="w-full rounded-lg border border-ocean-200 px-3.5 py-2.5 text-ocean-900"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />
              <button
                onClick={getPlan}
                disabled={planLoading}
                className="w-full rounded-full bg-ocean-600 py-2.5 text-white font-semibold hover:bg-ocean-700 disabled:opacity-60 transition"
              >
                {planLoading ? "Building plan…" : "Get my meal plan"}
              </button>
            </div>
            {plan && (
              <pre className="mt-4 whitespace-pre-wrap text-sm text-mist-700 font-sans">{plan}</pre>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
