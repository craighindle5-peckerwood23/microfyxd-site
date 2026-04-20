import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-90" />

      {/* Floating Operator Panels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[420px] h-[260px] bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.08)] animate-pulse" />
        <div className="absolute bottom-16 left-12 w-[260px] h-[160px] bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.06)]" />
        <div className="absolute bottom-24 right-12 w-[300px] h-[180px] bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.06)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-6">
          Operator‑Grade Automation,
          <span className="text-white/60"> Refined</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
          A clean, premium control center for workflows, micro‑tasks, file analysis, and real‑time operator execution.
          Built for speed. Designed for clarity.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/upgrade">
            <button className="px-7 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition shadow-lg">
              Launch Operator Console
            </button>
          </Link>

          <Link href="/pricing">
            <button className="px-7 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition">
              View Pricing
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
