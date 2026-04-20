// app/components/GroqLPU.tsx
export default function GroqLPU() {
  return (
    <section className="w-full py-28 text-center">
      <h2 className="text-4xl font-grotesk font-bold">Powered by Groq LPU</h2>
      <p className="mt-4 text-gray-300 max-w-xl mx-auto font-inter">
        Ultra‑low latency inference delivering real‑time operator responsiveness.
      </p>

      <div className="mt-12 w-[420px] h-[420px] mx-auto bg-[#0A0F14] border border-[#2EE9D1]/30 rounded-full shadow-[0_0_60px_#2EE9D1] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2EE9D1_0%,transparent_70%)] opacity-10 animate-pulse" />
        <div className="w-64 h-64 rounded-full border-2 border-[#2EE9D1]/40 border-dashed animate-spin-slow flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-[#2EE9D1]/60 border-dotted animate-reverse-spin flex items-center justify-center">
            <div className="w-32 h-32 bg-[#2EE9D1]/20 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[#2EE9D1] font-mono text-lg font-bold tracking-tighter">LPU CORE</div>
        </div>
      </div>
    </section>
  )
}
