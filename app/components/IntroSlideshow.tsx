"use client";

import { useState, useEffect, useCallback } from "react";

const SCENES = [
  {
    id: 0,
    bg: "from-[#0a1628] to-[#08080D]",
    emoji: "🛥️",
    title: "It's Friday afternoon.",
    sub: "Jet ski loaded. Truck running. Ready to go.",
    task: null,
    taskLabel: null,
  },
  {
    id: 1,
    bg: "from-[#0d1a10] to-[#08080D]",
    emoji: "📞",
    title: "But your phone starts.",
    sub: "Vendor call. Insurance follow-up. 3 emails. An appointment.",
    task: "Call vendor re: invoice #4821",
    taskLabel: "INCOMING",
  },
  {
    id: 2,
    bg: "from-[#1a0d0d] to-[#08080D]",
    emoji: "📋",
    title: "Then the forms.",
    sub: "Warranty paperwork. Benefits enrollment. That thing HR keeps asking for.",
    task: "Fill out warranty form at harbormarine.com/warranty",
    taskLabel: "PENDING",
  },
  {
    id: 3,
    bg: "from-[#120d1a] to-[#08080D]",
    emoji: "📅",
    title: "And the schedule conflict.",
    sub: "James needs picked up from soccer at 2pm. You're off at 2:15.",
    task: "James — soccer pickup 2:00pm · You're free at 2:15",
    taskLabel: "CONFLICT",
  },
  {
    id: 4,
    bg: "from-[#0a1628] to-[#08080D]",
    emoji: "⚡",
    title: "You hand it all to Microfyxd.",
    sub: "Every call. Every form. Every conflict — handled automatically.",
    task: "All 6 tasks delegated → executing now",
    taskLabel: "DELEGATED",
    highlight: true,
  },
  {
    id: 5,
    bg: "from-[#081a10] to-[#08080D]",
    emoji: "🏕️",
    title: "You go live your life.",
    sub: "Weekend camping. Dirt bikes. Dinner out. A movie. A hike. Zero interruptions.",
    task: null,
    taskLabel: null,
    finale: true,
  },
];

export function IntroSlideshow({ onComplete }: { onComplete: () => void }) {
  const [scene, setScene] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [taskVisible, setTaskVisible] = useState(false);
  const [delegating, setDelegating] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const advance = useCallback(() => {
    if (scene >= SCENES.length - 1) {
      onComplete();
      return;
    }
    setTransitioning(true);
    setTaskVisible(false);
    setTimeout(() => {
      setScene(s => s + 1);
      setTransitioning(false);
      setDelegating(false);
    }, 400);
  }, [scene, onComplete]);

  // Auto-advance
  useEffect(() => {
    const s = SCENES[scene];
    const delay = s.finale ? 2800 : s.highlight ? 2200 : s.task ? 2000 : 1600;
    const t = setTimeout(advance, delay);
    return () => clearTimeout(t);
  }, [scene, advance]);

  // Task card pop-in
  useEffect(() => {
    if (SCENES[scene].task) {
      const t = setTimeout(() => setTaskVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, [scene]);

  // Delegating animation on scene 4
  useEffect(() => {
    if (scene === 4) {
      const t = setTimeout(() => setDelegating(true), 300);
      return () => clearTimeout(t);
    }
  }, [scene]);

  const s = SCENES[scene];

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-400 bg-gradient-to-br ${s.bg}`}
      style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.4s ease, background 0.8s ease" }}
    >
      {/* Skip */}
      {!skipped && (
        <button
          onClick={() => { setSkipped(true); onComplete(); }}
          className="absolute top-6 right-6 text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
          style={{ color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          skip intro →
        </button>
      )}

      {/* Progress dots */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
        {SCENES.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-500"
            style={{
              width: i === scene ? "20px" : "6px",
              height: "6px",
              background: i <= scene ? "rgba(0,243,255,0.7)" : "rgba(255,255,255,0.12)",
            }} />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center px-8 max-w-lg">
        {/* Big emoji scene */}
        <div className="text-8xl mb-8 float" style={{ filter: s.highlight ? "drop-shadow(0 0 30px rgba(0,243,255,0.5))" : "none" }}>
          {s.emoji}
        </div>

        <h2 className="text-3xl md:text-4xl font-grotesk font-extrabold mb-4"
          style={{ color: "rgba(255,255,255,0.95)" }}>
          {s.title}
        </h2>
        <p className="text-base font-inter leading-relaxed mb-8"
          style={{ color: "rgba(255,255,255,0.5)" }}>
          {s.sub}
        </p>

        {/* Task card */}
        {s.task && (
          <div
            className="mx-auto rounded-xl px-5 py-3 transition-all duration-500 text-left max-w-sm"
            style={{
              background: s.highlight ? "rgba(0,243,255,0.08)" : "rgba(255,255,255,0.04)",
              border: s.highlight ? "1px solid rgba(0,243,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
              opacity: taskVisible ? 1 : 0,
              transform: taskVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded"
                style={{
                  background: s.highlight ? "rgba(0,243,255,0.15)" : s.taskLabel === "CONFLICT" ? "rgba(255,100,0,0.15)" : "rgba(255,255,255,0.06)",
                  color: s.highlight ? "rgba(0,243,255,0.9)" : s.taskLabel === "CONFLICT" ? "rgba(255,140,0,0.9)" : "rgba(255,255,255,0.4)",
                }}>
                {s.taskLabel}
              </span>
              {delegating && s.highlight && (
                <span className="text-xs font-mono shimmer-text">executing...</span>
              )}
            </div>
            <p className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.7)" }}>{s.task}</p>
          </div>
        )}

        {/* Finale extra scenes */}
        {s.finale && (
          <div className="flex justify-center gap-6 mt-6 text-4xl">
            {["🚴", "🎬", "🥾", "🍽️", "⛺"].map((e, i) => (
              <span key={i} className="float" style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
            ))}
          </div>
        )}
      </div>

      {/* Tap to advance */}
      <button
        onClick={advance}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono transition-all"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        {scene === SCENES.length - 1 ? "Enter Microfyxd →" : "tap to continue"}
      </button>
    </div>
  );
}
