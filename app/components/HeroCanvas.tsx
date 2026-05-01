"use client";

import { useState, useEffect, useRef } from "react";

const GHOST_INSIGHTS: Record<string, string> = {
  pricing:   "→ Most operators recoup time in the first 48 hours.",
  workflow:  "→ I can chain that into a repeatable workflow instantly.",
  file:      "→ Upload it. I extract every structured insight in seconds.",
  call:      "→ I'll dial, run the script, log the result. You won't touch the phone.",
  task:      "→ Breaking that into micro-steps now. Ready to execute.",
  schedule:  "→ I'll check your calendar and flag any conflicts before executing.",
  email:     "→ Draft, send, and log — I handle the whole thread.",
  appt:      "→ I can schedule, reschedule, and send confirmations automatically.",
  pickup:    "→ Conflict detected. I'll find coverage or reschedule the overlap.",
  default:   "→ I'll plan it, execute it, and send you a report.",
};

const PLACEHOLDERS = [
  "Describe the problem you're trying to solve...",
  "What operation do you need to execute?",
  "What's eating your time right now?",
  "What would you do if this was handled?",
  "Who needs picked up? What needs filed? What needs called?",
];

function getGhostInsight(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("price") || t.includes("cost") || t.includes("plan")) return GHOST_INSIGHTS.pricing;
  if (t.includes("workflow") || t.includes("automat")) return GHOST_INSIGHTS.workflow;
  if (t.includes("file") || t.includes("document") || t.includes("pdf")) return GHOST_INSIGHTS.file;
  if (t.includes("call") || t.includes("phone") || t.includes("vendor")) return GHOST_INSIGHTS.call;
  if (t.includes("schedule") || t.includes("calendar") || t.includes("conflict")) return GHOST_INSIGHTS.schedule;
  if (t.includes("email") || t.includes("message") || t.includes("send")) return GHOST_INSIGHTS.email;
  if (t.includes("appt") || t.includes("appointment") || t.includes("book")) return GHOST_INSIGHTS.appt;
  if (t.includes("pick") || t.includes("pickup") || t.includes("soccer") || t.includes("school")) return GHOST_INSIGHTS.pickup;
  if (t.includes("task") || t.includes("do") || t.includes("run")) return GHOST_INSIGHTS.task;
  return GHOST_INSIGHTS.default;
}

export function HeroCanvas() {
  const [value, setValue] = useState("");
  const [scheduleCtx, setScheduleCtx] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const [ghostVisible, setGhostVisible] = useState(false);
  const [ghostText, setGhostText] = useState("");
  const [focused, setFocused] = useState(false);
  const [phIdx, setPhIdx] = useState(0);
  const [phVisible, setPhVisible] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const ghostTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = focused || value.length > 0;

  // Cycle placeholder
  useEffect(() => {
    if (focused || value) return;
    const id = setInterval(() => {
      setPhVisible(false);
      setTimeout(() => { setPhIdx(i => (i + 1) % PLACEHOLDERS.length); setPhVisible(true); }, 350);
    }, 3500);
    return () => clearInterval(id);
  }, [focused, value]);

  // Ghost insight with debounce
  useEffect(() => {
    if (ghostTimer.current) clearTimeout(ghostTimer.current);
    if (value.length < 5) { setGhostVisible(false); return; }
    ghostTimer.current = setTimeout(() => {
      setGhostText(getGhostInsight(value));
      setGhostVisible(true);
    }, 550);
    return () => { if (ghostTimer.current) clearTimeout(ghostTimer.current); };
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    const params = new URLSearchParams({ thought: value.trim() });
    if (scheduleCtx.trim()) params.set("schedule", scheduleCtx.trim());
    window.location.href = `/tasks?${params.toString()}`;
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Whisper Glass main frame */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl rounded-2xl p-8 transition-all duration-700"
        style={{
          background: "rgba(255,255,255,0.035)",
          border: `1px solid ${active ? "rgba(0,243,255,0.28)" : "rgba(255,255,255,0.06)"}`,
          backdropFilter: "blur(12px)",
          boxShadow: active ? "0 0 50px rgba(0,243,255,0.09), 0 0 100px rgba(123,47,247,0.06)" : "none",
          transition: "border-color 0.6s, box-shadow 0.6s",
        }}
      >
        {/* Terminal top bar */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="w-2.5 h-2.5 rounded-full pulse-dot" style={{ background: "rgba(0,243,255,0.3)" }} />
          <span className="ml-2 text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
            microfyxd · {active ? "listening..." : "ready"}
          </span>
        </div>

        {/* Task input */}
        <div className="relative mb-4">
          {!value && !focused && (
            <div className="absolute inset-0 flex items-start pointer-events-none select-none px-1 pt-0.5"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)", fontSize: "1rem",
                opacity: phVisible ? 1 : 0, transition: "opacity 0.35s ease" }}>
              <span className="pulse-dot mr-2 mt-1.5 w-1 h-3.5 rounded-full inline-block flex-shrink-0"
                style={{ background: "rgba(0,243,255,0.5)" }} />
              {PLACEHOLDERS[phIdx]}
            </div>
          )}
          <textarea
            value={value}
            onChange={e => { setValue(e.target.value); setCharCount(e.target.value.length); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={3}
            className="w-full bg-transparent resize-none outline-none font-inter text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.9)", caretColor: "rgba(0,243,255,0.9)", fontSize: "1rem" }}
          />
        </div>

        {/* Schedule context toggle */}
        <div className="mb-4">
          <button type="button"
            onClick={() => setShowSchedule(s => !s)}
            className="flex items-center gap-2 text-xs font-mono transition-colors"
            style={{ color: showSchedule ? "rgba(0,243,255,0.7)" : "rgba(255,255,255,0.2)" }}>
            <span>{showSchedule ? "▼" : "▶"}</span>
            Add schedule context
            {scheduleCtx && <span className="px-1.5 py-0.5 rounded text-[10px]"
              style={{ background: "rgba(0,243,255,0.1)", color: "rgba(0,243,255,0.7)" }}>active</span>}
          </button>
          {showSchedule && (
            <div className="mt-2 rounded-xl p-3 transition-all"
              style={{ background: "rgba(0,243,255,0.03)", border: "1px solid rgba(0,243,255,0.1)" }}>
              <p className="text-xs font-mono mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                e.g. "James soccer pickup 2pm · I'm off at 2:15" or "busy 1-3pm today"
              </p>
              <textarea
                value={scheduleCtx}
                onChange={e => setScheduleCtx(e.target.value)}
                rows={2}
                placeholder="Paste your schedule constraints here..."
                className="w-full bg-transparent resize-none outline-none font-mono text-xs"
                style={{ color: "rgba(255,255,255,0.6)", caretColor: "rgba(0,243,255,0.8)",
                  "::placeholder": { color: "rgba(255,255,255,0.15)" } } as React.CSSProperties}
              />
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.18)" }}>
            {charCount > 0 ? `${charCount} chars` : "type anything — i'm waiting"}
          </span>
          <button type="submit" disabled={!value.trim()}
            className="px-6 py-2 rounded-xl text-sm font-semibold font-mono transition-all duration-300 disabled:opacity-20"
            style={{
              background: value.trim() ? "linear-gradient(90deg,rgba(0,243,255,0.12),rgba(123,47,247,0.12))" : "transparent",
              border: "1px solid rgba(0,243,255,0.2)",
              color: value.trim() ? "rgba(0,243,255,0.9)" : "rgba(255,255,255,0.2)",
            }}>
            Execute →
          </button>
        </div>
      </form>

      {/* Ghost preview card */}
      <div className="absolute -bottom-16 left-1/2 w-full max-w-xl rounded-xl px-6 py-4 pointer-events-none"
        style={{
          background: "rgba(0,243,255,0.02)",
          border: "1px solid rgba(0,243,255,0.08)",
          backdropFilter: "blur(8px)",
          opacity: ghostVisible ? 1 : 0,
          transform: ghostVisible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(10px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
        <p className="text-sm font-mono" style={{ color: "rgba(0,243,255,0.55)" }}>{ghostText}</p>
      </div>
    </div>
  );
}
