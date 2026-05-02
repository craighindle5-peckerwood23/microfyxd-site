"use client";
import Link from "next/link";
import { SiteNav } from "@/app/components/SiteNav";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "var(--void)" }}>
      <div className="scanline" />
      <SiteNav />
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 breathe"
          style={{ background: "rgba(0,243,255,0.06)", border: "1px solid rgba(0,243,255,0.2)" }}>
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-4xl font-grotesk font-extrabold mb-3" style={{ color: "var(--text-1)" }}>
          You're upgraded.
        </h1>
        <p className="font-inter mb-8" style={{ color: "var(--text-2)" }}>
          Your plan is now active. Time to delegate everything and go live your life.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/tasks"
            className="px-6 py-3 rounded-xl text-sm font-semibold font-mono transition-all hover:scale-105"
            style={{ background: "linear-gradient(90deg,rgba(0,243,255,0.12),rgba(123,47,247,0.12))", border: "1px solid rgba(0,243,255,0.25)", color: "rgba(0,243,255,0.9)" }}>
            ⚡ Start delegating
          </Link>
          <Link href="/dashboard"
            className="px-6 py-3 rounded-xl text-sm font-semibold font-mono transition-all hover:scale-105"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-2)" }}>
            View dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
