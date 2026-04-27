import React from "react";
import { products } from "@/lib/products";

export default function GrievanceSheetPage() {
  const product = products.find((p) => p.id === "grievance-sheet");

  if (!product) return <div className="p-10">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-4 text-gray-600 text-lg">{product.description}</p>
        {product.longDescription && (
          <p className="mt-4 text-gray-500">{product.longDescription}</p>
        )}
        <div className="mt-8">
          <a
            href={`https://cash.app/$Microfyxd/${product.price.replace("$", "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-3 rounded-lg bg-[#00D632] text-black font-semibold hover:bg-[#00f542] transition"
          >
            Buy for {product.price} via Cash App
          </a>
        </div>
      </div>
    </div>
  );
}
