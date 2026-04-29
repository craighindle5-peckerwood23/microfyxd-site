"use client";

import { useState, useEffect, useRef } from "react";

const GHOST_INSIGHTS: Record<string, string> = {
  default: "Describe the problem you're trying to solve...",
  pricing:  "→ Most teams reduce manual work by 80% in week one.",
  workflow: "→ I can chain that into a repeatable workflow in seconds.",
  file:     "→ Upload the file. I'll extract every structured insight.",
  call:     "→ I can dial that number, run the script, and log the result.",
  task:     "→ Breaking that into micro-steps now. Ready to execute.",
  help:     "→ I'll start by mapping what you already have.",
};

function getGhostInsight(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("price") || t.includes("cost") || t.includes("plan")) return GHOST_INSIGHTS.pricing;
  if (t.includes("workflow") || t.includes("automat")) return GHOST_INSIGHTS.workflow;
  if (t.includes("file") || t.includes("document") || t.includes("pdf")) return GHOST_INSIGHTS.file;
  if (t.includes("call") || t.includes("phone") || t.includes("contact")) return GHOST_INSIGHTS.call;
  if (t.includes("task") || t.includes("do") || t.includes("run")) return GHOST_INSIGHTS.task;
  if (t.includes("help") || t.includes("how") || t.includes("what")) return GHOST_INSIGHTS.help;
  return "";
}

export function HeroCanvas() {
  const [value, setValue] = useState("");
  const [ghostVisible, setGhostVisible] = useState(false);
  const [ghostText, setGhostText] = useState("");
  const [focused, setFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const ghostTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const PLACEHOLDERS = [
    "Describe the problem you're trying to solve...",
    "What operation do you need to execute?",
    "What's costing you the most time right now?",
    "What would you automate if you could?",
  ];

  // Cycle placeholder when not focused and empty
  useEffect(() => {
    if (focused || value) return;
    const interval = setInterval(() => {
      setPlaceholderVisible(false);
      setTimeout(() => {
        setPlaceholderIndex(i => (i + 1) % PLACEHOLDERS.length);
        setPlaceholderVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, [focused, value]);

  // Ghost insight logic
  useEffect(() => {
    if (ghostTimerRef.current) clearTimeout(ghostTimerRef.current);
    if (value.length < 4) {
      setGhostVisible(false);
      return;
    }
    ghostTimerRef.current = setTimeout(() => {
      const insight = getGhostInsight(value);
      if (insight) {
        setGhostText(insight);
        setGhostVisible(true);
      }
    }, 600);
    return () => { if (ghostTimerRef.current) clearTimeout(ghostTimerRef.current); };
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    const encoded = encodeURIComponent(value.trim());
    window.location.href = `/upgrade?thought=${encoded}`;
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* The Whisper Glass Card — main frame */}
      <div
        className={`relative w-full max-w-2xl rounded-2xl p-8 transition-all duration-700 ${
          focused || value ? "shadow-[0_0_40px_rgba(0,243,255,0.12),0_0_80px_rgba(123,47,247,0.08)]" : ""
        }`}
        style={{
          background: "rgba(255,255,255,0.035)",
          border: `1px solid ${focused || value ? "rgba(0,243,255,0.25)" : "rgba(255,255,255,0.06)"}`,
          backdropFilter: "blur(12px)",
          transition: "border-color 0.6s ease, box-shadow 0.6s ease",
        }}
      >
        {/* Top bar dots — like a terminal/IDE */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(0,243,255,0.25)" }} />
          <span className="ml-2 text-xs font-mono" style={{ color: "var(--text-3)" }}>
            microfyxd · ready
          </span>
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit}>
          <div className="relative">
            {/* Pulse placeholder */}
            {!value && !focused && (
              <div
                className="absolute inset-0 flex items-center pointer-events-none select-none px-1"
                style={{
                  color: "var(--text-3)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "1.05rem",
                  opacity: placeholderVisible ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              >
                <span className="pulse-dot mr-2 w-1 h-4 rounded-full inline-block" style={{ background: "rgba(0,243,255,0.5)" }} />
                {PLACEHOLDERS[placeholderIndex]}
              </div>
            )}
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              rows={3}
              className="w-full bg-transparent resize-none outline-none text-base leading-relaxed font-inter"
              style={{
                color: "var(--text-1)",
                caretColor: "rgba(0,243,255,0.8)",
                fontSize: "1.05rem",
              }}
            />
          </div>

          {/* Submit row */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs font-mono" style={{ color: "var(--text-3)" }}>
              {value.length > 0 ? `${value.length} chars · enter to execute` : ""}
            </span>
            <button
              type="submit"
              disabled={!value.trim()}
              className="px-5 py-2 rounded-lg text-sm font-semibold font-inter transition-all duration-300 disabled:opacity-20"
              style={{
                background: value.trim()
                  ? "linear-gradient(90deg, rgba(0,243,255,0.15), rgba(123,47,247,0.15))"
                  : "transparent",
                border: "1px solid rgba(0,243,255,0.2)",
                color: value.trim() ? "rgba(0,243,255,0.9)" : "var(--text-3)",
              }}
            >
              Execute →
            </button>
          </div>
        </form>
      </div>

      {/* Ghost preview card — fades in behind the frame with AI insight */}
      <div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-xl rounded-xl px-6 py-4 pointer-events-none transition-all duration-700"
        style={{
          background: "rgba(0,243,255,0.02)",
          border: "1px solid rgba(0,243,255,0.08)",
          backdropFilter: "blur(8px)",
          opacity: ghostVisible ? 1 : 0,
          transform: ghostVisible
            ? "translateX(-50%) translateY(0px)"
            : "translateX(-50%) translateY(8px)",
        }}
      >
        <p className="text-sm font-mono" style={{ color: "rgba(0,243,255,0.6)" }}>
          {ghostText}
        </p>
      </div>
    </div>
  );
}
