const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$9/mo",
    description: "For individuals getting started with AI operations.",
    features: [
      "AI Operator Console",
      "Micro-task engine",
      "File analyzer (limited)",
      "Up to 50 messages/day",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29/mo",
    description: "For power users and solo operators.",
    features: [
      "Unlimited console & micro-tasks",
      "Unlimited file analysis",
      "Workflow builder",
      "Document filler & PDF export",
      "Priority speed",
    ],
  },
  {
    id: "automation",
    name: "Automation Suite",
    price: "$49/mo",
    description: "For automation-heavy users and small teams.",
    features: [
      "Everything in Pro",
      "Phone & SMS automation (coming online)",
      "Web scraping & API chaining",
      "Scheduled workflows",
      "Team access",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center">
          Choose Your Operating Tier
        </h1>
        <p className="text-zinc-400 text-center mt-3">
          All plans are recurring. Upgrade, downgrade, or cancel anytime.
        </p>

        <div className="grid gap-8 mt-12 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border border-zinc-800 rounded-xl p-6 flex flex-col justify-between bg-zinc-950/60"
            >
              <div>
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="text-2xl font-bold mt-2">{plan.price}</p>
                <p className="text-zinc-400 text-sm mt-2">
                  {plan.description}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="mt-6 w-full py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-medium"
                onClick={() => {
                  // For now, send them to a Cash App instructions page
                  window.location.href = `/upgrade?plan=${plan.id}`;
                }}
              >
                Subscribe with Cash App
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
