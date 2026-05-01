"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SiteNav } from "@/app/components/SiteNav";

/* ─── Types ─────────────────────────────────────────────────── */
type TaskStep = {
  id: string;
  type: "phone_call" | "form_submission" | "email" | "schedule_check" | "ai_research";
  label: string;
  phone_number?: string;
  script?: string;
  url?: string;
  fields?: Record<string, string>;
  status?: "queued" | "running" | "done" | "waiting" | "conflict";
  result?: string;
};

type TaskExecution = {
  id: string;
  text: string;
  schedule?: string;
  status: "planning" | "executing" | "completed" | "needs_input";
  steps: TaskStep[];
  created: Date;
  conflictNote?: string;
};

type ScheduleEvent = {
  time: string;
  label: string;
  conflict?: boolean;
};

/* ─── Mock AI planner (frontend preview — real calls hit /api/tasks/execute) */
function planTask(text: string, schedule: string): TaskStep[] {
  const t = text.toLowerCase();
  const steps: TaskStep[] = [];

  // Schedule check always first if context provided
  if (schedule) {
    steps.push({
      id: "sc-1",
      type: "schedule_check",
      label: "Checking schedule for conflicts",
      status: "queued",
    });
  }

  if (t.includes("call") || t.includes("phone") || t.includes("vendor") || t.includes("contact")) {
    steps.push({
      id: "pc-1",
      type: "phone_call",
      label: "Placing phone call",
      phone_number: "Extracted from task",
      script: "AI-generated call script",
      status: "queued",
    });
  }

  if (t.includes("form") || t.includes("fill") || t.includes("submit") || t.includes("warranty") || t.includes("enroll")) {
    steps.push({
      id: "fs-1",
      type: "form_submission",
      label: "Filling and submitting form",
      url: "URL from task context",
      status: "queued",
    });
  }

  if (t.includes("email") || t.includes("message") || t.includes("send") || t.includes("reply")) {
    steps.push({
      id: "em-1",
      type: "email",
      label: "Composing and sending email",
      status: "queued",
    });
  }

  if (t.includes("appointment") || t.includes("schedule") || t.includes("book") || t.includes("cancel") || t.includes("reschedule")) {
    steps.push({
      id: "ap-1",
      type: "schedule_check",
      label: "Managing appointment",
      status: "queued",
    });
  }

  if (t.includes("research") || t.includes("find") || t.includes("look up") || t.includes("check")) {
    steps.push({
      id: "ar-1",
      type: "ai_research",
      label: "AI research & extraction",
      status: "queued",
    });
  }

  // Always end with a summary step
  steps.push({
    id: "sum-1",
    type: "ai_research",
    label: "Generating execution summary",
    status: "queued",
  });

  if (steps.length === (schedule ? 2 : 1)) {
    // Generic fallback
    steps.unshift({
      id: "gen-1",
      type: "ai_research",
      label: "Analyzing task and planning execution",
      status: "queued",
    });
  }

  return steps;
}

const STEP_ICONS: Record<string, string> = {
  phone_call: "📞",
  form_submission: "📋",
  email: "✉️",
  schedule_check: "📅",
  ai_research: "🧠",
};

const STEP_DONE_RESULTS: Record<string, string[]> = {
  phone_call: ["Call connected · voicemail left · logged", "Spoke with agent · confirmed · logged", "No answer · retry scheduled"],
  form_submission: ["Form submitted · confirmation #8821", "Form filled · awaiting signature", "Submitted · reference ID saved"],
  email: ["Email sent · delivery confirmed", "Draft sent · tracking enabled", "Reply received · logged"],
  schedule_check: ["No conflicts found · proceeding", "Conflict at 2:15pm · adjusted", "Calendar synced · slot confirmed"],
  ai_research: ["Data extracted · 3 insights surfaced", "Research complete · summary ready", "Task analyzed · plan optimized"],
};

function randomResult(type: string): string {
  const opts = STEP_DONE_RESULTS[type] || ["Completed"];
  return opts[Math.floor(Math.random() * opts.length)];
}

/* ─── Live Step Runner (simulated) ─────────────────────────── */
function useTaskRunner(task: TaskExecution | null, onUpdate: (t: TaskExecution) => void) {
  const running = useRef(false);
  useEffect(() => {
    if (!task || running.current || task.status !== "executing") return;
    running.current = true;
    let i = 0;
    const runStep = () => {
      if (i >= task.steps.length) {
        onUpdate({ ...task, status: "completed", steps: task.steps.map(s => ({ ...s, status: "done" as const })) });
        running.current = false;
        return;
      }
      const updated = { ...task, steps: task.steps.map((s, idx) => idx === i ? { ...s, status: "running" as const } : s) };
      onUpdate(updated);
      setTimeout(() => {
        const result = randomResult(task.steps[i].type);
        const conflict = result.includes("Conflict") || result.includes("conflict");
        const withResult = { ...updated, steps: updated.steps.map((s, idx) => idx === i
          ? { ...s, status: (conflict ? "conflict" : "done") as TaskStep["status"], result }
          : s)
        };
        onUpdate(withResult);
        i++;
        setTimeout(runStep, 600 + Math.random() * 400);
      }, 900 + Math.random() * 600);
    };
    setTimeout(runStep, 400);
  }, [task?.id, task?.status]);
}

/* ─── Schedule Parser ────────────────────────────────────────── */
function parseSchedule(raw: string): ScheduleEvent[] {
  if (!raw) return [];
  const lines = raw.split(/[,
;]/).map(l => l.trim()).filter(Boolean);
  return lines.map(line => {
    const conflict = line.toLowerCase().includes("conflict") ||
      (line.toLowerCase().includes("off at") && line.toLowerCase().includes("pm")) ||
      (line.toLowerCase().includes("until") && line.toLowerCase().includes("pm"));
    return { time: "", label: line, conflict };
  });
}

/* ══════════════════════════════════════════════════════════════
   TASKS PAGE COMPONENT
══════════════════════════════════════════════════════════════ */
export default function TasksPage() {
  const [taskText, setTaskText] = useState("");
  const [scheduleCtx, setScheduleCtx] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const [tasks, setTasks] = useState<TaskExecution[]>([]);
  const [activeTask, setActiveTask] = useState<TaskExecution | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState<"compose"|"history">("compose");

  // Read URL params on mount (from hero canvas)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const thought = p.get("thought");
    const schedule = p.get("schedule");
    if (thought) { setTaskText(decodeURIComponent(thought)); setTab("compose"); }
    if (schedule) { setScheduleCtx(decodeURIComponent(schedule)); setShowSchedule(true); }
  }, []);

  const updateActiveTask = (t: TaskExecution) => {
    setActiveTask(t);
    setTasks(prev => prev.map(x => x.id === t.id ? t : x));
  };

  useTaskRunner(activeTask, updateActiveTask);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    setSubmitting(true);

    const newTask: TaskExecution = {
      id: `task-${Date.now()}`,
      text: taskText.trim(),
      schedule: scheduleCtx.trim() || undefined,
      status: "planning",
      steps: [],
      created: new Date(),
    };

    setTasks(prev => [newTask, ...prev]);
    setActiveTask(newTask);
    setTab("history");

    // Simulate planning delay then start executing
    setTimeout(() => {
      const steps = planTask(taskText, scheduleCtx);
      const planned: TaskExecution = { ...newTask, status: "executing", steps };
      setActiveTask(planned);
      setTasks(prev => prev.map(x => x.id === planned.id ? planned : x));
      setSubmitting(false);
      setTaskText("");
      setScheduleCtx("");
    }, 1200);
  };

  const scheduleEvents = parseSchedule(scheduleCtx);
  const conflicts = scheduleEvents.filter(e => e.conflict);

  return (
    <div className="min-h-screen" style={{ background: "var(--void)" }}>
      <div className="scanline" />
      <SiteNav />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,243,255,0.7)" }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(0,243,255,0.5)" }}>
              Task Engine · Schedule-Aware
            </span>
          </div>
          <h1 className="text-4xl font-grotesk font-extrabold mb-2" style={{ color: "var(--text-1)" }}>
            Delegate anything.
          </h1>
          <p className="font-inter" style={{ color: "var(--text-2)" }}>
            Phone calls · forms · emails · appointments · conflicts — all handled.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {(["compose","history"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2 rounded-lg text-sm font-mono transition-all duration-200"
              style={{
                background: tab === t ? "rgba(0,243,255,0.08)" : "transparent",
                border: tab === t ? "1px solid rgba(0,243,255,0.2)" : "1px solid transparent",
                color: tab === t ? "rgba(0,243,255,0.9)" : "var(--text-2)",
              }}>
              {t === "compose" ? "⚡ New Task" : `📋 History${tasks.length ? ` (${tasks.length})` : ""}`}
            </button>
          ))}
        </div>

        {/* ── COMPOSE TAB ────────────────────────────────────── */}
        {tab === "compose" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main input */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="rounded-2xl p-6 mb-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
                  {/* Terminal bar */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                    <div className="pulse-dot w-2.5 h-2.5 rounded-full" style={{ background: "rgba(0,243,255,0.3)" }} />
                    <span className="ml-2 text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>task · compose</span>
                  </div>

                  <label className="block text-xs font-mono mb-2 uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
                    Describe the operation
                  </label>
                  <textarea
                    value={taskText}
                    onChange={e => setTaskText(e.target.value)}
                    rows={5}
                    placeholder="e.g. Call Harbor Marine at 555-0192 about invoice #4821, and if they confirm it, submit the warranty form at harbormarine.com/warranty with my info."
                    className="w-full bg-transparent resize-none outline-none font-inter text-sm leading-relaxed mb-4"
                    style={{
                      color: "var(--text-1)", caretColor: "rgba(0,243,255,0.9)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem",
                    }}
                  />

                  {/* Schedule context */}
                  <button type="button" onClick={() => setShowSchedule(s => !s)}
                    className="flex items-center gap-2 text-xs font-mono mb-3 transition-colors"
                    style={{ color: showSchedule ? "rgba(0,243,255,0.7)" : "rgba(255,255,255,0.25)" }}>
                    <span>{showSchedule ? "▼" : "▶"}</span>
                    Schedule context
                    {scheduleCtx && <span className="px-1.5 py-0.5 rounded text-[10px]"
                      style={{ background: "rgba(0,243,255,0.1)", color: "rgba(0,243,255,0.7)" }}>
                      {conflicts.length > 0 ? `⚠ ${conflicts.length} conflict${conflicts.length > 1 ? "s" : ""}` : "active"}
                    </span>}
                  </button>

                  {showSchedule && (
                    <div className="rounded-xl p-4 mb-4 transition-all"
                      style={{ background: "rgba(0,243,255,0.02)", border: "1px solid rgba(0,243,255,0.1)" }}>
                      <p className="text-xs font-mono mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
                        Add time constraints, pickups, appointments, or conflicts
                      </p>
                      <textarea
                        value={scheduleCtx}
                        onChange={e => setScheduleCtx(e.target.value)}
                        rows={3}
                        placeholder={"James soccer pickup 2pm, I\'m off at 2:15\nDoctor appt Tuesday 10am\nBusy 1-3pm today"}
                        className="w-full bg-transparent resize-none outline-none font-mono text-xs"
                        style={{ color: "rgba(255,255,255,0.6)", caretColor: "rgba(0,243,255,0.8)" }}
                      />
                      {/* Conflict preview */}
                      {conflicts.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {conflicts.map((c, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs font-mono px-2 py-1.5 rounded"
                              style={{ background: "rgba(255,140,0,0.06)", border: "1px solid rgba(255,140,0,0.15)", color: "rgba(255,180,0,0.8)" }}>
                              <span>⚠</span>
                              <span>{c.label} — Microfyxd will flag and resolve</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <button type="submit" disabled={!taskText.trim() || submitting}
                    className="w-full py-3 rounded-xl font-grotesk font-bold text-sm transition-all duration-300 disabled:opacity-30"
                    style={{
                      background: "linear-gradient(90deg,rgba(0,243,255,0.12),rgba(123,47,247,0.12))",
                      border: "1px solid rgba(0,243,255,0.25)",
                      color: "rgba(0,243,255,0.9)",
                    }}>
                    {submitting ? "Planning execution..." : "⚡ Execute Task"}
                  </button>
                </div>
              </form>

              {/* Quick examples */}
              <div>
                <p className="text-xs font-mono mb-3" style={{ color: "var(--text-3)" }}>Quick examples</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Call Harbor Marine about invoice #4821",
                    "Email Dr. Chen to reschedule Tuesday appointment",
                    "Submit warranty form at example.com/warranty",
                    "Find 3 local vendors for HVAC repair and email quotes",
                    "Schedule pickup for James at 2pm, I get off at 2:15",
                  ].map(ex => (
                    <button key={ex} onClick={() => setTaskText(ex)}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-2)" }}>
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — capabilities */}
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-3)" }}>What I can handle</p>
              {[
                { icon: "📞", label: "Phone calls", desc: "Dial, speak, log" },
                { icon: "📋", label: "Forms & docs", desc: "Fill, submit, confirm" },
                { icon: "✉️", label: "Email threads", desc: "Draft, send, reply" },
                { icon: "📅", label: "Appointments", desc: "Book, reschedule, cancel" },
                { icon: "⚠️", label: "Conflicts", desc: "Detect & resolve automatically" },
                { icon: "🔁", label: "Workflows", desc: "Chain & repeat operations" },
              ].map(cap => (
                <div key={cap.label} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="text-xl">{cap.icon}</span>
                  <div>
                    <p className="text-sm font-grotesk font-semibold" style={{ color: "var(--text-1)" }}>{cap.label}</p>
                    <p className="text-xs font-mono" style={{ color: "var(--text-3)" }}>{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── HISTORY TAB ────────────────────────────────────── */}
        {tab === "history" && (
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="text-center py-20">
                <div className="pulse-dot w-2 h-2 rounded-full mx-auto mb-4" style={{ background: "rgba(0,243,255,0.3)" }} />
                <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>No tasks yet. Compose your first one.</p>
                <button onClick={() => setTab("compose")} className="mt-4 text-xs font-mono transition-colors hover:text-white"
                  style={{ color: "rgba(0,243,255,0.4)" }}>← Compose a task</button>
              </div>
            ) : tasks.map(task => (
              <div key={task.id} className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                {/* Task header */}
                <div className="px-6 py-4 flex items-start justify-between gap-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-sm leading-snug truncate" style={{ color: "var(--text-1)" }}>{task.text}</p>
                    {task.schedule && (
                      <p className="text-xs font-mono mt-1" style={{ color: "rgba(255,180,0,0.6)" }}>
                        ⚠ Schedule context active
                      </p>
                    )}
                    <p className="text-xs font-mono mt-1" style={{ color: "var(--text-3)" }}>
                      {task.created.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}
                    </p>
                  </div>
                  <span className="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase"
                    style={{
                      background: task.status === "completed" ? "rgba(0,243,255,0.08)"
                        : task.status === "executing" ? "rgba(0,255,100,0.08)"
                        : task.status === "planning" ? "rgba(123,47,247,0.1)"
                        : "rgba(255,255,255,0.05)",
                      color: task.status === "completed" ? "rgba(0,243,255,0.8)"
                        : task.status === "executing" ? "rgba(0,255,140,0.8)"
                        : task.status === "planning" ? "rgba(180,120,255,0.8)"
                        : "var(--text-2)",
                    }}>
                    {task.status === "planning" ? "● planning..." : task.status === "executing" ? "● executing" : task.status === "completed" ? "✓ done" : task.status}
                  </span>
                </div>

                {/* Steps */}
                {task.steps.length > 0 && (
                  <div className="px-6 py-4 space-y-2">
                    {task.steps.map((step, i) => (
                      <div key={step.id} className="flex items-start gap-3">
                        {/* Step icon / status */}
                        <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                          style={{
                            background: step.status === "done" ? "rgba(0,243,255,0.08)"
                              : step.status === "running" ? "rgba(0,255,100,0.08)"
                              : step.status === "conflict" ? "rgba(255,140,0,0.1)"
                              : "rgba(255,255,255,0.03)",
                            border: `1px solid ${step.status === "done" ? "rgba(0,243,255,0.15)" : step.status === "running" ? "rgba(0,255,100,0.2)" : step.status === "conflict" ? "rgba(255,140,0,0.2)" : "rgba(255,255,255,0.06)"}`,
                          }}>
                          {step.status === "running" ? (
                            <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,255,100,0.8)" }} />
                          ) : step.status === "done" ? "✓"
                            : step.status === "conflict" ? "⚠"
                            : STEP_ICONS[step.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-mono" style={{
                            color: step.status === "done" ? "var(--text-1)"
                              : step.status === "running" ? "rgba(0,255,140,0.9)"
                              : step.status === "conflict" ? "rgba(255,180,0,0.9)"
                              : "var(--text-3)",
                          }}>
                            {STEP_ICONS[step.type]} {step.label}
                            {step.status === "running" && <span className="shimmer-text ml-2">processing...</span>}
                          </p>
                          {step.result && (
                            <p className="text-xs font-mono mt-0.5"
                              style={{ color: step.status === "conflict" ? "rgba(255,160,0,0.6)" : "rgba(0,243,255,0.45)" }}>
                              → {step.result}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {task.status === "planning" && (
                  <div className="px-6 py-4">
                    <p className="text-xs font-mono shimmer-text">Analyzing task · building execution plan...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
