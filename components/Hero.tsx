
export default function Hero() {
  return (
    <section className="w-full bg-black text-white">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold tracking-tight">MICROFYXD</h1>

        <div className="flex items-center gap-4">
          <button className="text-sm text-zinc-300 hover:text-white">Login</button>
          <button className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-medium">
            Get Started
          </button>
        </div>
      </nav>

      {/* Operator Console Banner */}
      <div className="w-full flex justify-center mt-6">
        <span className="text-xs tracking-widest text-purple-300 bg-purple-500/10 px-4 py-1 rounded-full border border-purple-500/20">
          AI OPERATOR CONSOLE v2.0
        </span>
      </div>

      {/* Main Hero Text */}
      <div className="max-w-3xl mx-auto text-center mt-8 px-6">
        <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
          The Future of AI Operations is Here
        </h2>

        <p className="text-lg text-zinc-400 mt-4">
          Microfyxd is your AI-powered command center. Fix problems, generate micro‑tasks,
          automate workflows, and harness the power of next‑gen AI — all from one operator console.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 font-medium">
            Get Started Free →
          </button>

          <button className="px-6 py-3 rounded-md border border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            Try Without Account
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-zinc-400">
          <span>~200ms AI Response Time</span>
          <span>70B Parameter Model</span>
          <span>7+ Workflow Actions</span>
          <span>GROQ LPU</span>
        </div>
      </div>

      {/* Hologram Section */}
      <div className="mt-16 flex justify-center">
        <div className="relative w-full max-w-md">
          <div className="absolute top-2 left-2 text-green-400 text-xs">
            ● NEURAL LINK ACTIVE
          </div>

          <div className="w-full h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/20 flex items-center justify-center">
            {/* Placeholder for hologram image */}
            <div className="text-purple-300 text-sm">[ Hologram Head Placeholder ]</div>
          </div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="max-w-3xl mx-auto mt-20 px-6 text-center">
        <h3 className="text-2xl font-semibold">CAPABILITIES</h3>
        <p className="text-zinc-400 mt-2">
          Everything You Need to Operate  
          <br />
          A complete suite of AI-powered tools designed for maximum productivity.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-3xl mx-auto mt-20 px-6 text-center pb-20">
        <h3 className="text-3xl font-bold">Ready to Operate at Full Capacity?</h3>
        <p className="text-zinc-400 mt-2">
          Start using Microfyxd today. No credit card required.
        </p>

        <button className="mt-6 px-6 py-3 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 font-medium">
          Create Free Account →
        </button>
      </div>
    </section>
  );
}
