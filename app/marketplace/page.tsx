"use client";
import { useState } from "react";
import { SiteNav } from "@/app/components/SiteNav";
import { products } from "@/lib/products";
import ProductModal from "@/app/components/ProductModal";
import { useProductModal } from "@/app/hooks/useProductModal";
import { useCart } from "@/app/hooks/useCart";
import CartDrawer from "@/app/components/CartDrawer";
import Link from "next/link";

export default function Marketplace() {
  const [category, setCategory] = useState("all");
  const { product, open, close } = useProductModal();
  const { cart, add, remove, clear, total } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const categories = [
    { id: "all", label: "All" },
    { id: "legal", label: "Legal Tools" },
    { id: "guides", label: "Guides" },
    { id: "reference", label: "Reference" },
    { id: "bundles", label: "Bundles" },
  ];

  const filtered = category === "all" ? products : products.filter(p => p.category === category);

  return (
    <div className="min-h-screen" style={{ background: "var(--void)" }}>
      <div className="scanline" />
      <SiteNav />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,243,255,0.7)" }} />
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(0,243,255,0.5)" }}>Marketplace</span>
            </div>
            <h1 className="text-4xl font-grotesk font-extrabold" style={{ color: "var(--text-1)" }}>Tools & Resources</h1>
            <p className="font-inter mt-1" style={{ color: "var(--text-2)" }}>Guides, legal tools, and operator packs.</p>
          </div>
          {cart.length > 0 && (
            <button onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono transition-all hover:scale-105"
              style={{ background: "rgba(0,243,255,0.07)", border: "1px solid rgba(0,243,255,0.2)", color: "rgba(0,243,255,0.85)" }}>
              🛒 Cart ({cart.length}) · ${total.toFixed(2)}
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)}
              className="px-4 py-2 rounded-lg text-xs font-mono transition-all"
              style={{
                background: category === c.id ? "rgba(0,243,255,0.08)" : "rgba(255,255,255,0.02)",
                border: category === c.id ? "1px solid rgba(0,243,255,0.2)" : "1px solid rgba(255,255,255,0.05)",
                color: category === c.id ? "rgba(0,243,255,0.9)" : "var(--text-2)",
              }}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>No products in this category yet.</p>
            <Link href="/tasks" className="mt-4 inline-block text-xs font-mono" style={{ color: "rgba(0,243,255,0.5)" }}>
              ← Back to tasks
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <div key={p.id}
                className="rounded-2xl p-6 flex flex-col cursor-pointer transition-all duration-200 hover:scale-[1.02] group"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
                onClick={() => open(p)}>
                <div className="text-2xl mb-3">{p.emoji ?? "🛠️"}</div>
                <h3 className="font-grotesk font-bold text-sm mb-1" style={{ color: "var(--text-1)" }}>{p.name}</h3>
                <p className="text-xs font-inter leading-relaxed flex-1 mb-4" style={{ color: "var(--text-2)" }}>{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-grotesk font-bold text-base" style={{ color: "rgba(0,243,255,0.85)" }}>
                    ${p.price?.toFixed(2) ?? "Free"}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); add(p); }}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                    style={{ background: "rgba(0,243,255,0.07)", border: "1px solid rgba(0,243,255,0.15)", color: "rgba(0,243,255,0.8)" }}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {product && <ProductModal product={product} onClose={close} onAdd={add} />}
      {cartOpen && <CartDrawer cart={cart} onRemove={remove} onClear={clear} total={total} onClose={() => setCartOpen(false)} />}
    </div>
  );
}
