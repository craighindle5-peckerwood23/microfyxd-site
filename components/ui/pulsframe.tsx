"use client";
import { useEffect, useState } from "react";

export default function PulseFrame({ children, trigger }: { children: React.ReactNode; trigger: boolean }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (trigger) {
      setAnimate(true);

      // Reset after animation completes (3s)
      const timer = setTimeout(() => setAnimate(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div
      className={`
        relative rounded-xl transition-all duration-700
        ${animate ? "pulse-frame" : "border border-white/10"}
      `}
    >
      {/* Glow Layer */}
      <div
        className={`
          pointer-events-none absolute inset-0 rounded-xl
          ${animate ? "pulse-glow" : ""}
        `}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
