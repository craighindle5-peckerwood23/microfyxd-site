export function CrystallizeCTA({ onClick }) {
  return (
    <button onClick={onClick} className="mt-10 flex items-center gap-2 text-xs text-slate-300 group">
      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.6)] group-hover:scale-110 transition-transform" />
      <span>Synthesize this thought into yours</span>
    </button>
  );
}