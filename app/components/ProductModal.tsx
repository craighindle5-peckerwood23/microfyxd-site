"use client";

import { Product } from "@/lib/products";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-8 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-3 text-gray-600">{product.longDescription ?? product.description}</p>

        {/* Features */}
        {product.features && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Features</h2>
            <ul className="mt-2 space-y-1 text-gray-700">
              {product.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Includes */}
        {product.includes && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">What’s Included</h2>
            <ul className="mt-2 space-y-1 text-gray-700">
              {product.includes.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">
          Get It ({product.price})
        </button>
      </div>
    </div>
  );
}