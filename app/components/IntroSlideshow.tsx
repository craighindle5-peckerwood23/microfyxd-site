"use client";

import { useState, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   MICROFYXD — Cinematic Commercial Intro
   AI-generated photorealistic scenes
   ACT 1: Who we are / What we do
   ACT 2: The handoff moment
   ACT 3: The freedom — life automated
───────────────────────────────────────────────────────────── */

const SCENES = [
  // ── ACT 1: WHO WE ARE ──────────────────────────────────────
  {
    act: 1,
    actLabel: "WHO WE ARE",
    bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&fit=crop",
    overlay: "rgba(5,7,10,0.75)",
    headline: "Meet Microfyxd.",
    sub: "Your personal AI operations engine. Built for people who have better things to do.",
    tag: null,
    duration: 3400,
  },
  {
    act: 1,
    actLabel: "WHAT WE DO",
    bg: "https://media.base44.com/images/public/69ed288f46f536771144e51e/2b78f0c7e_generated_image.png",
    overlay: "rgba(5,7,10,0.55)",
    headline: "You describe it once.",
    sub: "Phone calls. Forms. Emails. Appointments. Schedule conflicts. Every operational task — delegated in seconds.",
    tag: null,
    duration: 3600,
  },
  {
    act: 1,
    actLabel: "HOW IT WORKS",
    bg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1600&q=85&fit=crop",
    overlay: "rgba(5,7,10,0.72)",
    headline: "Even knows your calendar.",
    sub: "\"James needs picked up at 2pm. You\'re off at 2:15.\" Microfyxd sees it, flags it, resolves it.",
    tag: "SCHEDULE CONFLICT DETECTED · RESOLVING",
    tagColor: "rgba(255,160,0,0.9)",
    tagBg: "rgba(255,140,0,0.08)",
    tagBorder: "rgba(255,140,0,0.25)",
    duration: 3600,
  },

  // ── ACT 2: THE HANDOFF ─────────────────────────────────────
  {
    act: 2,
    actLabel: "THE HANDOFF",
    bg: "https://media.base44.com/images/public/69ed288f46f536771144e51e/9bb109c5f_generated_image.png",
    overlay: "rgba(5,7,10,0.42)",
    headline: "Friday afternoon.",
    sub: "Camping gear loaded. Dirt bike on the trailer. Kids are ready. So are you.",
    tag: null,
    duration: 3200,
  },
  {
    act: 2,
    actLabel: "THE HANDOFF",
    bg: "https://media.base44.com/images/public/69ed288f46f536771144e51e/60de2637c_generated_image.png",
    overlay: "rgba(5,7,10,0.45)",
    headline: "One tap. All delegated.",
    sub: "Vendor call. Insurance follow-up. Warranty form. Appointment. James\'s pickup conflict. All of it — handed off.",
    tag: "6 TASKS DELEGATED · EXECUTING NOW",
    tagColor: "rgba(0,243,255,0.9)",
    tagBg: "rgba(0,243,255,0.07)",
    tagBorder: "rgba(0,243,255,0.22)",
    duration: 3400,
    delegating: true,
  },

  // ── ACT 3: THE FREEDOM ─────────────────────────────────────
  {
    act: 3,
    actLabel: "YOUR TIME",
    bg: "https://media.base44.com/images/public/69ed288f46f536771144e51e/2020f0abb_generated_image.png",
    overlay: "rgba(5,7,10,0.28)",
    headline: "Go live your life.",
    sub: "The water is warm. The boat is in. Not a single notification waiting.",
    tag: "3 TASKS COMPLETED · 3 IN PROGRESS",
    tagColor: "rgba(0,243,255,0.85)",
    tagBg: "rgba(0,243,255,0.06)",
    tagBorder: "rgba(0,243,255,0.18)",
    duration: 3000,
  },
  {
    act: 3,
    actLabel: "YOUR TIME",
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&fit=crop",
    overlay: "rgba(5,7,10,0.32)",
    headline: "Hit the trail.",
    sub: "Dust. Speed. Zero phone calls waiting for you at the end of the run.",
    tag: "INVOICE DISPUTE RESOLVED · SAVED $340",
    tagColor: "rgba(0,255,120,0.85)",
    tagBg: "rgba(0,255,100,0.05)",
    tagBorder: "rgba(0,255,100,0.18)",
    duration: 2800,
  },
  {
    act: 3,
    actLabel: "YOUR TIME",
    bg: "https://media.base44.com/images/public/69ed288f46f536771144e51e/3ce387355_generated_image.png",
    overlay: "rgba(5,7,10,0.30)",
    headline: "Just be here.",
    sub: "Friends. Laughter. Not a form in sight. This is what we built it for.",
    tag: "ALL 6 TASKS COMPLETE ✓",
    tagColor: "rgba(0,243,255,0.9)",
    tagBg: "rgba(0,243,255,0.07)",
    tagBorder: "rgba(0,243,255,0.2)",
    duration: 3000,
  },

  // ── FINALE ─────────────────────────────────────────────────
  {
    act: 3,
    actLabel: "MICROFYXD",
    bg: "https://media.base44.com/images/public/69ed288f46f536771144e51e/e8b8fbe25_generated_image.png",
    overlay: "rgba(5,7,10,0.55)",
    headline: "Life, Automated.",
    sub: "Microfyxd handles everything you shouldn\'t have to.",
    tag: null,
    duration: 4000,
    finale: true,
  },
];

type Scene = typeof SCENES[0] & { tagColor?: string; tagBg?: string; tagBorder?: string; delegating?: boolean; finale?: boolean };

export function IntroSlideshow({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [tagVisible, setTagVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [actBadge, setActBadge] = useState(false);

  const scene = SCENES[idx] as Scene;
  const nextScene = SCENES[idx + 1] as Scene | undefined;

  const advance = useCallback(() => {
    if (idx >= SCENES.length - 1) { onComplete(); return; }
    const prevAct = SCENES[idx].act;
    const nextAct = SCENES[idx + 1].act;
    setFade(false);
    setTagVisible(false);
    if (prevAct !== nextAct) setActBadge(true);
    setTimeout(() => {
      setIdx(i => i + 1);
      setImgLoaded(false);
      setFade(true);
      setTimeout(() => setActBadge(false), 800);
    }, 500);
  }, [idx, onComplete]);

  // Auto-advance
  useEffect(() => {
    const t = setTimeout(advance, scene.duration);
    return () => clearTimeout(t);
  }, [idx, advance, scene.duration]);

  // Tag pop-in
  useEffect(() => {
    if (!scene.tag) return;
    const t = setTimeout(() => setTagVisible(true), 1400);
    return () => clearTimeout(t);
  }, [idx, scene.tag]);

  // Preload next
  useEffect(() => {
    if (!nextScene) return;
    const img = new Image();
    img.src = nextScene.bg;
  }, [nextScene]);

  const progress = ((idx + 1) / SCENES.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#05070A]">

      {/* BG image */}
      <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url(${scene.bg})`,
          opacity: fade && imgLoaded ? 1 : 0,
        }} />
      <img src={scene.bg} className="hidden" onLoad={() => setImgLoaded(true)} alt="" />

      {/* Overlay */}
      <div className="absolute inset-0 transition-all duration-700"
        style={{ background: scene.overlay }} />

      {/* Cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />

      {/* Act-change flash */}
      {actBadge && (
        <div className="absolute inset-0 z-10 pointer-events-none animate-pulse"
          style={{ background: "rgba(0,243,255,0.03)" }} />
      )}

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 z-30">
        <div className="h-full transition-all duration-500 ease-linear"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg,rgba(0,243,255,0.9),rgba(123,47,247,0.7))" }} />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 pt-6 flex items-center justify-between">
        <span className="font-grotesk font-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-[#7B2FF7]">
          Microfyxd
        </span>

        <div className="flex items-center gap-3">
          {/* Scene dots */}
          <div className="flex gap-1.5 items-center">
            {SCENES.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-500"
                style={{
                  width: i === idx ? "16px" : "4px",
                  height: "4px",
                  background: i < idx ? "rgba(0,243,255,0.5)" : i === idx ? "rgba(0,243,255,1)" : "rgba(255,255,255,0.15)",
                }} />
            ))}
          </div>

          <span className="text-xs font-mono px-2.5 py-1 rounded-full hidden sm:block"
            style={{ background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {scene.actLabel}
          </span>

          <button onClick={onComplete}
            className="text-xs font-mono px-3 py-1.5 rounded-lg"
            style={{ color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.35)" }}>
            skip →
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center"
        style={{ opacity: fade ? 1 : 0, transition: "opacity 0.5s ease" }}>

        {scene.act === 2 && idx === 4 && (
          <div className="mb-5 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase"
            style={{ background: "rgba(0,243,255,0.07)", border: "1px solid rgba(0,243,255,0.2)", color: "rgba(0,243,255,0.7)" }}>
            ⚡ handing off now
          </div>
        )}

        <h2 className="text-4xl md:text-6xl font-grotesk font-extrabold leading-tight mb-5 max-w-3xl"
          style={{ color: "rgba(255,255,255,0.97)", textShadow: "0 2px 50px rgba(0,0,0,0.9)" }}>
          {scene.headline}
        </h2>

        <p className="text-base md:text-lg font-inter leading-relaxed max-w-xl mb-8"
          style={{ color: "rgba(255,255,255,0.6)", textShadow: "0 1px 24px rgba(0,0,0,0.95)" }}>
          {scene.sub}
        </p>

        {scene.tag && (
          <div className="px-5 py-2.5 rounded-xl font-mono text-sm"
            style={{
              background: scene.tagBg ?? "rgba(0,243,255,0.07)",
              border: `1px solid ${scene.tagBorder ?? "rgba(0,243,255,0.2)"}`,
              color: scene.tagColor ?? "rgba(0,243,255,0.85)",
              backdropFilter: "blur(10px)",
              opacity: tagVisible ? 1 : 0,
              transform: tagVisible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.96)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
            }}>
            <span className="pulse-dot mr-2 w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: scene.tagColor ?? "rgba(0,243,255,0.8)", verticalAlign: "middle" }} />
            {scene.tag}
          </div>
        )}

        {scene.finale && (
          <button onClick={onComplete}
            className="mt-10 px-8 py-4 rounded-xl font-grotesk font-bold text-base transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg,rgba(0,243,255,0.14),rgba(123,47,247,0.14))",
              border: "1px solid rgba(0,243,255,0.3)",
              color: "rgba(0,243,255,0.95)",
              boxShadow: "0 0 40px rgba(0,243,255,0.12)",
              backdropFilter: "blur(12px)",
            }}>
            <span className="pulse-dot mr-2 w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: "rgba(0,243,255,0.8)", verticalAlign: "middle" }} />
            Start delegating →
          </button>
        )}
      </div>

      {/* Tap to continue */}
      {!scene.finale && (
        <button onClick={advance}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
          style={{ color: "rgba(255,255,255,0.2)" }}>
          <span className="text-xs font-mono">tap to continue</span>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
