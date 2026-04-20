export default function OperatorHUD() {
  return (
    <div
      className="
        absolute inset-0 
        pointer-events-none 
        z-20 
        overflow-hidden
      "
    >
      {/* GROQ LPU Badge */}
      <div
        className="
          absolute top-10 right-10 
          px-4 py-2 
          bg-white/5 
          backdrop-blur-xl 
          border border-white/10 
          rounded-lg 
          text-white 
          text-sm 
          tracking-wide 
          shadow-[0_0_20px_rgba(255,255,255,0.08)]
        "
      >
        GROQ LPU • SYNCED
      </div>

      {/* Neural Link Indicator */}
      <div
        className="
          absolute top-10 left-10 
          flex items-center gap-2 
          px-4 py-2 
          bg-white/5 
          backdrop-blur-xl 
          border border-white/10 
          rounded-lg 
          text-white 
          text-sm 
          tracking-wide 
          shadow-[0_0_20px_rgba(255,255,255,0.08)]
        "
      >
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        NEURAL LINK ACTIVE
      </div>

      {/* Floating Panel Left */}
      <div
        className="
          absolute bottom-20 left-12 
          w-[260px] h-[160px] 
          bg-white/5 
          backdrop-blur-xl 
          border border-white/10 
          rounded-xl 
          shadow-[0_0_30px_rgba(255,255,255,0.06)]
          animate-[hudfloat_8s_ease_in_out_infinite]
        "
      />

      {/* Floating Panel Right */}
      <div
        className="
          absolute bottom-28 right-12 
          w-[300px] h-[180px] 
          bg-white/5 
          backdrop-blur-xl 
          border border-white/10 
          rounded-xl 
          shadow-[0_0_30px_rgba(255,255,255,0.06)]
          animate-[hudfloat_10s_ease_in_out_infinite]
        "
      />

      {/* Scanline Overlay */}
      <div
        className="
          absolute inset-0 
          bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] 
          bg-[length:100%_3px] 
          opacity-10 
          animate-[scanlines_12s_linear_infinite]
        "
      />
    </div>
  );
}
