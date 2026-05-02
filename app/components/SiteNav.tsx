"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/tasks",       label: "Tasks" },
  { href: "/assistant",   label: "Assistant" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/pricing",     label: "Pricing" },
  { href: "/dashboard",   label: "Dashboard" },
];

export function SiteNav() {
  const [glowPos, setGlowPos] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{ background: "rgba(8,8,13,0.7)", backdropFilter: "blur(16px)" }}>
      <div ref={navRef} className="absolute bottom-0 left-0 right-0 h-px overflow-hidden"
        onMouseMove={e => { if (!navRef.current) return; setGlowPos(e.clientX - navRef.current.getBoundingClientRect().left); }}
        onMouseLeave={() => setGlowPos(null)}>
        <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.04)" }} />
        {glowPos !== null && (
          <div className="absolute top-0 h-full w-40 pointer-events-none"
            style={{ left: glowPos - 80, background: "linear-gradient(90deg,transparent,rgba(0,243,255,0.6),transparent)", transition: "left 0.06s linear" }} />
        )}
      </div>

      <Link href="/" className="font-grotesk font-bold text-lg tracking-tight flex-shrink-0">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-[#7B2FF7]">Microfyxd</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map(l => (
          <Link key={l.href} href={l.href}
            className="text-sm font-inter transition-colors duration-200"
            style={{ color: pathname === l.href ? "rgba(0,243,255,0.9)" : "rgba(255,255,255,0.4)" }}>
            {l.label}
          </Link>
        ))}
        <Link href="/tasks"
          className="px-4 py-2 rounded-lg text-sm font-semibold font-mono transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]"
          style={{ color: "rgba(0,243,255,0.85)", border: "1px solid rgba(0,243,255,0.2)", background: "rgba(0,243,255,0.04)" }}>
          ⚡ Console
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(o => !o)}
        style={{ color: "rgba(255,255,255,0.5)" }}>
        <span className="block w-5 h-px bg-current" />
        <span className="block w-5 h-px bg-current" />
        <span className="block w-5 h-px bg-current" />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-3 md:hidden"
          style={{ background: "rgba(8,8,13,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="text-sm font-inter py-2" style={{ color: "rgba(255,255,255,0.6)" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/tasks" onClick={() => setMobileOpen(false)}
            className="text-sm font-mono py-2" style={{ color: "rgba(0,243,255,0.8)" }}>
            ⚡ Open Console
          </Link>
        </div>
      )}
    </nav>
  );
}
