import { products } from "@/lib/products";

export default function ReferencePage() {
  const references = products.filter((p) => p.category === "reference");

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">

        <h1 className="text-4xl font-bold text-gray-900">Quick Reference Sheets</h1>
        <p className="mt-4 text-gray-600 text-lg">
          One‑page, fast‑access sheets designed for real‑world situations. Perfect for legal rights,
          workplace procedures, and personal productivity.
        </p>

        <div className="mt-10 space-y-8">
          {references.map((sheet) => (
            <div key={sheet.id} className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{sheet.name}</h2>
              <p className="mt-2 text-gray-700">{sheet.longDescription ?? sheet.description}</p>

              {sheet.includes && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">What’s Included</h3>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    {sheet.includes.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-4 font-semibold text-indigo-700">{sheet.price}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}