"use client";

import { products, Product } from "@/lib/products";

type Props = {
  bundle: Product;
};

export default function BundleExpand({ bundle }: Props) {
  if (!bundle.includes) return null;

  // Match included items to actual products
  const includedProducts = products.filter((p) =>
    bundle.includes?.some((i) =>
      i.toLowerCase().includes(p.name.toLowerCase())
    )
  );

  return (
    <div className="mt-6 border border-gray-200 rounded-lg p-6 bg-gray-50">
      <h3 className="text-xl font-semibold text-gray-900">Included Items</h3>

      <div className="mt-4 space-y-4">
        {includedProducts.length > 0 ? (
          includedProducts.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
              <p className="text-gray-600 text-sm mt-1">
                {item.description}
              </p>

              {item.features && (
                <ul className="mt-2 space-y-1 text-gray-700 text-sm">
                  {item.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">
            This bundle includes items not yet added as standalone products.
          </p>
        )}
      </div>
    </div>
  );
}