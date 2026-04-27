"use client";

import { useState } from "react";
import { Product } from "@/lib/products";

export function useProductModal() {
  const [product, setProduct] = useState<Product | null>(null);

  const open = (p: Product) => setProduct(p);
  const close = () => setProduct(null);

  return { product, open, close };
}
