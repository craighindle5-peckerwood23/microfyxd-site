// app/components/WorkflowBuilder.tsx
export default function WorkflowBuilder() {
  return (
    <section className="w-full py-28 text-center">
      <h2 className="text-4xl font-grotesk font-bold">Workflow Builder</h2>
      <p className="mt-4 text-gray-300 font-inter max-w-xl mx-auto">
        Create automated sequences that execute with operator‑grade precision.
      </p>
      
      <div className="mt-12 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="w-full md:w-48 p-4 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-[#1BC7F1]">Trigger</div>
        <div className="text-2xl">→</div>
        <div className="w-full md:w-48 p-4 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-[#2EE9D1]">Process</div>
        <div className="text-2xl">→</div>
        <div className="w-full md:w-48 p-4 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-[#007BFF]">Output</div>
      </div>
    </section>
  )
}
