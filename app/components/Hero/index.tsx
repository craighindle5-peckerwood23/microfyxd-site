import Link from 'next/link';
import MotionLayer from "./MotionLayer";
import DataStreams from "./DataStreams";
import OperatorHUD from "./OperatorHUD";
import HologramHead from "./HologramHead";
import BootSequence from "./BootSequence";

export default function Hero() {
  return (
    <section
      className="
        relative w-full 
        flex flex-col items-center justify-center 
        py-40 px-6 
        text-center 
        overflow-hidden
        bg-black
      "
    >
      {/* Cinematic Motion + Glow */}
      <MotionLayer />

      {/* Data Streams */}
      <DataStreams />

      {/* Operator HUD */}
      <OperatorHUD />

      {/* Hologram Head */}
      <HologramHead />

      {/* Boot Sequence */}
      <BootSequence />

      {/* Main Content */}
      <div className="relative z-50 max-w-3xl flex flex-col items-center mt-10">
        <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-6">
          Operator‑Grade Automation,
          <span className="text-white/60"> Refined</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
          A premium control center for workflows, micro‑tasks, file analysis, and real‑time operator execution.
          Built for speed. Designed for clarity.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/upgrade"
            className="
              px-7 py-3 
              bg-white text-black 
              font-semibold 
              rounded-lg 
              hover:bg-gray-200 
              transition 
              shadow-lg
            "
          >
            Launch Operator Console
          </Link>

          <Link
            href="/pricing"
            className="
              px-7 py-3 
              border border-white 
              text-white 
              font-semibold 
              rounded-lg 
              hover:bg-white hover:text-black 
              transition
            "
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
