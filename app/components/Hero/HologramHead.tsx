export default function HologramHead() {
  return (
    <div
      className="
        absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        w-[420px] h-[420px]
        z-30 
        pointer-events-none
      "
    >
      {/* Blue Particle Base */}
      <img
        src="/hologram/particle-head.png"
        alt="AI Particle Head"
        className="
          absolute inset-0 
          w-full h-full 
          object-contain 
          opacity-90 
          animate-[float_6s_ease_in_out_infinite]
        "
      />

      {/* Purple Wireframe Overlay */}
      <img
        src="/hologram/wireframe-overlay.png"
        alt="Wireframe Overlay"
        className="
          absolute inset-0 
          w-full h-full 
          object-contain 
          mix-blend-screen 
          opacity-70 
          animate-[pulse_4s_ease_in_out_infinite]
        "
      />

      {/* Glowing Eyes */}
      <div
        className="
          absolute 
          top-[42%] left-1/2 
          -translate-x-1/2 
          flex gap-10
        "
      >
        <div className="w-6 h-3 bg-cyan-300 blur-md rounded-full animate-pulse" />
        <div className="w-6 h-3 bg-cyan-300 blur-md rounded-full animate-pulse" />
      </div>

      {/* Subtle Scan Glow */}
      <div
        className="
          absolute inset-0 
          bg-[radial-gradient(circle_at_center,rgba(120,0,255,0.25),transparent_70%)]
          opacity-40
          animate-[scan_8s_linear_infinite]
        "
      />
    </div>
  );
}
