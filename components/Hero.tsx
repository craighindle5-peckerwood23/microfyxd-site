// app/components/Hero.tsx
export default function Hero() {
  return (
    <section className="w-full py-32 text-center">
      <h1 className="text-6xl font-bold font-grotesk leading-tight">
        The <span className="bg-gradient-to-r from-[#2EE9D1] via-[#1BC7F1] to-[#007BFF] bg-clip-text text-transparent">
          Operator Console
        </span>{' '}
        for Real‑Time AI Execution
      </h1>

      <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto font-inter">
        Microfyxd gives you instant, high‑precision AI execution powered by Groq — built for operators, technicians, and high‑speed workflows.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <button className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#2EE9D1] via-[#1BC7F1] to-[#007BFF] text-black">
          Launch Console
        </button>
        <button className="px-8 py-3 rounded-lg border border-gray-700 hover:border-gray-500 transition">
          Learn More
        </button>
      </div>
    </section>
  )
}
