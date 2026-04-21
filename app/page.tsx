"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [hasTyped, setHasTyped] = useState(false);

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        
        {/* Abstract Glass Frame */}
        <div
          className={`absolute inset-0 border border-white/5 rounded-3xl pointer-events-none transition-all duration-700 ${
            hasTyped ? "shadow-[0_0_40px_5px_rgba(0,255,255,0.25)]" : ""
          }`}
        />

        {/* Background subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-60" />

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Innovated.  
              <span className="text-cyan-400"> Powerfully Fast. </span>  
              Mastery Center.
            </h1>

            <p className="mt-6 text-lg text-gray-300 max-w-lg">
              Microfyxd is your AI‑powered claims command hub — built for speed,
              clarity, and total operational control. Automate chaos. Master every claim.
            </p>

            {/* Input that triggers the neon pulse */}
            <div className="mt-10">
              <input
                type="text"
                placeholder="Type your first idea..."
                onChange={() => setHasTyped(true)}
                className="w-full max-w-md px-4 py-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all"
              >
                Start Microfyxd
              </Link>

              <a
                href="#how-it-works"
                className="px-6 py-3 border border-gray-600 hover:border-cyan-400 rounded-lg transition-all"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* RIGHT SIDE — DASHBOARD PREVIEW */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl shadow-cyan-500/10">
              <Image
                src="/dashboard-preview.png"
                alt="Microfyxd Dashboard Preview"
                width={900}
                height={600}
                className="object-cover"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              *Dashboard preview placeholder*
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE PILLARS */}
      <section className="py-24 px-6 bg-[#0C0C14]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">What Microfyxd Does</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              title="AI Claims Triage"
              desc="Instantly classify, prioritize, and route claims using AI‑driven logic."
            />
            <FeatureCard
              title="Payout Clarity Engine"
              desc="See payout ranges, risk factors, and decision paths with total transparency."
            />
            <FeatureCard
              title="Task Master Queue"
              desc="Organize, automate, and execute tasks with operator‑level precision."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              title="Upload or Start a Claim"
              desc="Begin with any claim file, document, or case input."
            />
            <StepCard
              number="2"
              title="AI Analyzes Everything"
              desc="Microfyxd breaks down the claim, identifies issues, and generates insights."
            />
            <StepCard
              number="3"
              title="Execute With Mastery"
              desc="Use the dashboard to finalize payouts, tasks, and decisions."
            />
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-24 px-6 bg-[#0C0C14]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Pricing</h2>

          <div className="grid md:grid-cols-2 gap-10">
            <PricingCard
              tier="Free"
              price="$0"
              features={[
                "Basic Claims Dashboard",
                "AI Lite Analysis",
                "Task Queue",
                "Limited Storage",
              ]}
              button="Start Free"
              href="/dashboard"
            />

            <PricingCard
              tier="Pro"
              price="$29/mo"
              highlight={true}
              features={[
                "Full AI Claims Engine",
                "Unlimited Storage",
                "Payout Clarity Engine",
                "Advanced Task Automation",
                "Priority Support",
              ]}
              button="Upgrade to Pro"
              href="/pricing"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center text-gray-500 border-t border-gray-800">
        <p>© {new Date().getFullYear()} Microfyxd. All rights reserved.</p>
      </footer>
    </main>
  );
}

/* COMPONENTS */

function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="p-8 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md hover:border-cyan-400 transition-all">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-8 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
      <div className="text-cyan-400 text-5xl font-extrabold mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

function PricingCard({
  tier,
  price,
  features,
  button,
  href,
  highlight = false,
}: {
  tier: string;
  price: string;
  features: string[];
  button: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-10 rounded-xl border backdrop-blur-md ${
        highlight
          ? "border-cyan-400 shadow-cyan-400/20 shadow-xl bg-white/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <h3 className="text-2xl font-bold mb-2">{tier}</h3>
      <p className="text-4xl font-extrabold mb-6">{price}</p>

      <ul className="space-y-3 text-gray-300 mb-8">
        {features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>

      <Link
        href={href}
        className={`block w-full py-3 rounded-lg text-center font-semibold transition-all ${
          highlight
            ? "bg-cyan-500 text-black hover:bg-cyan-400"
            : "border border-gray-600 hover:border-cyan-400"
        }`}
      >
        {button}
      </Link>
    </div>
  );
}
