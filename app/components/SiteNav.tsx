"use client";

import Link from "next/link";
import { useState } from "react";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md border-b border-white/5">
      <Link href="/" className="text-white font-grotesk font-bold text-lg tracking-tight">
        Microfyxd
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
        <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
        <Link href="/upgrade" className="hover:text-white transition">Console</Link>
        <Link href="/marketplace" className="hover:text-white transition">Marketplace</Link>
        <Link
          href="/pricing"
          className="ml-2 px-4 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition text-xs"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-gray-400 hover:text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-black border-b border-white/5 flex flex-col gap-4 px-6 py-4 md:hidden">
          <Link href="/pricing" className="text-gray-300 hover:text-white text-sm" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/upgrade" className="text-gray-300 hover:text-white text-sm" onClick={() => setOpen(false)}>Console</Link>
          <Link href="/marketplace" className="text-gray-300 hover:text-white text-sm" onClick={() => setOpen(false)}>Marketplace</Link>
          <Link href="/pricing" className="text-sm font-semibold text-white" onClick={() => setOpen(false)}>Get Started →</Link>
        </div>
      )}
    </nav>
  );
}
