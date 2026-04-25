"use client";

import { useState } from "react";

type CashAppButtonProps = {
  amount?: number;
  planName?: string;
};

export default function CashAppButton({ amount, planName }: CashAppButtonProps) {
  const tag = "$Microfyxd";
  const cashUrl = amount
    ? `https://cash.app/${tag}/${amount}`
    : `https://cash.app/${tag}`;

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    cashTag: "",
    confirmationNote: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/payments/cashapp-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount, planName }),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full py-4 px-4 rounded-lg bg-zinc-900 border border-[#00D632]/40 text-center">
        <p className="text-[#00D632] font-semibold text-sm">✓ Payment submitted for review</p>
        <p className="text-zinc-400 text-xs mt-1">
          We'll verify your payment and activate your plan within 24 hours.
        </p>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-4">
        <p className="text-white text-sm font-semibold mb-1">Confirm your payment</p>
        <p className="text-zinc-400 text-xs mb-4">
          Send <span className="text-[#00D632] font-bold">${amount?.toFixed(2)}/mo</span> to{" "}
          <span className="text-[#00D632] font-bold">{tag}</span> then fill out the form below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            required
            placeholder="Your name"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#1BC7F1]"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Your email"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#1BC7F1]"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            required
            placeholder="Your Cash App $cashtag"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#1BC7F1]"
            value={form.cashTag}
            onChange={(e) => setForm({ ...form, cashTag: e.target.value })}
          />
          <input
            placeholder="Payment note or confirmation # (optional)"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#1BC7F1]"
            value={form.confirmationNote}
            onChange={(e) => setForm({ ...form, confirmationNote: e.target.value })}
          />
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 rounded bg-[#00D632] text-black font-semibold text-sm hover:bg-[#00f542] transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Confirmation"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-2 rounded bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700 transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <a
        href={cashUrl}
        target="_blank"
        rel="noreferrer"
        className="w-full py-3 rounded-lg bg-[#00D632] text-black font-semibold text-center block hover:bg-[#00f542] transition text-sm"
        onClick={() => setTimeout(() => setShowForm(true), 1500)}
      >
        Pay with Cash App {tag}
      </a>
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-2 rounded-lg border border-zinc-700 text-zinc-400 text-xs hover:border-zinc-500 hover:text-zinc-300 transition"
      >
        Already paid? Confirm here →
      </button>
    </div>
  );
}
