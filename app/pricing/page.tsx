// app/pricing/page.tsx
import PlanCard from "../components/PlanCard";

export default function PricingPage() {
  return (
    <main className="w-full min-h-screen bg-[#05070A] py-24 px-6">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-grotesk font-bold text-white">Pricing</h1>
        <p className="mt-4 text-gray-300 font-inter">
          Start at $9.99/month. Scale when your operations demand it.
        </p>
        <p className="mt-2 text-xs text-gray-500 font-inter">
          Cancel anytime. No contracts. Operator‑grade performance from day one.
        </p>
      </section>

      <section className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <PlanCard
          name="Starter"
          description="For individual operators and small shops."
          price={9.99}
          features={[
            "Core operator console",
            "Basic workflows",
            "Up to 3 active workflows",
            "Standard support",
          ]}
        />

        <PlanCard
          name="Pro"
          description="For growing teams and multi‑bay operations."
          price={29.99}
          features={[
            "Everything in Starter",
            "Advanced workflows",
            "File analyzer access",
            "Up to 15 active workflows",
            "Priority support",
          ]}
          highlight
        />

        <PlanCard
          name="Operator"
          description="For high‑volume, high‑stakes operations."
          price={79.99}
          features={[
            "Everything in Pro",
            "Custom workflow design",
            "SLAs & integrations",
            "Dedicated operator support",
            "Unlimited active workflows",
          ]}
        />
      </section>

      <section className="mt-12 text-center">
        <p className="text-xs text-gray-600 font-inter">
          Payments processed via Cash App · $Microfyxd · Manual activation within 24 hours
        </p>
      </section>
    </main>
  );
}
