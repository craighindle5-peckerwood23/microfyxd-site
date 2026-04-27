"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/products";

export function useCart() {
  const [cart, setCart] = useState<Product[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const add = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const remove = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clear = () => setCart([]);

  return { cart, add, remove, clear };
}