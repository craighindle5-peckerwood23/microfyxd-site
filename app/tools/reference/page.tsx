import React from "react";
import { products } from "@/lib/products";

export default function ReferencePage() {
  const references = products.filter((p) => p.category === "reference");

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900">Quick Reference Sheets</h1>
        <p className="mt-4 text-gray-600 text-lg">
          One-page, fast-access sheets for common operations.
        </p>
        <div className="mt-8 space-y-4">
          {references.map((ref) => (
            <div key={ref.id} className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900">{ref.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{ref.description}</p>
              <a
                href={`https://cash.app/$Microfyxd/${ref.price.replace("$", "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-[#00D632] text-black font-semibold text-xs hover:bg-[#00f542] transition"
              >
                Get for {ref.price}
              </a>
            </div>
          ))}
          {references.length === 0 && (
            <p className="text-gray-400">No reference sheets available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
