"use client";
import Link from "next/link";
import { SiteNav } from "@/app/components/SiteNav";

export default function AccountPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--void)" }}>
      <div className="scanline" />
      <SiteNav />
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-24">
        <div className="flex items-center gap-2 mb-3">
          <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,243,255,0.7)" }} />
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(0,243,255,0.5)" }}>Account</span>
        </div>
        <h1 className="text-4xl font-grotesk font-extrabold mb-8" style={{ color: "var(--text-1)" }}>Your account</h1>
        <div className="space-y-4">
          {[
            { label: "Plan", value: "Starter · $9.99/mo", action: "Upgrade", href: "/upgrade" },
            { label: "Status", value: "Active", action: null, href: null },
            { label: "Billing", value: "Cash App · $Microfyxd", action: "Pay now", href: "https://cash.app/$Microfyxd" },
            { label: "Tasks run", value: "5 total", action: null, href: null },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between px-5 py-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-0.5" style={{ color: "var(--text-3)" }}>{row.label}</p>
                <p className="text-sm font-inter" style={{ color: "var(--text-1)" }}>{row.value}</p>
              </div>
              {row.action && row.href && (
                <Link href={row.href}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                  style={{ background: "rgba(0,243,255,0.06)", border: "1px solid rgba(0,243,255,0.15)", color: "rgba(0,243,255,0.7)" }}>
                  {row.action}
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <Link href="/dashboard"
            className="px-5 py-2.5 rounded-xl text-sm font-mono transition-all hover:scale-105"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-2)" }}>
            ← Dashboard
          </Link>
          <Link href="/tasks"
            className="px-5 py-2.5 rounded-xl text-sm font-mono transition-all hover:scale-105"
            style={{ background: "rgba(0,243,255,0.06)", border: "1px solid rgba(0,243,255,0.15)", color: "rgba(0,243,255,0.7)" }}>
            ⚡ Delegate a task
          </Link>
        </div>
      </div>
    </div>
  );
}
