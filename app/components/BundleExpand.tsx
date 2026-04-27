"use client";

import { useState } from "react";
import { Product } from "@/lib/products";

type Props = {
  product: Product;
};

export default function BundleExpand({ product }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
          <p className="text-gray-500 text-sm mt-1">{product.description}</p>
        </div>
        <span className="font-bold text-gray-900 ml-4">{product.price}</span>
      </div>

      {expanded && product.includes && (
        <ul className="mt-4 space-y-1">
          {product.includes.map((item, i) => (
            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
              <span className="text-green-500">✓</span> {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-blue-600 hover:underline"
        >
          {expanded ? "Show less" : "See what's included"}
        </button>
        <a
          href={`https://cash.app/$Microfyxd/${product.price.replace("$", "")}`}
          target="_blank"
          rel="noreferrer"
          className="ml-auto px-4 py-1.5 rounded-lg bg-[#00D632] text-black font-semibold text-xs hover:bg-[#00f542] transition"
        >
          Buy with Cash App
        </a>
      </div>
    </div>
  );
}
