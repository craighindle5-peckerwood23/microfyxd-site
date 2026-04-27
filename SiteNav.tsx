"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Archive" },
];

export function SiteNav() {
  const [cursorX, setCursorX] = useState(null);

  return (
    <header className="sticky top-0 z-40">
      <nav
        className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 relative"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCursorX(e.clientX - rect.left);
        }}
        onMouseLeave={() => setCursorX(null)}
      >
        <button
          className="text-xs uppercase tracking-widest text-slate-400"
          onClick={() => {
            const el = document.getElementById("hero-canvas");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          Microfyxd · Focus
        </button>

        <div className="relative flex gap-6 text-xs text-slate-400">
          {cursorX !== null && (
            <div
              className="pointer-events-none absolute -bottom-1 h-px w-16 bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0 blur-sm transition-transform duration-150"
              style={{ transform: `translateX(${cursorX - 32}px)` }}
            />
          )}

          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-100">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}