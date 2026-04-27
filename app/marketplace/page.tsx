"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

export default function Marketplace() {
  const [category, setCategory] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "legal", label: "Legal Tools" },
    { id: "guides", label: "Limit Breaker Guides" },
    { id: "reference", label: "Quick Reference" },
    { id: "bundles", label: "Bundles" },
  ];

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900">Marketplace</h1>
          <p className="mt-3 text-gray-600 text-lg">
            Browse all Microfyxd tools, guides, and bundles.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                category === cat.id
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="mt-2 font-semibold text-indigo-700">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}