"use client";

import { Product } from "@/lib/products";

type CartItem = Product & { qty: number };

type Props = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  remove: (id: string) => void;
  clear: () => void;
};

export default function CartDrawer({ open, onClose, cart, total, remove, clear }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-bold text-gray-900 text-lg">Your Cart</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-8">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">x{item.qty} · {item.price}</p>
              </div>
              <button onClick={() => remove(item.id)} className="text-red-400 text-xs hover:text-red-600">Remove</button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-600">Total</span>
            <span className="font-bold text-gray-900">\${total.toFixed(2)}</span>
          </div>
          <a
            href={`https://cash.app/$Microfyxd/${total.toFixed(2)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full block py-2.5 rounded-lg bg-[#00D632] text-black font-semibold text-center text-sm hover:bg-[#00f542] transition"
          >
            Pay with Cash App $Microfyxd
          </a>
          <button onClick={clear} className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600">Clear cart</button>
        </div>
      )}
    </div>
  );
}
