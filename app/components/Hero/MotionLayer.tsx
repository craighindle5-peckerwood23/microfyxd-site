export default function MotionLayer() {
  return (
    <div
      className="
        absolute inset-0 
        pointer-events-none 
        z-0 
        overflow-hidden
      "
    >
      {/* Soft radial glow */}
      <div
        className="
          absolute 
          top-1/3 left-1/2 
          -translate-x-1/2 
          w-[900px] h-[900px] 
          bg-blue-500/20 
          blur-[160px] 
          rounded-full 
          animate-pulse
        "
      />

      {/* Subtle parallax gradient */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-b 
          from-transparent 
          via-[#0a0a0a]/40 
          to-black 
          opacity-70
        "
      />
    </div>
  );
}
