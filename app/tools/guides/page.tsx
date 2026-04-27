import { products } from "@/lib/products";

export default function GuidesPage() {
  const guides = products.filter((p) => p.category === "guides");

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">

        <h1 className="text-4xl font-bold text-gray-900">Limit Breaker Guides</h1>
        <p className="mt-4 text-gray-600 text-lg">
          Doctrine‑style guide sheets designed to help you break mental ceilings and level up your life.
        </p>

        <div className="mt-10 space-y-8">
          {guides.map((guide) => (
            <div key={guide.id} className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{guide.name}</h2>
              <p className="mt-2 text-gray-700">
                {guide.longDescription ?? guide.description}
              </p>

              {guide.features && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">Key Frameworks</h3>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    {guide.features.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-4 font-semibold text-indigo-700">{guide.price}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}