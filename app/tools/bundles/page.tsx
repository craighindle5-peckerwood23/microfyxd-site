import { products } from "@/lib/products";

export default function BundlesPage() {
  const bundles = products.filter((p) => p.category === "bundles");

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">

        <h1 className="text-4xl font-bold text-gray-900">Bundles & Packs</h1>
        <p className="mt-4 text-gray-600 text-lg">
          High‑value collections of Microfyxd tools designed to give you maximum impact at a
          discounted price. Perfect for personal development, legal documentation, and productivity.
        </p>

        <div className="mt-10 space-y-8">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{bundle.name}</h2>
              <p className="mt-2 text-gray-700">{bundle.longDescription ?? bundle.description}</p>

              {bundle.includes && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">What’s Included</h3>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    {bundle.includes.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-4 font-semibold text-indigo-700">{bundle.price}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}