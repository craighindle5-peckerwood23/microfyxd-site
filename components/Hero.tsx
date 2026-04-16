import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950 px-4 py-20">
      <div className="max-w-4xl w-full mx-auto text-center">
        <div className="mb-6 inline-block">
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
            μF
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white mb-6">
          Any task. Any problem. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Fixed.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Microfyxd is your tactical problem‑solver. Bureaucracy, digital chaos, life admin, disputes, tech, forms—if it's blocking you, I clear it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/submit"
            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-lg"
          >
            Submit a task now
          </Link>
          <Link
            href="/services"
            className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-semibold rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-lg"
          >
            See what I handle
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
              Bureaucratic & admin
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Forms, appeals, disputes, letters, documentation. I turn red tape into a checklist and get it done.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
              Digital & technical
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Accounts, logins, setups, troubleshooting, workflows. If it lives on a screen, I can stabilize it.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
              Life operations
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Scheduling, research, planning, coordination. You tell me the outcome; I map the path.
            </p>
          </div>
        </div>

        <div className="mt-20 p-8 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-3">
            Operator‑grade execution.
          </h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
            No fluff. No vague promises. You submit the problem, I return a concrete path or a completed result.
          </p>
          <Link
            href="/submit"
            className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Start with one task
          </Link>
        </div>
      </div>
    </section>
  );
}