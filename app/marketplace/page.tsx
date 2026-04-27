"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import ProductModal from "@/app/components/ProductModal";
import { useProductModal } from "@/app/hooks/useProductModal";
import { useCart } from "@/app/hooks/useCart";
import CartDrawer from "@/app/components/CartDrawer";

export default function Marketplace() {
  const [category, setCategory] = useState("all");
  const { product, open, close } = useProductModal();
  const { cart, add, remove, clear } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

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
    <>
      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        remove={remove}
        clear={clear}
      />

      {/* Product Modal */}
      <ProductModal
        product={product}
        onClose={close}
      />

      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-14">
            <div className="text-center w-full">
              <h1 className="text-4xl font-bold text-gray-900">Marketplace</h1>
              <p className="mt-3 text-gray-600 text-lg">
                Browse all Microfyxd tools, guides, and bundles.
              </p>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="absolute right-6 top-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Cart ({cart.length})
            </button>
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
              <div
                key={product.id}
                className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <p className="mt-3 font-semibold text-indigo-700">{product.price}</p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => open(product)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Preview
                  </button>

                  <button
                    onClick={() => add(product)}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}