"use client";

import { Product } from "@/lib/products";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: Product[];
  remove: (id: string) => void;
  clear: () => void;
};

export default function CartDrawer({ open, onClose, cart, remove, clear }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Background */}
      <div
        className="flex-1 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="w-80 bg-white h-full shadow-xl p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="mt-6 text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.price}</p>
                </div>

                <button
                  onClick={() => remove(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={clear}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Clear Cart
            </button>

            <button
              className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Checkout (coming soon)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}