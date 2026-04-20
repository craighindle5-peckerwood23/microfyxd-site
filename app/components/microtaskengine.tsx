// app/components/MicroTaskEngine.tsx
export default function MicroTaskEngine() {
  return (
    <section className="w-full py-28 text-center">
      <h2 className="text-4xl font-grotesk font-bold">Micro‑Task Engine</h2>
      <p className="mt-4 text-gray-300 font-inter max-w-xl mx-auto">
        Break down complex operations into precise, real‑time executable tasks.
      </p>
      
      <div className="mt-12 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Deconstruct", icon: "⚡" },
          { label: "Estimate", icon: "⏱️" },
          { label: "Execute", icon: "🚀" }
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#1BC7F1]/50 transition-all group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
            <div className="font-grotesk font-bold text-white">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
