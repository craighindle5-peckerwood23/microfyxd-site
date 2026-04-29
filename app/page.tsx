"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SiteNav } from "@/app/components/SiteNav";
import Capabilities from "@/app/components/capabilities";
import MicroTaskEngine from "@/app/components/microtaskengine";
import FileAnalyzer from "@/app/components/fileanalyzer";
import WorkflowBuilder from "@/app/components/workflowbuilder";
import PoweredByGroq from "@/app/components/poweredbygroq";
import FinalCTA from "@/app/components/finalcta";

const TYPED_PHRASES = [
  "Execute complex operations in seconds.",
  "Automate phone calls, forms, and workflows.",
  "Analyze files with operator-grade precision.",
  "Your AI that actually does the work.",
];

function TypedHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPED_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 40);
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 18);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % TYPED_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EE9D1] via-[#1BC7F1] to-[#007BFF]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070A] text-white overflow-x-hidden">
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-20 text-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#1BC7F1 1px, transparent 1px), linear-gradient(90deg, #1BC7F1 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#007BFF]/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1BC7F1]/30 bg-[#1BC7F1]/5 text-[#1BC7F1] text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2EE9D1] animate-pulse" />
            Powered by Groq · LLaMA 3.1 · Operator-Grade AI
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-grotesk font-extrabold leading-[1.08] tracking-tight mb-6">
            Microfyxd
            <br />
            <TypedHero />
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-inter leading-relaxed">
            The AI personal assistant engine that breaks tasks down, executes them in the real world,
            and reports back — phone calls, form submissions, file analysis, and full workflow automation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/upgrade"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#2EE9D1] via-[#1BC7F1] to-[#007BFF] text-black font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-[#1BC7F1]/20"
            >
              Start Operating Free
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-base hover:border-[#1BC7F1] hover:text-white transition-colors"
            >
              View Pricing
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-zinc-500 text-sm font-inter">
            {["No contracts", "Cancel anytime", "Groq-accelerated", "Built for operators"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-[#2EE9D1]">✓</span> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 text-xs animate-bounce">
          <span>scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── FEATURE BENTO ───────────────────────────────────────── */}
      <section className="w-full px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold">
            One platform. Every operation.
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto font-inter">
            Microfyxd is your personal AI operator — not just a chatbot. It takes action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: "⚡",
              title: "Task Execution Engine",
              desc: "Give it a goal. It breaks it into steps, runs them automatically, and returns results — phone calls, form fills, API calls.",
              gradient: "from-[#2EE9D1]/10 to-transparent",
              border: "border-[#2EE9D1]/20",
            },
            {
              icon: "📂",
              title: "File Analyzer",
              desc: "Upload any document. Get structured extraction, summaries, key data points — powered by Groq's sub-second inference.",
              gradient: "from-[#1BC7F1]/10 to-transparent",
              border: "border-[#1BC7F1]/20",
            },
            {
              icon: "🔁",
              title: "Workflow Builder",
              desc: "Chain tasks into repeatable workflows. Set triggers, conditions, and actions. Run them on demand or on a schedule.",
              gradient: "from-[#007BFF]/10 to-transparent",
              border: "border-[#007BFF]/20",
            },
            {
              icon: "📞",
              title: "Phone Call Automation",
              desc: "Need to call a vendor, shop, or service? Microfyxd dials for you, runs a script, and logs what happened.",
              gradient: "from-[#7B2FF7]/10 to-transparent",
              border: "border-[#7B2FF7]/20",
            },
            {
              icon: "🛠️",
              title: "Operator Console",
              desc: "A clean, dark command interface to manage tasks, view logs, check status, and run new operations instantly.",
              gradient: "from-[#F7872F]/10 to-transparent",
              border: "border-[#F7872F]/20",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              desc: "Your data stays yours. Supabase-backed auth, row-level security, and encrypted storage — no exceptions.",
              gradient: "from-[#2EE9D1]/10 to-transparent",
              border: "border-[#2EE9D1]/20",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-xl border ${card.border} bg-gradient-to-br ${card.gradient} p-6 hover:scale-[1.02] transition-transform`}
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-grotesk font-bold mb-2">{card.title}</h3>
              <p className="text-zinc-400 text-sm font-inter leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section className="w-full px-6 py-24 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-grotesk font-bold mb-4">How it works</h2>
          <p className="text-zinc-400 font-inter mb-16">Three steps from request to result.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Describe the task", desc: "Type what you need done in plain language — as simple or complex as you want." },
              { step: "02", title: "AI plans & executes", desc: "Microfyxd breaks it into micro-steps and executes each one — calling, submitting, analyzing." },
              { step: "03", title: "Review results", desc: "Get a clean execution log with status, outputs, and next actions — all in your console." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full border border-[#1BC7F1]/40 flex items-center justify-center text-[#1BC7F1] font-grotesk font-bold text-lg mb-4">
                  {s.step}
                </div>
                <h3 className="font-grotesk font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-zinc-400 text-sm font-inter leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ──────────────────────────────────────── */}
      <section className="w-full px-6 py-24 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-grotesk font-bold mb-4">Operator pricing. No fluff.</h2>
        <p className="text-zinc-400 font-inter mb-12">Start free. Scale when you need it.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Starter", price: "$9.99", period: "/mo", desc: "Core console, basic workflows, up to 3 active.", cta: "Get Started", highlight: false },
            { name: "Pro", price: "$29.99", period: "/mo", desc: "Everything in Starter + file analyzer, 15 workflows, priority support.", cta: "Go Pro", highlight: true },
            { name: "Operator", price: "$79.99", period: "/mo", desc: "Full platform, custom workflows, SLAs, dedicated support.", cta: "Go Operator", highlight: false },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 border flex flex-col items-center ${
                plan.highlight
                  ? "border-[#1BC7F1] bg-[#1BC7F1]/5 scale-105 shadow-lg shadow-[#1BC7F1]/10"
                  : "border-zinc-800 bg-zinc-900/40"
              }`}
            >
              {plan.highlight && (
                <span className="text-xs font-bold uppercase tracking-widest text-[#1BC7F1] mb-3">Most Popular</span>
              )}
              <h3 className="text-xl font-grotesk font-bold mb-1">{plan.name}</h3>
              <div className="text-4xl font-grotesk font-extrabold mt-2 mb-1">
                {plan.price}<span className="text-lg text-zinc-400 font-normal">{plan.period}</span>
              </div>
              <p className="text-zinc-400 text-sm font-inter my-4 leading-relaxed">{plan.desc}</p>
              <Link
                href="/pricing"
                className={`mt-auto px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  plan.highlight
                    ? "bg-gradient-to-r from-[#2EE9D1] to-[#007BFF] text-black"
                    : "border border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPONENTS ──────────────────────────────────────────── */}
      <PoweredByGroq />
      <Capabilities />
      <MicroTaskEngine />
      <FileAnalyzer />
      <WorkflowBuilder />
      <FinalCTA />

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="w-full border-t border-zinc-900 py-10 px-6 text-center text-zinc-600 text-sm font-inter">
        <p>© {new Date().getFullYear()} Microfyxd. Built for operators.</p>
        <div className="flex justify-center gap-6 mt-3">
          <Link href="/pricing" className="hover:text-zinc-400 transition-colors">Pricing</Link>
          <Link href="/upgrade" className="hover:text-zinc-400 transition-colors">Console</Link>
          <Link href="/marketplace" className="hover:text-zinc-400 transition-colors">Marketplace</Link>
        </div>
      </footer>
    </div>
  );
}
