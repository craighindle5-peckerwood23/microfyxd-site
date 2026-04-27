import { WhisperCard } from "./WhisperCard";

export function Pricing() {
  const tiers = [
    { name: "Starter", highlighted: false },
    { name: "Focus", highlighted: true },
    { name: "Scale", highlighted: false },
  ];

  const features = [
    { label: "Idea capture canvas", starter: true, focus: true, scale: true },
    { label: "Team workspaces", starter: false, focus: true, scale: true },
    { label: "Custom integrations", starter: false, focus: false, scale: true },
  ];

  return (
    <section className="py-20 space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <WhisperCard key={tier.name} className={`p-8 ${tier.highlighted ? "relative" : ""}`}>
            {tier.highlighted && (
              <div className="absolute -inset-px rounded-frame pointer-events-none animate-pulseSlow border border-cyan-400/40" />
            )}
            <h3 className="text-lg font-medium">{tier.name}</h3>
          </WhisperCard>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-frame border border-[rgba(255,255,255,0.05)]">
        <table className="w-full text-sm">
          <tbody>
            {features.map((f) => (
              <tr key={f.label} className="border-t border-white/5">
                <td className="px-4 py-3 text-slate-300">{f.label}</td>
                {[f.starter, f.focus, f.scale].map((enabled, i) => (
                  <td key={i} className={`px-4 py-3 text-center ${enabled ? "relative shimmer-row" : "text-slate-600"}`}>
                    {enabled ? "✓" : "–"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <WhisperCard className="p-10 mt-10 flex items-center justify-between">
        <div className="text-sm text-slate-300">Your specific scale. Defined here.</div>
        <div className="flex items-center gap-2 text-xs text-cyan-300 cursor-text">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.6)]" />
          <span>Describe your enterprise constraints…</span>
        </div>
      </WhisperCard>
    </section>
  );
}