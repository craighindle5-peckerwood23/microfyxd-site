"use client";

import { useState } from "react";

type Task = {
  title: string;
  estimate: string;
  done: boolean;
};

export default function ConsolePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setTasks([]);

    try {
      const res = await fetch("/api/microtasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (e) {
      console.error(e);
      alert("Failed to generate micro-tasks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">AI Operator Console</h1>
        <p className="text-zinc-400 mt-2">
          Break down complex work into actionable micro-tasks with time
          estimates.
        </p>

        <div className="mt-6">
          <textarea
            className="w-full h-32 rounded-md bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-white"
            placeholder="Describe what you want to build or accomplish..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="mt-3 px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-medium disabled:opacity-50"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Micro-Tasks"}
          </button>
        </div>

        <div className="mt-8 border border-zinc-800 rounded-lg bg-zinc-950/70 p-4 font-mono text-sm">
          <div className="text-zinc-400 mb-2">
            USER &gt; {input || "Break down building a REST API"}
          </div>
          <div className="text-zinc-400">MFXD &gt; Generating micro-tasks...</div>

          <ul className="mt-3 space-y-1">
            {tasks.map((task, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className={task.done ? "text-green-400" : "text-zinc-500"}>
                  {task.done ? "✓" : "○"}
                </span>
                <span>
                  {task.title}{" "}
                  <span className="text-zinc-500">({task.estimate})</span>
                </span>
              </li>
            ))}

            {!tasks.length && (
              <>
                <li className="flex items-center gap-2 text-zinc-500">
                  <span>✓</span>
                  <span>Define data models (~15min)</span>
                </li>
                <li className="flex items-center gap-2 text-zinc-500">
                  <span>✓</span>
                  <span>Set up database schema (~20min)</span>
                </li>
                <li className="flex items-center gap-2 text-zinc-500">
                  <span>○</span>
                  <span>Create CRUD endpoints (~45min)</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
