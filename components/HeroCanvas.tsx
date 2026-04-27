"use client";

import { useState, useEffect } from "react";
import { WhisperCard } from "./WhisperCard";

export function HeroCanvas() {
  const [value, setValue] = useState("");
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    if (!value) return;
    setHasTyped(true);

    const id = crypto.randomUUID();
    const url = `/thought/${id}`;
    window.history.replaceState(null, "", url);

    try {
      localStorage.setItem(`thought:${id}`, JSON.stringify({ seed: value, createdAt: Date.now() }));
    } catch {}
  }, [value]);

  return (
    <section id="hero-canvas" className="flex items-center justify-center py-24">
      <WhisperCard className="w-full max-w-3xl mx-auto p-10 flex flex-col gap-6">
        <div className="text-sm text-slate-400">Microfyxd · Quiet Intelligence for your work</div>

        <input
          className={`w-full bg-transparent outline-none border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-lg transition-shadow ${
            value ? "intent-glow" : ""
          }`}
          placeholder="Describe the problem you're trying to solve..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {hasTyped && (
          <div className="relative mt-6">
            <div className="absolute -inset-4 -z-10 opacity-40 blur-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20" />
            <WhisperCard className="p-4 opacity-80">
              <p className="text-sm text-slate-300">
                "We capture thinking."
                <span className="text-slate-400 block mt-1">
                  Early synthesis of your thought, ready to grow with you.
                </span>
              </p>
            </WhisperCard>
          </div>
        )}
      </WhisperCard>
    </section>
  );
}