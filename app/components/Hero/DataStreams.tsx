export default function DataStreams() {
  return (
    <div
      className="
        absolute inset-0 
        pointer-events-none 
        z-10 
        overflow-hidden
      "
    >
      {/* Vertical Data Streaks */}
      <div
        className="
          absolute inset-0 
          bg-[linear-gradient(to_bottom,rgba(0,150,255,0.15)_0%,transparent_60%)] 
          animate-[datastream_4s_linear_infinite]
          opacity-40
        "
      />

      {/* Horizontal Pulse Waves */}
      <div
        className="
          absolute inset-0 
          bg-[linear-gradient(to_right,transparent,rgba(120,0,255,0.12),transparent)] 
          animate-[pulsewave_6s_ease_in_out_infinite]
          opacity-30
        "
      />

      {/* Matrix Grid */}
      <div
        className="
          absolute inset-0 
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)]
          opacity-20
        "
      />
    </div>
  );
}
