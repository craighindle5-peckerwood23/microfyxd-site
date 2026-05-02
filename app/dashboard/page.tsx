"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SiteNav } from "@/app/components/SiteNav";

const DEMO_TASKS = [
  { id: "1", text: "Call Harbor Marine re invoice #4821", status: "completed", time: "2m ago", steps: 3 },
  { id: "2", text: "Submit warranty form — confirmation #8821", status: "completed", time: "14m ago", steps: 2 },
  { id: "3", text: "Email Dr. Chen — reschedule Tuesday appt", status: "completed", time: "1h ago", steps: 2 },
  { id: "4", text: "Research 3 HVAC vendors — quotes sent", status: "completed", time: "3h ago", steps: 4 },
  { id: "5", text: "James soccer pickup conflict — resolved", status: "completed", time: "Yesterday", steps: 1 },
];

const QUICK_ACTIONS = [
  { icon: "📞", label: "Make a call",        href: "/tasks", hint: "Dial any number" },
  { icon: "📋", label: "Fill a form",        href: "/tasks", hint: "Submit any web form" },
  { icon: "✉️",  label: "Send an email",     href: "/tasks", hint: "Draft & send" },
  { icon: "📅", label: "Book appointment",   href: "/tasks", hint: "Schedule anything" },
  { icon: "🔁", label: "Create workflow",    href: "/tasks", hint: "Chain tasks" },
  { icon: "🧠", label: "AI research",        href: "/tasks", hint: "Find & extract data" },
];

export default function DashboardPage() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--void)" }}>
      <div className="scanline" />
      <SiteNav />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,243,255,0.7)" }} />
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(0,243,255,0.5)" }}>
                Operator Dashboard
              </span>
            </div>
            <h1 className="text-4xl font-grotesk font-extrabold" style={{ color: "var(--text-1)" }}>Command Center</h1>
            <p className="font-inter mt-1" style={{ color: "var(--text-2)" }}>Everything delegated. All in one view.</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-mono font-bold" style={{ color: "rgba(0,243,255,0.7)" }}>{time}</p>
            <p className="text-xs font-mono" style={{ color: "var(--text-3)" }}>System online</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Tasks completed", value: "5", sub: "this session" },
            { label: "Steps executed",  value: "12", sub: "across all tasks" },
            { label: "Time saved",       value: "~2h", sub: "estimated" },
            { label: "Conflicts resolved", value: "1", sub: "auto-handled" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-3xl font-grotesk font-extrabold mb-1" style={{ color: "var(--text-1)" }}>{s.value}</p>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--text-3)" }}>{s.label}</p>
              <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(0,243,255,0.4)" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-3)" }}>Quick actions</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {QUICK_ACTIONS.map(a => (
              <Link key={a.label} href={a.href}
                className="flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] group"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="text-sm font-grotesk font-semibold transition-colors"
                    style={{ color: "var(--text-1)" }}>{a.label}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--text-3)" }}>{a.hint}</p>
                </div>
                <span className="ml-auto text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "rgba(0,243,255,0.6)" }}>→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent task history */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-3)" }}>Recent tasks</p>
            <Link href="/tasks" className="text-xs font-mono transition-colors hover:text-white"
              style={{ color: "rgba(0,243,255,0.4)" }}>View all →</Link>
          </div>
          <div className="space-y-2">
            {DEMO_TASKS.map(task => (
              <div key={task.id} className="flex items-center justify-between px-5 py-3.5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(0,243,255,0.6)" }} />
                  <p className="text-sm font-inter truncate" style={{ color: "var(--text-1)" }}>{task.text}</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                  <span className="text-xs font-mono hidden md:block" style={{ color: "var(--text-3)" }}>
                    {task.steps} steps
                  </span>
                  <span className="text-xs font-mono" style={{ color: "var(--text-3)" }}>{task.time}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: "rgba(0,243,255,0.07)", color: "rgba(0,243,255,0.7)" }}>
                    ✓ done
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/tasks"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold font-mono transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(90deg,rgba(0,243,255,0.1),rgba(123,47,247,0.1))", border: "1px solid rgba(0,243,255,0.2)", color: "rgba(0,243,255,0.85)" }}>
              <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,243,255,0.7)" }} />
              Delegate a new task
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
