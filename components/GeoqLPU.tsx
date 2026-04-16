// app/components/GroqLPU.tsx
export default function GroqLPU() {
  return (
    <section className="w-full py-28 text-center">
      <h2 className="text-4xl font-grotesk font-bold">Powered by Groq LPU</h2>
      <p className="mt-4 text-gray-300 max-w-xl mx-auto font-inter">
        Ultra‑low latency inference delivering real‑time operator responsiveness.
      </p>

      <div className="mt-12 w-[420px] h-[420px] mx-auto bg-[#0A0F14] border border-[#2EE9D1]/30 rounded-full shadow-[0_0_60px_#2EE9D1] flex items-center justify-center">
        {/* Replace with your globe asset */}
        <div className="text-gray-400">[ LPU Globe Placeholder ]</div>
      </div>
    </section>
  )
}
