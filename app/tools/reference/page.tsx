
export default function ReferencePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">

        <h1 className="text-4xl font-bold text-gray-900">Quick Reference Sheets</h1>
        <p className="mt-4 text-gray-600 text-lg">
          One‑page, fast‑access sheets designed for real‑world situations. Perfect for legal rights,
          workplace procedures, and personal productivity.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">Popular Sheets</h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li><strong>ADA Rights (Hotels & Programs)</strong></li>
            <li><strong>Incident Documentation Checklist</strong></li>
            <li><strong>Workplace Rights Quick Sheet</strong></li>
            <li><strong>Emergency Response Guide</strong></li>
          </ul>
        </div>

        <button className="mt-12 w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
          View All Sheets
        </button>

      </div>
    </div>
  );
}