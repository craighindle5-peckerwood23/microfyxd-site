export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">

        <h1 className="text-4xl font-bold text-gray-900">Limit Breaker Guides</h1>
        <p className="mt-4 text-gray-600 text-lg">
          Doctrine‑style guide sheets designed to help you break mental ceilings, build discipline,
          and level up your life. Each guide is structured, actionable, and easy to apply.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">Available Guides</h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li><strong>Discipline</strong> — Build consistency and self‑control.</li>
            <li><strong>Focus</strong> — Eliminate distractions and sharpen attention.</li>
            <li><strong>Emotional Control</strong> — Stay calm under pressure.</li>
            <li><strong>Momentum</strong> — Build unstoppable forward movement.</li>
          </ul>
        </div>

        <button className="mt-12 w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
          Browse Guides
        </button>

      </div>
    </div>
  );
}