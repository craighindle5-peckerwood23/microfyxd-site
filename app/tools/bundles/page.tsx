export default function BundlesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">

        <h1 className="text-4xl font-bold text-gray-900">Bundles & Packs</h1>
        <p className="mt-4 text-gray-600 text-lg">
          High‑value collections of Microfyxd tools designed to give you maximum impact at a
          discounted price. Perfect for personal development, legal documentation, and productivity.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">Available Bundles</h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li>
              <strong>10‑Sheet Grievance Bundle</strong> — A pack of 10 professional grievance sheets.
            </li>
            <li>
              <strong>3‑Subject Productivity Pack</strong> — Discipline, Focus, Time Management.
            </li>
            <li>
              <strong>Limit Breaker Mega Pack</strong> — All doctrine cards in one discounted bundle.
            </li>
          </ul>
        </div>

        <button className="mt-12 w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
          View Bundle Options
        </button>

      </div>
    </div>
  );
}