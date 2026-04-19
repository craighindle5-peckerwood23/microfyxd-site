"use client";

import { useState } from "react";

type Mode = "chat" | "tasks";

export default function AIConsole() {
  const [mode, setMode] = useState<Mode>("chat");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, input }),
      });

      const data = await res.json();
      if (data.content) setOutput(data.content);
      else setOutput("No response.");
    } catch (err) {
      setOutput("Error talking to AI.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="ai-console">
      <div className="ai-console-inner">
        <div className="ai-console-header">
          <h2>Microfyxd Operator Console</h2>
          <div className="ai-console-modes">
            <button
              className={mode === "chat" ? "mode-btn active" : "mode-btn"}
              onClick={() => setMode("chat")}
              type="button"
            >
              Chat
            </button>
            <button
              className={mode === "tasks" ? "mode-btn active" : "mode-btn"}
              onClick={() => setMode("tasks")}
              type="button"
            >
              Micro-tasks
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="ai-console-form">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "chat"
                ? "Ask the operator anything about your system…"
                : "Describe what you want fixed or executed…"
            }
          />
          <button type="submit" disabled={loading}>
            {loading ? "Running…" : "Run"}
          </button>
        </form>

        <div className="ai-console-output">
          {output ? <pre>{output}</pre> : !loading && <span>No output yet.</span>}
        </div>
      </div>
    </section>
  );
}
