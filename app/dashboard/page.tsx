"use client";

import { useState } from "react";

type ClaimStatus = "Open" | "In Review" | "Approved" | "Denied";

interface Claim {
  id: string;
  claimant: string;
  type: string;
  amount: string;
  status: ClaimStatus;
  risk: "Low" | "Medium" | "High";
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: "CLM-10293",
    claimant: "J. Martinez",
    type: "Auto",
    amount: "$8,420",
    status: "In Review",
    risk: "High",
  },
  {
    id: "CLM-10288",
    claimant: "S. Patel",
    type: "Home",
    amount: "$14,200",
    status: "Open",
    risk: "Medium",
  },
  {
    id: "CLM-10271",
    claimant: "R. Chen",
    type: "Health",
    amount: "$2,130",
    status: "Approved",
    risk: "Low",
  },
  {
    id: "CLM-10265",
    claimant: "L. Johnson",
    type: "Auto",
    amount: "$5,980",
    status: "Denied",
    risk: "High",
  },
];

export default function DashboardPage() {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(MOCK_CLAIMS[0]);

  return (
    <main className="min-h-screen bg-[#050509] text-white flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-[#050509]/95 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center text-black font-extrabold text-sm">
            M
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Microfyxd Command</h1>
            <p className="text-xs text-gray-400">AI‑powered claims execution environment</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">
            Operator Mode
          </span>
          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-[1.6fr_1.2fr] gap-6 p-6">
        {/* Left: Claims Table */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-gray-400">
                Claims Queue
              </h2>
              <p className="text-xs text-gray-500">
                Live triage of active and high‑signal claims.
              </p>
            </div>
            <button className="px-3 py-1.5 text-xs rounded-lg border border-cyan-500/60 text-cyan-300 hover:bg-cyan-500/10 transition">
              New Claim
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-4 py-3">Claim</th>
                  <th className="text-left px-4 py-3">Claimant</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Amount</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Risk</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CLAIMS.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => setSelectedClaim(claim)}
                    className={`cursor-pointer border-t border-white/5 hover:bg-white/5 transition ${
                      selectedClaim?.id === claim.id ? "bg-cyan-500/10" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-cyan-300">
                      {claim.id}
                    </td>
                    <td className="px-4 py-3">{claim.claimant}</td>
                    <td className="px-4 py-3 text-gray-300">{claim.type}</td>
                    <td className="px-4 py-3">{claim.amount}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={claim.status} />
                    </td>
                    <td className="px-4 py-3">
                      <RiskPill risk={claim.risk} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right: Detail + AI Panel */}
        <section className="flex flex-col gap-4">
          {/* Claim Detail */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-gray-400 mb-3">
              Claim Detail
            </h2>

            {selectedClaim ? (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Claim ID</span>
                  <span className="font-mono text-cyan-300">{selectedClaim.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Claimant</span>
                  <span>{selectedClaim.claimant}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Type</span>
                  <span>{selectedClaim.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Requested Amount</span>
                  <span className="font-semibold">{selectedClaim.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <StatusPill status={selectedClaim.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Risk Profile</span>
                  <RiskPill risk={selectedClaim.risk} />
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Select a claim from the queue.</p>
            )}
          </div>

          {/* AI Insight Panel */}
          <div className="bg-white/5 border border-cyan-500/40 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.25),_transparent_55%)]" />
            <div className="relative">
              <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-3">
                AI Claims Insight
              </h2>
              <p className="text-xs text-gray-300 mb-3">
                This is a placeholder for your AI engine. Here you’ll surface payout ranges,
                risk factors, and recommended actions for the selected claim.
              </p>
              <div className="text-xs bg-black/40 border border-white/10 rounded-xl p-3 text-gray-200">
                <p className="mb-1 text-cyan-300 font-mono text-[11px]">
                  // Example: AI summary for {selectedClaim?.id ?? "selected claim"}
                </p>
                <p>
                  Claim shows elevated risk due to prior incidents and payout history. Recommend
                  manual review with focus on documentation completeness and fraud indicators.
                </p>
              </div>

              <button className="mt-4 w-full py-2.5 rounded-lg bg-cyan-500 text-black text-sm font-semibold hover:bg-cyan-400 transition">
                Run AI Analysis
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusPill({ status }: { status: ClaimStatus }) {
  const color =
    status === "Approved"
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
      : status === "Denied"
      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
      : status === "In Review"
      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
      : "bg-slate-500/20 text-slate-200 border-slate-500/40";

  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] border ${color}`}>
      {status}
    </span>
  );
}

function RiskPill({ risk }: { risk: "Low" | "Medium" | "High" }) {
  const color =
    risk === "High"
      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
      : risk === "Medium"
      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";

  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] border ${color}`}>
      {risk} Risk
    </span>
  );
}
