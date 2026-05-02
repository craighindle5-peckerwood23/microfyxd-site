"use client";
import Link from "next/link";
import { SiteNav } from "@/app/components/SiteNav";

export default function UpgradePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--void)" }}>
      <div className="scanline" />
      <SiteNav />
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{ background: "rgba(0,243,255,0.04)", border: "1px solid rgba(0,243,255,0.12)" }}>
          <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,243,255,0.7)" }} />
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(0,243,255,0.6)" }}>Upgrade</span>
        </div>
        <h1 className="text-5xl font-grotesk font-extrabold mb-4" style={{ color: "var(--text-1)" }}>
          Expand your capacity.
        </h1>
        <p className="text-lg font-inter mb-12" style={{ color: "var(--text-2)" }}>
          Choose a plan and send payment via Cash App. Your upgrade activates within minutes.
        </p>
        <div className="rounded-2xl p-8 mb-8"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-3)" }}>How to upgrade</p>
          <ol className="text-left space-y-4">
            {[
              { n:"01", text: "Choose your plan from the pricing page" },
              { n:"02", text: "Send payment to $Microfyxd on Cash App — include your plan name in the note" },
              { n:"03", text: "Your plan activates within minutes. You will receive confirmation." },
            ].map(step => (
              <li key={step.n} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                  style={{ background: "rgba(0,243,255,0.06)", border: "1px solid rgba(0,243,255,0.15)", color: "rgba(0,243,255,0.7)" }}>
                  {step.n}
                </span>
                <p className="text-sm font-inter pt-1.5 leading-relaxed" style={{ color: "var(--text-2)" }}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/pricing"
            className="px-8 py-4 rounded-xl font-grotesk font-bold text-base transition-all hover:scale-105"
            style={{ background: "linear-gradient(90deg,rgba(0,243,255,0.12),rgba(123,47,247,0.12))", border: "1px solid rgba(0,243,255,0.25)", color: "rgba(0,243,255,0.9)" }}>
            View pricing →
          </Link>
          <a href="https://cash.app/$Microfyxd" target="_blank" rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl font-grotesk font-bold text-base transition-all hover:scale-105"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-2)" }}>
            Open Cash App →
          </a>
        </div>
      </div>
    </div>
  );
}
