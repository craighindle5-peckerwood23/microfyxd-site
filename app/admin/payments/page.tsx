"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Confirmation = {
  id: string;
  name: string;
  email: string;
  cash_tag: string;
  confirmation_note: string;
  amount: number;
  plan_name: string;
  status: string;
  created_at: string;
};

export default function AdminPaymentsPage() {
  const [rows, setRows] = useState<Confirmation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRows = async () => {
    const { data } = await supabase
      .from("payment_confirmations")
      .select("*")
      .order("created_at", { ascending: false });
    setRows(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("payment_confirmations").update({ status }).eq("id", id);
    fetchRows();
  };

  useEffect(() => { fetchRows(); }, []);

  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold font-grotesk mb-2">Payment Confirmations</h1>
        <p className="text-zinc-400 text-sm mb-8">Review and approve Cash App payments manually.</p>

        {loading ? (
          <p className="text-zinc-500">Loading...</p>
        ) : rows.length === 0 ? (
          <p className="text-zinc-500">No pending payments.</p>
        ) : (
          <div className="space-y-4">
            {rows.map((row) => (
              <div key={row.id} className="border border-zinc-800 rounded-xl bg-zinc-900/50 p-5">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <p className="font-semibold text-white">{row.name}</p>
                    <p className="text-zinc-400 text-sm">{row.email}</p>
                    <p className="text-[#00D632] text-sm font-mono">{row.cash_tag}</p>
                    {row.confirmation_note && (
                      <p className="text-zinc-500 text-xs mt-1">Note: {row.confirmation_note}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">${row.amount?.toFixed(2)}/mo</p>
                    <p className="text-zinc-400 text-xs">{row.plan_name} plan</p>
                    <p className="text-zinc-600 text-xs mt-1">
                      {new Date(row.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      row.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : row.status === "rejected"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {row.status.toUpperCase()}
                  </span>

                  {row.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(row.id, "approved")}
                        className="px-3 py-1 rounded bg-green-600 hover:bg-green-500 text-white text-xs font-semibold transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(row.id, "rejected")}
                        className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white text-xs font-semibold transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
