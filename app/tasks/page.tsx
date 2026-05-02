"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { SiteNav } from "@/app/components/SiteNav";

/* ─── Types ──────────────────────────────────────────────────── */
type StepType = "phone_call" | "form_submission" | "email" | "schedule_check" | "ai_research";
type StepStatus = "queued" | "running" | "done" | "waiting" | "conflict";

type TaskStep = {
  id: string;
  type: StepType;
  label: string;
  phone_number?: string;
  script?: string;
  url?: string;
  fields?: Record<string, string>;
  status?: StepStatus;
  result?: string;
};

type TaskStatus = "planning" | "executing" | "completed" | "needs_input";

type TaskExecution = {
  id: string;
  text: string;
  schedule?: string;
  status: TaskStatus;
  steps: TaskStep[];
  created: Date;
};

type ScheduleEvent = {
  time: string;
  label: string;
  conflict?: boolean;
};

/* ─── Task planner ───────────────────────────────────────────── */
function planTask(text: string, schedule: string): TaskStep[] {
  const t = text.toLowerCase();
  const steps: TaskStep[] = [];

  if (schedule) {
    steps.push({ id: "sc-1", type: "schedule_check", label: "Checking schedule for conflicts", status: "queued" });
  }
  if (t.includes("call") || t.includes("phone") || t.includes("vendor") || t.includes("contact")) {
    steps.push({ id: "pc-1", type: "phone_call", label: "Placing phone call", phone_number: "Extracted from task", script: "AI-generated call script", status: "queued" });
  }
  if (t.includes("form") || t.includes("fill") || t.includes("submit") || t.includes("warranty") || t.includes("enroll")) {
    steps.push({ id: "fs-1", type: "form_submission", label: "Filling and submitting form", url: "URL from task context", status: "queued" });
  }
  if (t.includes("email") || t.includes("message") || t.includes("send") || t.includes("reply")) {
    steps.push({ id: "em-1", type: "email", label: "Composing and sending email", status: "queued" });
  }
  if (t.includes("appointment") || t.includes("schedule") || t.includes("book") || t.includes("cancel") || t.includes("reschedule")) {
    steps.push({ id: "ap-1", type: "schedule_check", label: "Managing appointment", status: "queued" });
  }
  if (t.includes("research") || t.includes("find") || t.includes("look up") || t.includes("check")) {
    steps.push({ id: "ar-1", type: "ai_research", label: "AI research & extraction", status: "queued" });
  }
  // Always at least 2 steps
  if (steps.length < 2) {
    steps.unshift({ id: "gen-1", type: "ai_research", label: "Analyzing task and planning execution", status: "queued" });
  }
  steps.push({ id: "sum-1", type: "ai_research", label: "Generating execution summary", status: "queued" });

  return steps;
}

const STEP_ICONS: Record<string, string> = {
  phone_call: "📞", form_submission: "📋", email: "✉️", schedule_check: "📅", ai_research: "🧠",
};

const STEP_DONE_RESULTS: Record<string, string[]> = {
  phone_call:      ["Call connected · voicemail left · logged", "Spoke with agent · confirmed · logged", "No answer · retry scheduled"],
  form_submission: ["Form submitted · confirmation #8821", "Form filled · awaiting signature", "Submitted · reference ID saved"],
  email:           ["Email sent · delivery confirmed", "Draft queued · tracking enabled", "Reply received · logged"],
  schedule_check:  ["No conflicts found · proceeding", "Conflict at 2:15pm · adjusted", "Calendar synced · slot confirmed"],
  ai_research:     ["Data extracted · 3 insights surfaced", "Research complete · summary ready", "Task analyzed · plan optimized"],
};

function randomResult(type: string): string {
  const opts = STEP_DONE_RESULTS[type] ?? ["Completed"];
  return opts[Math.floor(Math.random() * opts.length)];
}

/* ─── Live Step Runner — FIX: use refs, not closures ─────────── */
function useTaskRunner(
  task: TaskExecution | null,
  onUpdate: (t: TaskExecution) => void
) {
  // Keep latest copies in refs so async callbacks never see stale state
  const taskRef = useRef<TaskExecution | null>(null);
  const onUpdateRef = useRef(onUpdate);
  const runningId = useRef<string | null>(null);

  useEffect(() => { onUpdateRef.current = onUpdate; }, [onUpdate]);
  useEffect(() => { taskRef.current = task; }, [task]);

  useEffect(() => {
    if (!task || task.status !== "executing") return;
    // Only start a new runner if we haven't already started one for this task id
    if (runningId.current === task.id) return;
    runningId.current = task.id;

    let stepIndex = 0;
    const taskId = task.id;

    function runNextStep() {
      const current = taskRef.current;
      // Safety: bail if task changed or no longer executing
      if (!current || current.id !== taskId) return;
      if (stepIndex >= current.steps.length) {
        // All done
        const completed: TaskExecution = {
          ...current,
          status: "completed",
          steps: current.steps.map(s => ({ ...s, status: "done" as StepStatus })),
        };
        onUpdateRef.current(completed);
        runningId.current = null;
        return;
      }

      // Mark current step as running
      const withRunning: TaskExecution = {
        ...current,
        steps: current.steps.map((s, i) =>
          i === stepIndex ? { ...s, status: "running" as StepStatus } : s
        ),
      };
      onUpdateRef.current(withRunning);
      // Update ref immediately so next tick sees it
      taskRef.current = withRunning;

      // Simulate step execution time
      const execTime = 900 + Math.random() * 700;
      setTimeout(() => {
        const afterExec = taskRef.current;
        if (!afterExec || afterExec.id !== taskId) return;

        const result = randomResult(afterExec.steps[stepIndex]?.type ?? "ai_research");
        const isConflict = result.toLowerCase().includes("conflict");

        const withResult: TaskExecution = {
          ...afterExec,
          steps: afterExec.steps.map((s, i) =>
            i === stepIndex
              ? { ...s, status: (isConflict ? "conflict" : "done") as StepStatus, result }
              : s
          ),
        };
        onUpdateRef.current(withResult);
        taskRef.current = withResult;

        stepIndex++;
        setTimeout(runNextStep, 400 + Math.random() * 300);
      }, execTime);
    }

    // Start after a short planning delay
    setTimeout(runNextStep, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task?.id, task?.status]);
}

/* ─── Schedule Parser ────────────────────────────────────────── */
function parseSchedule(raw: string): ScheduleEvent[] {
  if (!raw) return [];
  return raw.split(/[,;\n]/).map(l => l.trim()).filter(Boolean).map(line => ({
    time: "",
    label: line,
    conflict: line.toLowerCase().includes("conflict") ||
      (line.toLowerCase().includes("off at") && line.toLowerCase().includes("pm")) ||
      (line.toLowerCase().includes("until") && line.toLowerCase().includes("pm")),
  }));
}

/* ══════════════════════════════════════════════════════════════
   TASKS PAGE
══════════════════════════════════════════════════════════════ */
export default function TasksPage() {
  const [taskText, setTaskText]       = useState("");
  const [scheduleCtx, setScheduleCtx] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const [tasks, setTasks]             = useState<TaskExecution[]>([]);
  const [activeTask, setActiveTask]   = useState<TaskExecution | null>(null);
  const [submitting, setSubmitting]   = useState(false);
  const [tab, setTab]                 = useState<"compose" | "history">("compose");

  // Pre-fill from hero canvas URL params
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const thought  = p.get("thought");
    const schedule = p.get("schedule");
    if (thought)  setTaskText(decodeURIComponent(thought));
    if (schedule) { setScheduleCtx(decodeURIComponent(schedule)); setShowSchedule(true); }
  }, []);

  const updateTask = useCallback((updated: TaskExecution) => {
    setActiveTask(updated);
    setTasks(prev => prev.map(x => x.id === updated.id ? updated : x));
  }, []);

  useTaskRunner(activeTask, updateTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim() || submitting) return;
    setSubmitting(true);

    const newTask: TaskExecution = {
      id: `task-${Date.now()}`,
      text: taskText.trim(),
      schedule: scheduleCtx.trim() || undefined,
      status: "planning",
      steps: [],
      created: new Date(),
    };

    // Add to list, switch to history tab
    setTasks(prev => [newTask, ...prev]);
    setActiveTask(newTask);
    setTab("history");

    // After "planning" delay, set executing with steps
    setTimeout(() => {
      const steps = planTask(newTask.text, newTask.schedule ?? "");
      const executing: TaskExecution = { ...newTask, status: "executing", steps };
      // Use functional updates so we always have latest state
      setActiveTask(executing);
      setTasks(prev => prev.map(x => x.id === executing.id ? executing : x));
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

        {/* ── Header ─────────────────────────────────────────── */}
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

        {/* ── Tabs ───────────────────────────────────────────── */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {(["compose", "history"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2 rounded-lg text-sm font-mono transition-all duration-200"
              style={{
                background: tab === t ? "rgba(0,243,255,0.08)" : "transparent",
                border:     tab === t ? "1px solid rgba(0,243,255,0.2)" : "1px solid transparent",
                color:      tab === t ? "rgba(0,243,255,0.9)" : "var(--text-2)",
              }}>
              {t === "compose" ? "⚡ New Task" : `📋 History${tasks.length ? ` (${tasks.length})` : ""}`}
            </button>
          ))}
        </div>

        {/* ══ COMPOSE TAB ════════════════════════════════════════ */}
        {tab === "compose" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Main form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="rounded-2xl p-6 mb-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>

                  {/* Terminal bar */}
                  <div className="flex items-center gap-2 mb-5">
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
                    placeholder="e.g. Call Harbor Marine at 555-0192 about invoice #4821, and if confirmed, submit the warranty form at harbormarine.com/warranty"
                    className="w-full bg-transparent resize-none outline-none font-inter text-sm leading-relaxed mb-4"
                    style={{
                      color: "var(--text-1)",
                      caretColor: "rgba(0,243,255,0.9)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      paddingBottom: "1rem",
                    }}
                  />

                  {/* Schedule toggle */}
                  <button type="button" onClick={() => setShowSchedule(s => !s)}
                    className="flex items-center gap-2 text-xs font-mono mb-3 transition-colors"
                    style={{ color: showSchedule ? "rgba(0,243,255,0.7)" : "rgba(255,255,255,0.25)" }}>
                    <span>{showSchedule ? "▼" : "▶"}</span>
                    Schedule context
                    {scheduleCtx && (
                      <span className="px-1.5 py-0.5 rounded text-[10px]"
                        style={{ background: "rgba(0,243,255,0.1)", color: "rgba(0,243,255,0.7)" }}>
                        {conflicts.length > 0 ? `⚠ ${conflicts.length} conflict${conflicts.length > 1 ? "s" : ""}` : "active"}
                      </span>
                    )}
                  </button>

                  {showSchedule && (
                    <div className="rounded-xl p-4 mb-4"
                      style={{ background: "rgba(0,243,255,0.02)", border: "1px solid rgba(0,243,255,0.1)" }}>
                      <p className="text-xs font-mono mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
                        Add constraints, pickups, appointments, or conflicts
                      </p>
                      <textarea
                        value={scheduleCtx}
                        onChange={e => setScheduleCtx(e.target.value)}
                        rows={3}
                        placeholder={"James soccer pickup 2pm, I\'m off at 2:15\nDoctor appt Tuesday 10am"}
                        className="w-full bg-transparent resize-none outline-none font-mono text-xs"
                        style={{ color: "rgba(255,255,255,0.6)", caretColor: "rgba(0,243,255,0.8)" }}
                      />
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
                      background: "linear-gradient(90deg, rgba(0,243,255,0.12), rgba(123,47,247,0.12))",
                      border: "1px solid rgba(0,243,255,0.25)",
                      color: "rgba(0,243,255,0.9)",
                    }}>
                    {submitting ? "Planning execution..." : "⚡ Execute Task"}
                  </button>
                </div>
              </form>

              {/* Quick examples */}
              <div>
                <p className="text-xs font-mono mb-3" style={{ color: "var(--text-3)" }}>Quick examples — click to load</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Call Harbor Marine about invoice #4821",
                    "Email Dr. Chen to reschedule Tuesday appointment",
                    "Submit warranty form at example.com/warranty",
                    "Research 3 local HVAC vendors and email quotes",
                    "Schedule pickup for James at 2pm, I get off at 2:15",
                  ].map(ex => (
                    <button key={ex}
                      onClick={() => { setTaskText(ex); }}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105 text-left"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-2)" }}>
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-3)" }}>What I handle</p>
              {[
                { icon: "📞", label: "Phone calls",      desc: "Dial, speak, log" },
                { icon: "📋", label: "Forms & docs",     desc: "Fill, submit, confirm" },
                { icon: "✉️",  label: "Email threads",   desc: "Draft, send, reply" },
                { icon: "📅", label: "Appointments",     desc: "Book, reschedule, cancel" },
                { icon: "⚠️", label: "Schedule conflicts", desc: "Detect & resolve automatically" },
                { icon: "🔁", label: "Workflows",        desc: "Chain & repeat operations" },
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

        {/* ══ HISTORY TAB ════════════════════════════════════════ */}
        {tab === "history" && (
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="text-center py-20">
                <div className="pulse-dot w-2 h-2 rounded-full mx-auto mb-4" style={{ background: "rgba(0,243,255,0.3)" }} />
                <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>No tasks yet.</p>
                <button onClick={() => setTab("compose")}
                  className="mt-4 text-xs font-mono transition-colors hover:text-white"
                  style={{ color: "rgba(0,243,255,0.4)" }}>
                  ← Compose your first task
                </button>
              </div>
            ) : (
              tasks.map(task => (
                <div key={task.id} className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>

                  {/* Task header */}
                  <div className="px-6 py-4 flex items-start justify-between gap-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="flex-1 min-w-0">
                      <p className="font-inter text-sm leading-snug" style={{ color: "var(--text-1)" }}>{task.text}</p>
                      {task.schedule && (
                        <p className="text-xs font-mono mt-1" style={{ color: "rgba(255,180,0,0.6)" }}>
                          📅 Schedule context active
                        </p>
                      )}
                      <p className="text-xs font-mono mt-1" style={{ color: "var(--text-3)" }}>
                        {task.created.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <span className="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase"
                      style={{
                        background: task.status === "completed" ? "rgba(0,243,255,0.08)"
                          : task.status === "executing"         ? "rgba(0,255,100,0.08)"
                          : task.status === "planning"          ? "rgba(123,47,247,0.1)"
                          : "rgba(255,255,255,0.05)",
                        color: task.status === "completed" ? "rgba(0,243,255,0.85)"
                          : task.status === "executing"    ? "rgba(0,255,140,0.85)"
                          : task.status === "planning"     ? "rgba(180,120,255,0.85)"
                          : "var(--text-2)",
                      }}>
                      {task.status === "planning"  ? "● planning..."
                        : task.status === "executing" ? "● executing"
                        : task.status === "completed" ? "✓ done"
                        : task.status}
                    </span>
                  </div>

                  {/* Steps */}
                  {task.status === "planning" ? (
                    <div className="px-6 py-4">
                      <p className="text-xs font-mono shimmer-text">Analyzing task · building execution plan...</p>
                    </div>
                  ) : task.steps.length > 0 ? (
                    <div className="px-6 py-4 space-y-3">
                      {task.steps.map((step, i) => (
                        <div key={step.id} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                            style={{
                              background: step.status === "done"     ? "rgba(0,243,255,0.08)"
                                : step.status === "running"   ? "rgba(0,255,100,0.08)"
                                : step.status === "conflict"  ? "rgba(255,140,0,0.1)"
                                : "rgba(255,255,255,0.03)",
                              border: `1px solid ${
                                step.status === "done"    ? "rgba(0,243,255,0.15)"
                                : step.status === "running"  ? "rgba(0,255,100,0.2)"
                                : step.status === "conflict" ? "rgba(255,140,0,0.2)"
                                : "rgba(255,255,255,0.06)"}`,
                            }}>
                            {step.status === "running"
                              ? <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,255,100,0.9)" }} />
                              : step.status === "done"     ? "✓"
                              : step.status === "conflict" ? "⚠"
                              : STEP_ICONS[step.type]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-mono"
                              style={{
                                color: step.status === "done"     ? "var(--text-1)"
                                  : step.status === "running"   ? "rgba(0,255,140,0.9)"
                                  : step.status === "conflict"  ? "rgba(255,180,0,0.9)"
                                  : "var(--text-3)",
                              }}>
                              {STEP_ICONS[step.type]} {step.label}
                              {step.status === "running" && (
                                <span className="shimmer-text ml-2">processing...</span>
                              )}
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
                  ) : null}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
