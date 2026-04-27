import { products } from "@/lib/products";

export default function GrievanceSheetPage() {
  const product = products.find((p) => p.id === "grievance-sheet");

  if (!product) return <div className="p-10">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">

        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-4 text-gray-600 text-lg">{product.longDescription}</p>

        {product.features && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900">Features</h2>
            <ul className="mt-4 space-y-2 text-gray-700">
              {product.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </div>
        )}

        {product.includes && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900">What’s Included</h2>
            <ul className="mt-4 space-y-2 text-gray-700">
              {product.includes.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="mt-12 w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
          Download ({product.price})
        </button>

      </div>
    </div>
  );
}