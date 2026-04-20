export default function BootSequence() {
  return (
    <div
      className="
        absolute top-[18%] left-1/2 
        -translate-x-1/2 
        flex flex-col items-center 
        text-white 
        z-40 
        pointer-events-none
      "
    >
      {/* SYSTEM ONLINE */}
      <p
        className="
          text-sm tracking-widest 
          opacity-0 
          animate-[boot1_1.2s_ease_forwards]
        "
      >
        SYSTEM ONLINE
      </p>

      {/* NEURAL LINK ACTIVE */}
      <p
        className="
          text-sm tracking-widest 
          opacity-0 
          animate-[boot2_1.2s_ease_forwards]
        "
      >
        NEURAL LINK ACTIVE
      </p>

      {/* GROQ LPU SYNCED */}
      <p
        className="
          text-sm tracking-widest 
          opacity-0 
          animate-[boot3_1.2s_ease_forwards]
        "
      >
        GROQ LPU SYNCED
      </p>

      {/* OPERATOR CONSOLE READY */}
      <p
        className="
          text-sm tracking-widest 
          opacity-0 
          animate-[boot4_1.2s_ease_forwards]
        "
      >
        OPERATOR CONSOLE READY
      </p>
    </div>
  );
}
