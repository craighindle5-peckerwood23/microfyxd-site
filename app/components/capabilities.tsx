// app/components/Capabilities.tsx
const items = [
  "Real‑time task execution",
  "Technical diagnostics",
  "File analysis",
  "Workflow automation",
  "Operator‑grade precision",
  "Groq‑accelerated responses",
]

export default function Capabilities() {
  return (
    <section className="w-full py-28">
      <h2 className="text-center text-4xl font-grotesk font-bold">
        Capabilities
      </h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((cap, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-[#0A0F14] border border-gray-800 hover:border-[#1BC7F1]/40 transition"
          >
            <p className="font-inter text-gray-300">{cap}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
