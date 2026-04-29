"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--void)" }}
    >
      <div
        className="relative rounded-2xl p-14 max-w-md w-full"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 60px rgba(0,243,255,0.04), 0 0 120px rgba(123,47,247,0.03)",
        }}
      >
        {/* Pulse */}
        <div className="flex justify-center mb-8">
          <div
            className="w-3 h-3 rounded-full breathe"
            style={{ background: "rgba(0,243,255,0.5)" }}
          />
        </div>

        <p className="text-xs font-mono tracking-widest uppercase mb-6" style={{ color: "var(--text-3)" }}>
          404 · antechamber
        </p>

        <h1 className="text-3xl font-grotesk font-bold mb-4" style={{ color: "var(--text-1)" }}>
          This space is empty.
          <br />
          But it's ready.
        </h1>

        <p className="text-sm font-inter mb-10" style={{ color: "var(--text-2)" }}>
          Nothing lives here yet. Every great operation starts from a blank frame.
        </p>

        <Link
          href="/upgrade"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold font-mono transition-all duration-300 hover:scale-105"
          style={{
            background: "rgba(0,243,255,0.04)",
            border: "1px solid rgba(0,243,255,0.2)",
            color: "rgba(0,243,255,0.8)",
          }}
        >
          <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgba(0,243,255,0.7)" }} />
          Start a thought from scratch
        </Link>
      </div>
    </div>
  );
}
