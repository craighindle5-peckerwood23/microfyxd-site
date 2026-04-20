 export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-24 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        Microfyxd — Operator‑Grade Automation
      </h1>

      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
        Build workflows, analyze files, deploy micro‑tasks, and run your entire operation with precision.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <a
          href="/console"
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Launch Console
        </a>

        <a
          href="/workflows"
          className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition"
        >
          Build Workflow
        </a>
      </div>
    </section>
  );
}
