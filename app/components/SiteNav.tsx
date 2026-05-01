"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export function SiteNav() {
  const [glowPos, setGlowPos] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setGlowPos(e.clientX - rect.left);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{ background: "transparent" }}>
      {/* Ambient underline with cursor ripple */}
      <div ref={navRef} className="absolute bottom-0 left-0 right-0 h-px overflow-hidden"
        onMouseMove={handleMouseMove} onMouseLeave={() => setGlowPos(null)}>
        <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.04)" }} />
        {glowPos !== null && (
          <div className="absolute top-0 h-full w-32 pointer-events-none"
            style={{
              left: glowPos - 64,
              background: "linear-gradient(90deg,transparent,rgba(0,243,255,0.6),transparent)",
              transition: "left 0.05s linear",
            }} />
        )}
      </div>

      {/* Logo */}
      <Link href="/" className="font-grotesk font-bold text-lg tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-[#7B2FF7]">
          Microfyxd
        </span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        {[
          { href: "/tasks", label: "Tasks" },
          { href: "/pricing", label: "Pricing" },
          { href: "/marketplace", label: "Marketplace" },
        ].map(link => (
          <Link key={link.href} href={link.href}
            className="text-sm font-inter transition-colors duration-200 hover:text-white hidden md:block"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            {link.label}
          </Link>
        ))}
        <Link href="/tasks"
          className="px-4 py-2 rounded-lg text-sm font-semibold font-mono transition-all duration-200 glass hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]"
          style={{ color: "rgba(0,243,255,0.85)", border: "1px solid rgba(0,243,255,0.2)" }}>
          ⚡ Open Console
        </Link>
      </div>
    </nav>
  );
}
