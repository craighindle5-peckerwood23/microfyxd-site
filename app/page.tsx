"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { SiteNav } from "@/app/components/SiteNav";
import { HeroCanvas } from "@/app/components/HeroCanvas";
import { IntroSlideshow } from "@/app/components/IntroSlideshow";

/* ── Ghost Bento Card ─────────────────────────────────────────── */
function FeatureCard({ icon, title, desc, svgPath, delay }: {
  icon: string; title: string; desc: string; svgPath: string; delay: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="ghost-card relative rounded-2xl p-7 cursor-default overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        animationDelay: delay,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 80 40" className="absolute top-4 right-4 w-16 h-8" fill="none"
        stroke="rgba(0,243,255,0.6)" strokeWidth="1" strokeLinecap="round"
        style={{ opacity: hovered ? 0.5 : 0.12 }}>
        <path d={svgPath} strokeDasharray="120" strokeDashoffset={hovered ? "0" : "120"}
          style={{ transition: "stroke-dashoffset 1.2s ease" }} />
      </svg>
      {hovered && <div className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ boxShadow: "inset 0 0 30px rgba(0,243,255,0.04)" }} />}
      <span className="text-2xl mb-4 block">{icon}</span>
      <h3 className="font-grotesk font-bold text-base mb-2" style={{ color: "var(--text-1)" }}>{title}</h3>
      <p className="text-sm font-inter leading-relaxed" style={{ color: "var(--text-2)" }}>{desc}</p>
    </div>
  );
}

/* ── Pricing Card ─────────────────────────────────────────────── */
function PricingCard({ name, price, desc, features, cta, href, breathe }: {
  name: string; price: string; desc: string; features: string[]; cta: string; href: string; breathe?: boolean;
}) {
  return (
    <div className={`relative rounded-2xl p-8 flex flex-col transition-all duration-500 ${breathe ? "breathe" : ""}`}
      style={{
        background: breathe ? "rgba(0,243,255,0.03)" : "rgba(255,255,255,0.02)",
        border: breathe ? "1px solid rgba(0,243,255,0.2)" : "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
      }}>
      {breathe && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold font-mono tracking-widest uppercase"
        style={{ background: "rgba(0,243,255,0.1)", color: "rgba(0,243,255,0.8)", border: "1px solid rgba(0,243,255,0.2)" }}>
        Most Popular
      </span>}
      <div className="mb-6">
        <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-3)" }}>{name}</p>
        <div className="flex items-end gap-1">
          <span className="text-5xl font-grotesk font-extrabold" style={{ color: "var(--text-1)" }}>{price}</span>
          <span className="text-sm mb-2 font-inter" style={{ color: "var(--text-2)" }}>/mo</span>
        </div>
        <p className="text-sm font-inter mt-2" style={{ color: "var(--text-2)" }}>{desc}</p>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm font-inter">
            <span style={{ color: "rgba(0,243,255,0.6)" }}>✓</span>
            <span style={{ color: "var(--text-2)" }}>{f}</span>
          </li>
        ))}
      </ul>
      <Link href={href} className="px-6 py-3 rounded-xl text-sm font-semibold font-inter text-center transition-all duration-300"
        style={{
          background: breathe ? "linear-gradient(90deg,rgba(0,243,255,0.15),rgba(123,47,247,0.15))" : "rgba(255,255,255,0.04)",
          border: breathe ? "1px solid rgba(0,243,255,0.25)" : "1px solid rgba(255,255,255,0.06)",
          color: breathe ? "rgba(0,243,255,0.9)" : "var(--text-2)",
        }}>{cta}</Link>
    </div>
  );
}

/* ── Live Delegate Ticker ─────────────────────────────────────── */
const TICKER_TASKS = [
  "📞 Calling Harbor Marine re: invoice #4821...",
  "📋 Filing warranty form at harbormarine.com...",
  "📅 Resolving pickup conflict — James 2pm soccer...",
  "✉️  Sending follow-up email to Dr. Chen office...",
  "📆 Rescheduling Tuesday appointment...",
  "🔁 Running weekly vendor check-in workflow...",
  "📞 Left voicemail — logging to task history...",
  "✅ Invoice dispute resolved. Saved $340.",
];

function DelegateTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % TICKER_TASKS.length); setVisible(true); }, 400);
    }, 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl mx-auto max-w-sm"
      style={{ background: "rgba(0,243,255,0.03)", border: "1px solid rgba(0,243,255,0.1)" }}>
      <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(0,243,255,0.7)" }} />
      <span className="text-xs font-mono transition-all duration-400"
        style={{ color: "rgba(0,243,255,0.6)", opacity: visible ? 1 : 0 }}>
        {TICKER_TASKS[idx]}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  // Check if already seen this session
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("intro_seen")) {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    if (typeof window !== "undefined") sessionStorage.setItem("intro_seen", "1");
    setIntroComplete(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--void)" }}>
      {/* Cinematic intro — plays once per session */}
      {!introComplete && <IntroSlideshow onComplete={handleIntroComplete} />}

      {/* Ambient scan line */}
      <div className="scanline" />
      <SiteNav />

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-40 text-center overflow-hidden">
        {/* Void grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,243,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,243,255,0.025) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: 600, height: 600, background: "radial-gradient(ellipse,rgba(0,243,255,0.05) 0%,transparent 70%)", borderRadius: "50%" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: 400, height: 400, background: "radial-gradient(ellipse,rgba(123,47,247,0.06) 0%,transparent 70%)", borderRadius: "50%" }} />

        <div className="relative z-10 w-full max-w-3xl mx-auto">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10 fade-up"
            style={{ background: "rgba(0,243,255,0.04)", border: "1px solid rgba(0,243,255,0.12)" }}>
            <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgba(0,243,255,0.7)" }} />
            <span className="text-xs font-mono tracking-widest" style={{ color: "rgba(0,243,255,0.6)" }}>
              SYSTEM ONLINE · GROQ · LLAMA 3.1 · SCHEDULE-AWARE
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-[4.5rem] font-grotesk font-extrabold leading-[1.06] tracking-tight mb-4 fade-up-delay-1"
            style={{ color: "var(--text-1)" }}>
            Go live your life.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] via-[#7B2FF7] to-[#00F3FF]"
              style={{ backgroundSize: "200% auto", animation: "shimmer-row 4s linear infinite" }}>
              We handle the rest.
            </span>
          </h1>

          <p className="text-lg font-inter leading-relaxed mb-6 fade-up-delay-2 mx-auto"
            style={{ color: "var(--text-2)", maxWidth: "540px" }}>
            Phone calls. Forms. Emails. Appointments. Schedule conflicts.
            Hand it all to Microfyxd and go — camping, riding, dinner, a movie, anything.
          </p>

          {/* Live delegate ticker */}
          <div className="mb-12 fade-up-delay-2">
            <DelegateTicker />
          </div>

          {/* WHISPER GLASS CANVAS */}
          <div className="fade-up-delay-3">
            <HeroCanvas />
          </div>

          {/* Stats */}
          <div className="mt-28 flex flex-wrap justify-center gap-8 fade-up-delay-3">
            {[
              { label: "Avg task time", value: "< 4s" },
              { label: "Tasks delegated", value: "10k+" },
              { label: "Conflicts resolved", value: "100%" },
              { label: "Powered by", value: "Groq LPU" },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-grotesk font-bold" style={{ color: "var(--text-1)" }}>{s.value}</span>
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-3)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LIFE SCENES STRIP ════════════════════════════════════ */}
      <section className="w-full py-16 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <p className="text-center text-xs font-mono tracking-widest uppercase mb-8" style={{ color: "var(--text-3)" }}>
          What you could be doing instead
        </p>
        <div className="flex gap-6 px-8 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
          {[
            { emoji: "🛥️", label: "Jet skiing" },
            { emoji: "🚴", label: "Dirt bikes" },
            { emoji: "⛺", label: "Camping" },
            { emoji: "🎬", label: "Movies" },
            { emoji: "🥾", label: "Hiking" },
            { emoji: "🍽️", label: "Dinner out" },
            { emoji: "🏕️", label: "Weekend away" },
            { emoji: "⚽", label: "James's game" },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center gap-2 flex-shrink-0 group cursor-default">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110 float"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                {item.emoji}
              </div>
              <span className="text-xs font-mono" style={{ color: "var(--text-3)" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURE GHOST BENTO ══════════════════════════════════ */}
      <section className="w-full px-6 py-28 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-3)" }}>Capabilities · hover to reveal</p>
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold" style={{ color: "var(--text-1)" }}>Dormant until you need them.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "⚡", title: "Task Execution Engine", desc: "Give it a goal. It plans every step, executes, and returns a structured log.", svgPath: "M5 20 Q20 5 40 20 Q60 35 75 15", delay: "0s" },
            { icon: "📅", title: "Schedule-Aware AI", desc: "Add your calendar context. Microfyxd detects conflicts, finds solutions, and adjusts automatically.", svgPath: "M5 30 L20 10 L35 25 L50 8 L65 20 L75 12", delay: "0.1s" },
            { icon: "📞", title: "Phone Automation", desc: "Microfyxd dials, speaks a script, listens, and logs — you never touch the phone.", svgPath: "M10 35 Q20 5 40 20 Q55 32 70 10", delay: "0.2s" },
            { icon: "📋", title: "Form & File Handler", desc: "Upload any doc or form URL. Microfyxd reads, fills, submits, and confirms.", svgPath: "M5 20 L20 20 L20 10 L40 10 L40 30 L60 30 L60 20 L75 20", delay: "0.3s" },
            { icon: "✉️", title: "Email & Message Engine", desc: "Draft, send, follow up, reply. Full thread management — on your behalf.", svgPath: "M5 20 Q25 5 40 20 Q55 35 75 20", delay: "0.4s" },
            { icon: "🔁", title: "Workflow Builder", desc: "Chain tasks. Set triggers. Run on schedule. The whole operation in one canvas.", svgPath: "M10 25 L25 10 L40 25 L40 35 L25 35 L10 35 Z", delay: "0.5s" },
          ].map(card => <FeatureCard key={card.title} {...card} />)}
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <section className="w-full px-6 py-28" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-3)" }}>Process</p>
          <h2 className="text-4xl font-grotesk font-bold mb-16" style={{ color: "var(--text-1)" }}>From thought to execution.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-7 left-1/4 right-1/4 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(0,243,255,0.2),transparent)" }} />
            {[
              { n: "01", title: "Describe", desc: "Type what you need. Add your schedule constraints. No syntax, no setup." },
              { n: "02", title: "Execute", desc: "Microfyxd plans micro-steps, checks your calendar, and runs every operation." },
              { n: "03", title: "Review", desc: "Structured log: what ran, what returned, what needs your eye." },
            ].map(s => (
              <div key={s.n} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 font-grotesk font-bold text-sm"
                  style={{ background: "rgba(0,243,255,0.04)", border: "1px solid rgba(0,243,255,0.15)", color: "rgba(0,243,255,0.7)" }}>
                  {s.n}
                </div>
                <h3 className="font-grotesk font-bold text-xl mb-2" style={{ color: "var(--text-1)" }}>{s.title}</h3>
                <p className="text-sm font-inter leading-relaxed" style={{ color: "var(--text-2)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══════════════════════════════════════════════ */}
      <section className="w-full px-6 py-28 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-3)" }}>Pricing</p>
          <h2 className="text-4xl font-grotesk font-bold mb-4" style={{ color: "var(--text-1)" }}>Upgrade the frame's capacity.</h2>
          <p className="font-inter" style={{ color: "var(--text-2)" }}>Not a purchase. An expansion.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <PricingCard name="Starter" price="$9.99" href="/pricing"
            desc="For individual operators."
            features={["Core operator console","3 active workflows","Basic task engine","Schedule context support"]}
            cta="Start operating" />
          <PricingCard name="Pro" price="$29.99" href="/pricing" breathe
            desc="For serious operators."
            features={["Everything in Starter","15 active workflows","Phone automation","File & form handler","Full schedule AI","Priority queue"]}
            cta="Go Pro" />
          <PricingCard name="Operator" price="$79.99" href="/pricing"
            desc="High-volume. No limits."
            features={["Everything in Pro","Unlimited workflows","Custom integrations","SLA guarantees","Dedicated support"]}
            cta="Go Operator" />
        </div>
        <div className="mt-6 rounded-2xl p-10 flex flex-col items-center justify-center text-center"
          style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}>
          <div className="pulse-dot w-1.5 h-1.5 rounded-full mb-4" style={{ background: "rgba(0,243,255,0.5)" }} />
          <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>Your specific scale. Defined here.</p>
          <Link href="/pricing" className="mt-4 text-xs font-mono transition-colors hover:text-white"
            style={{ color: "rgba(0,243,255,0.4)" }}>Talk to us →</Link>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════ */}
      <section className="w-full px-6 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%,rgba(0,243,255,0.05) 0%,transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-5xl font-grotesk font-extrabold mb-6" style={{ color: "var(--text-1)" }}>
            Go load the truck.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-[#7B2FF7]">
              We've got Monday.
            </span>
          </h2>
          <p className="font-inter mb-10" style={{ color: "var(--text-2)" }}>
            Every call. Every form. Every conflict. Handled before you hit the highway.
          </p>
          <Link href="/tasks"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-grotesk font-bold text-base transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg,rgba(0,243,255,0.12),rgba(123,47,247,0.12))", border: "1px solid rgba(0,243,255,0.25)", color: "rgba(0,243,255,0.9)", boxShadow: "0 0 30px rgba(0,243,255,0.08)" }}>
            <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgba(0,243,255,0.7)" }} />
            Delegate your first task
          </Link>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <footer className="w-full border-t px-6 py-10 flex flex-col items-center gap-4"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <p className="text-xs font-mono" style={{ color: "var(--text-3)" }}>© {new Date().getFullYear()} Microfyxd · Built for operators</p>
        <div className="flex gap-8">
          {[{href:"/pricing",label:"Pricing"},{href:"/tasks",label:"Tasks"},{href:"/upgrade",label:"Console"},{href:"/marketplace",label:"Marketplace"}].map(l => (
            <Link key={l.href} href={l.href} className="text-xs font-mono transition-colors hover:text-white" style={{ color: "var(--text-3)" }}>{l.label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
