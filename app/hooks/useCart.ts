"use client";

import { useState } from "react";
import { Product } from "@/lib/products";

type CartItem = Product & { qty: number };

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const add = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const remove = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clear = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + parseFloat(i.price.replace("$", "")) * i.qty, 0);

  return { cart, add, remove, clear, total };
}
