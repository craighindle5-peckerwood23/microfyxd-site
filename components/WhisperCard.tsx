export function WhisperCard({ children, className = "" }) {
  return (
    <div className={`whisper-card relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] ${className}`}>
      {children}
    </div>
  );
}