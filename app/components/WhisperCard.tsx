"use client";

export function WhisperCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`whisper-card relative ${className}`}>
      {children}
    </div>
  );
}
