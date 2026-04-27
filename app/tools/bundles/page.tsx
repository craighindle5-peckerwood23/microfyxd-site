import React from "react";
import { products } from "@/lib/products";
import BundleExpand from "@/app/components/BundleExpand";

export default function BundlesPage() {
  const bundles = products.filter((p) => p.category === "bundles");

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900">Bundles & Packs</h1>
        <p className="mt-4 text-gray-600 text-lg">
          Everything you need, packaged together.
        </p>
        <div className="mt-8 space-y-4">
          {bundles.map((b) => (
            <BundleExpand key={b.id} product={b} />
          ))}
          {bundles.length === 0 && (
            <p className="text-gray-400">No bundles available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
