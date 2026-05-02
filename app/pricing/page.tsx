"use client";
import Link from "next/link";
import { useState } from "react";
import { SiteNav } from "@/app/components/SiteNav";

const PLANS = [
  {
    name: "Starter",
    price: "$9.99",
    desc: "For individual operators getting started.",
    features: [
      "Operator console access",
      "3 active workflows",
      "Basic task engine",
      "Schedule conflict detection",
      "Email support",
    ],
    cta: "Get Started",
    href: "/tasks",
    breathe: false,
  },
  {
    name: "Pro",
    price: "$29.99",
    desc: "For serious operators running real volume.",
    features: [
      "Everything in Starter",
      "15 active workflows",
      "Phone call automation",
      "File & form handler",
      "Full schedule AI",
      "Priority execution queue",
      "Priority support",
    ],
    cta: "Go Pro",
    href: "/tasks",
    breathe: true,
  },
  {
    name: "Operator",
    price: "$79.99",
    desc: "High-volume. No limits. Full power.",
    features: [
      "Everything in Pro",
      "Unlimited workflows",
      "Custom integrations",
      "SLA guarantees",
      "Dedicated support",
      "White-label option",
    ],
    cta: "Go Operator",
    href: "/tasks",
    breathe: false,
  },
];

const FAQ = [
  { q: "How does billing work?", a: "Monthly subscription via Cash App to $Microfyxd. Cancel anytime — no contracts, no hidden fees." },
  { q: "Can I upgrade or downgrade?", a: "Yes. Send a message through the console and we will adjust your plan within 24 hours." },
  { q: "Is there a free trial?", a: "Yes — you can run your first 3 tasks completely free, no payment required." },
  { q: "What happens if I hit my workflow limit?", a: "We will notify you before any task is blocked and offer a one-click upgrade path." },
  { q: "Is my data private?", a: "Always. Row-level Supabase security means your data is isolated and never used to train any model." },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--void)" }}>
      <div className="scanline" />
      <SiteNav />

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(0,243,255,0.04)", border: "1px solid rgba(0,243,255,0.12)" }}>
            <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,243,255,0.7)" }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(0,243,255,0.6)" }}>Pricing</span>
          </div>
          <h1 className="text-5xl font-grotesk font-extrabold mb-4" style={{ color: "var(--text-1)" }}>
            Upgrade the frame.
          </h1>
          <p className="text-lg font-inter max-w-xl mx-auto" style={{ color: "var(--text-2)" }}>
            Start free. Scale when your operations demand it. No contracts.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-start">
          {PLANS.map(plan => (
            <div key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col ${plan.breathe ? "breathe" : ""}`}
              style={{
                background: plan.breathe ? "rgba(0,243,255,0.03)" : "rgba(255,255,255,0.02)",
                border: plan.breathe ? "1px solid rgba(0,243,255,0.2)" : "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
              }}>
              {plan.breathe && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold font-mono tracking-widest uppercase"
                  style={{ background: "rgba(0,243,255,0.1)", color: "rgba(0,243,255,0.85)", border: "1px solid rgba(0,243,255,0.2)" }}>
                  Most Popular
                </span>
              )}
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-3)" }}>{plan.name}</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-grotesk font-extrabold" style={{ color: "var(--text-1)" }}>{plan.price}</span>
                <span className="text-sm mb-2 font-inter" style={{ color: "var(--text-2)" }}>/mo</span>
              </div>
              <p className="text-sm font-inter mb-6" style={{ color: "var(--text-2)" }}>{plan.desc}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm font-inter">
                    <span style={{ color: "rgba(0,243,255,0.6)", flexShrink: 0 }}>✓</span>
                    <span style={{ color: "var(--text-2)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.href}
                className="px-6 py-3 rounded-xl text-sm font-semibold font-mono text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: plan.breathe ? "linear-gradient(90deg,rgba(0,243,255,0.15),rgba(123,47,247,0.15))" : "rgba(255,255,255,0.04)",
                  border: plan.breathe ? "1px solid rgba(0,243,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                  color: plan.breathe ? "rgba(0,243,255,0.9)" : "var(--text-2)",
                }}>
                {plan.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* Payment note */}
        <div className="text-center mb-20 rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-sm font-mono" style={{ color: "var(--text-2)" }}>
            Payment via <span style={{ color: "rgba(0,243,255,0.7)" }}>Cash App</span> · Send to{" "}
            <a href="https://cash.app/$Microfyxd" target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-white"
              style={{ color: "rgba(0,243,255,0.7)" }}>$Microfyxd</a>{" "}
            · Include your plan name in the note
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-grotesk font-bold mb-8 text-center" style={{ color: "var(--text-1)" }}>Common questions</h2>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                  style={{ color: "var(--text-1)" }}>
                  <span className="text-sm font-inter font-medium">{item.q}</span>
                  <span className="text-xs font-mono ml-4 flex-shrink-0" style={{ color: "rgba(0,243,255,0.5)" }}>
                    {openFaq === i ? "▲" : "▼"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm font-inter leading-relaxed" style={{ color: "var(--text-2)" }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
