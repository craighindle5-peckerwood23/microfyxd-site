"use client";

import { useState, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   ACT 1 — WHO WE ARE / WHAT WE DO  (professional, brand story)
   ACT 2 — THE HANDOFF               (task delegation moment)
   ACT 3 — THE FREEDOM REEL         (cinematic lifestyle)
───────────────────────────────────────────────────────────── */
const SCENES = [
  // ── ACT 1: WHO WE ARE ──────────────────────────────────────
  {
    act: 1,
    actLabel: "WHO WE ARE",
    bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&fit=crop",
    bgPos: "center",
    overlay: "rgba(5,7,10,0.72)",
    headline: "Meet Microfyxd.",
    sub: "Your personal AI operations engine. Built for people who have better things to do.",
    tag: null,
    duration: 3400,
  },
  {
    act: 1,
    actLabel: "WHAT WE DO",
    bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85&fit=crop",
    bgPos: "center",
    overlay: "rgba(5,7,10,0.68)",
    headline: "We execute the grind.",
    sub: "Phone calls. Forms. Emails. Appointments. Schedule conflicts. Every operational task — handled automatically.",
    tag: null,
    duration: 3600,
  },
  {
    act: 1,
    actLabel: "HOW IT WORKS",
    bg: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=85&fit=crop",
    bgPos: "center top",
    overlay: "rgba(5,7,10,0.70)",
    headline: "You describe it once.",
    sub: "Microfyxd breaks it into steps, executes each one, detects conflicts in your schedule — and reports back.",
    tag: null,
    duration: 3400,
  },
  {
    act: 1,
    actLabel: "SCHEDULE-AWARE",
    bg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1600&q=85&fit=crop",
    bgPos: "center",
    overlay: "rgba(5,7,10,0.73)",
    headline: "Even knows your calendar.",
    sub: ""James needs picked up at 2pm. You're off at 2:15." Microfyxd sees it, flags it, and resolves it — before you ever ask.",
    tag: "SCHEDULE CONFLICT DETECTED · RESOLVING",
    tagColor: "rgba(255,160,0,0.85)",
    tagBg: "rgba(255,140,0,0.1)",
    tagBorder: "rgba(255,140,0,0.25)",
    duration: 3800,
  },

  // ── ACT 2: THE HANDOFF ─────────────────────────────────────
  {
    act: 2,
    actLabel: "THE HANDOFF",
    bg: "https://images.unsplash.com/photo-1484712401471-05c7215830eb?w=1600&q=85&fit=crop",
    bgPos: "center",
    overlay: "rgba(5,7,10,0.65)",
    headline: "Hand it all over.",
    sub: "6 tasks. 3 calls. 2 forms. 1 conflict. Delegated in seconds.",
    tag: "ALL TASKS DELEGATED · EXECUTING NOW",
    tagColor: "rgba(0,243,255,0.9)",
    tagBg: "rgba(0,243,255,0.07)",
    tagBorder: "rgba(0,243,255,0.2)",
    duration: 3200,
    delegating: true,
  },

  // ── ACT 3: THE FREEDOM REEL ───────────────────────────────
  {
    act: 3,
    actLabel: "YOUR TIME",
    bg: "https://images.unsplash.com/photo-1601019051979-c2c440e9e034?w=1600&q=85&fit=crop",
    bgPos: "center",
    overlay: "rgba(5,7,10,0.35)",
    headline: "Now go.",
    sub: "The water's warm. The jet ski is loaded.",
    tag: "MICROFYXD IS HANDLING IT",
    tagColor: "rgba(0,243,255,0.85)",
    tagBg: "rgba(0,243,255,0.07)",
    tagBorder: "rgba(0,243,255,0.18)",
    duration: 3000,
  },
  {
    act: 3,
    actLabel: "YOUR TIME",
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&fit=crop",
    bgPos: "center 30%",
    overlay: "rgba(5,7,10,0.38)",
    headline: "Hit the trail.",
    sub: "Dust. Speed. No phone calls waiting.",
    tag: "3 TASKS COMPLETED · 2 IN PROGRESS",
    tagColor: "rgba(0,243,255,0.85)",
    tagBg: "rgba(0,243,255,0.07)",
    tagBorder: "rgba(0,243,255,0.18)",
    duration: 2800,
  },
  {
    act: 3,
    actLabel: "YOUR TIME",
    bg: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&q=85&fit=crop",
    bgPos: "center",
    overlay: "rgba(5,7,10,0.42)",
    headline: "Just camp.",
    sub: "Friends. Fire. Not a form in sight.",
    tag: "INVOICE DISPUTE RESOLVED · SAVED $340",
    tagColor: "rgba(0,255,120,0.85)",
    tagBg: "rgba(0,255,100,0.06)",
    tagBorder: "rgba(0,255,100,0.2)",
    duration: 2800,
  },
  {
    act: 3,
    actLabel: "YOUR TIME",
    bg: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=85&fit=crop",
    bgPos: "center",
    overlay: "rgba(5,7,10,0.40)",
    headline: "Drive something fun.",
    sub: "Because weekends should feel like weekends.",
    tag: "APPOINTMENT RESCHEDULED · CONFIRMED",
    tagColor: "rgba(0,255,120,0.85)",
    tagBg: "rgba(0,255,100,0.06)",
    tagBorder: "rgba(0,255,100,0.2)",
    duration: 2800,
  },
  {
    act: 3,
    actLabel: "YOUR TIME",
    bg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=85&fit=crop",
    bgPos: "center",
    overlay: "rgba(5,7,10,0.45)",
    headline: "Make tonight count.",
    sub: "Dinner. Live music. A night out. Zero interruptions.",
    tag: "ALL 6 TASKS COMPLETE ✓",
    tagColor: "rgba(0,243,255,0.9)",
    tagBg: "rgba(0,243,255,0.07)",
    tagBorder: "rgba(0,243,255,0.2)",
    duration: 3200,
  },
  {
    act: 3,
    actLabel: "START NOW",
    bg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85&fit=crop",
    bgPos: "center",
    overlay: "rgba(5,7,10,0.55)",
    headline: "This is what we built it for.",
    sub: "Your life. Fully lived. Microfyxd handles the rest.",
    tag: null,
    duration: 3600,
    finale: true,
  },
];

type Scene = typeof SCENES[0];

export function IntroSlideshow({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [tagVisible, setTagVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [actChange, setActChange] = useState(false);

  const scene: Scene = SCENES[idx];
  const nextScene: Scene | undefined = SCENES[idx + 1];

  const advance = useCallback(() => {
    if (idx >= SCENES.length - 1) { onComplete(); return; }
    const prevAct = SCENES[idx].act;
    const nextAct = SCENES[idx + 1].act;
    setFade(false);
    setTagVisible(false);
    if (prevAct !== nextAct) setActChange(true);
    setTimeout(() => {
      setIdx(i => i + 1);
      setImgLoaded(false);
      setFade(true);
      setTimeout(() => setActChange(false), 600);
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
    const t = setTimeout(() => setTagVisible(true), 1200);
    return () => clearTimeout(t);
  }, [idx, scene.tag]);

  // Preload next image
  useEffect(() => {
    if (!nextScene) return;
    const img = new Image();
    img.src = nextScene.bg;
  }, [nextScene]);

  const progress = ((idx + 1) / SCENES.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#05070A]">

      {/* ── BG IMAGE ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover transition-opacity duration-700"
        style={{
          backgroundImage: `url(${scene.bg})`,
          backgroundPosition: scene.bgPos || "center",
          backgroundSize: "cover",
          opacity: fade && imgLoaded ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      />
      {/* preload trigger */}
      <img src={scene.bg} className="hidden" onLoad={() => setImgLoaded(true)} alt="" />

      {/* ── OVERLAY ────────────────────────────────────────────── */}
      <div className="absolute inset-0 transition-all duration-700"
        style={{ background: scene.overlay }} />

      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* ── ACT TRANSITION FLASH ───────────────────────────────── */}
      {actChange && (
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(0,243,255,0.04)", animation: "fadeUp 0.6s ease forwards" }} />
      )}

      {/* ── TOP BAR ────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 pt-5 flex items-center justify-between">
        {/* Logo */}
        <span className="font-grotesk font-bold text-base tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-[#7B2FF7]">
          Microfyxd
        </span>

        {/* Act label */}
        <span className="text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {scene.actLabel}
        </span>

        {/* Skip */}
        <button onClick={onComplete}
          className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
          style={{ color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.3)" }}>
          skip →
        </button>
      </div>

      {/* ── PROGRESS BAR ───────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-0.5 z-30">
        <div className="h-full transition-all duration-300 ease-linear"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, rgba(0,243,255,0.8), rgba(123,47,247,0.6))",
          }} />
      </div>

      {/* ── SCENE DOTS ─────────────────────────────────────────── */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 items-center">
        {SCENES.map((s, i) => (
          <div key={i} className="rounded-full transition-all duration-500"
            style={{
              width: i === idx ? "18px" : "5px",
              height: "5px",
              background: i < idx ? "rgba(0,243,255,0.5)"
                : i === idx ? "rgba(0,243,255,0.9)"
                : "rgba(255,255,255,0.15)",
            }} />
        ))}
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center"
        style={{ opacity: fade ? 1 : 0, transition: "opacity 0.5s ease" }}>

        {/* Act divider badge */}
        {scene.act === 2 && (
          <div className="mb-6 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase"
            style={{ background: "rgba(0,243,255,0.08)", border: "1px solid rgba(0,243,255,0.2)", color: "rgba(0,243,255,0.7)" }}>
            ⚡ delegating now
          </div>
        )}
        {scene.act === 3 && idx === 5 && (
          <div className="mb-6 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase"
            style={{ background: "rgba(0,255,100,0.06)", border: "1px solid rgba(0,255,100,0.2)", color: "rgba(0,255,140,0.7)" }}>
            ✓ you're free
          </div>
        )}

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-grotesk font-extrabold leading-tight mb-5 max-w-3xl"
          style={{
            color: "rgba(255,255,255,0.97)",
            textShadow: "0 2px 40px rgba(0,0,0,0.8)",
          }}>
          {scene.headline}
        </h2>

        {/* Subtext */}
        <p className="text-base md:text-lg font-inter leading-relaxed max-w-xl mb-8"
          style={{ color: "rgba(255,255,255,0.65)", textShadow: "0 1px 20px rgba(0,0,0,0.9)" }}>
          {scene.sub}
        </p>

        {/* Status tag */}
        {scene.tag && (
          <div className="px-5 py-2.5 rounded-xl font-mono text-sm transition-all duration-600"
            style={{
              background: scene.tagBg || "rgba(0,243,255,0.07)",
              border: `1px solid ${scene.tagBorder || "rgba(0,243,255,0.2)"}`,
              color: scene.tagColor || "rgba(0,243,255,0.85)",
              backdropFilter: "blur(8px)",
              opacity: tagVisible ? 1 : 0,
              transform: tagVisible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}>
            <span className="pulse-dot mr-2 w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: scene.tagColor || "rgba(0,243,255,0.8)", verticalAlign: "middle" }} />
            {scene.tag}
          </div>
        )}

        {/* Finale CTA */}
        {scene.finale && (
          <button onClick={onComplete}
            className="mt-8 px-8 py-4 rounded-xl font-grotesk font-bold text-base transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(0,243,255,0.15), rgba(123,47,247,0.15))",
              border: "1px solid rgba(0,243,255,0.3)",
              color: "rgba(0,243,255,0.95)",
              boxShadow: "0 0 40px rgba(0,243,255,0.1)",
              backdropFilter: "blur(12px)",
            }}>
            <span className="pulse-dot mr-2 w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: "rgba(0,243,255,0.8)", verticalAlign: "middle" }} />
            Start delegating →
          </button>
        )}
      </div>

      {/* ── TAP TO ADVANCE ─────────────────────────────────────── */}
      {!scene.finale && (
        <button onClick={advance}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 transition-all"
          style={{ color: "rgba(255,255,255,0.25)" }}>
          <span className="text-xs font-mono">tap to continue</span>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
