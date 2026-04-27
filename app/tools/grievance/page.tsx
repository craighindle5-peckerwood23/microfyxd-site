export default function GrievanceSheetPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">

        <h1 className="text-4xl font-bold text-gray-900">Grievance Report Sheet</h1>
        <p className="mt-4 text-gray-600 text-lg">
          A clean, structured, professional grievance report template designed for workplace,
          housing, program, and service‑related issues. Built to be clear, factual, and legally sound.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">What’s Included</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• Incident summary section</li>
            <li>• Timeline breakdown</li>
            <li>• Witness and evidence fields</li>
            <li>• Policy violation references</li>
            <li>• Requested resolution section</li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">Best For</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• Workplace disputes</li>
            <li>• Housing program issues</li>
            <li>• ADA violations</li>
            <li>• Security or staff misconduct</li>
            <li>• Documentation for legal follow‑up</li>
          </ul>
        </div>

        <button className="mt-12 w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
          Download Sheet
        </button>

      </div>
    </div>
  );
}