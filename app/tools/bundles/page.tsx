import { products } from "@/lib/products";
import BundleExpand from "@/app/components/BundleExpand";

export default function BundlesPage() {
  const bundles = products.filter((p) => p.category === "bundles");

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">

        <h1 className="text-4xl font-bold text-gray-900">Bundles & Packs</h1>
        <p className="mt-4 text-gray-600 text-lg">
          High‑value collections of Microfyxd tools designed to give you maximum impact at a
          discounted price.
        </p>

        <div className="mt-10 space-y-10">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{bundle.name}</h2>
              <p className="mt-2 text-gray-700">
                {bundle.longDescription ?? bundle.description}
              </p>

              {/* Auto‑expand included items */}
              <BundleExpand bundle={bundle} />

              <p className="mt-4 font-semibold text-indigo-700">{bundle.price}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}