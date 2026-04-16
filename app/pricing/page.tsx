// app/pricing/page.tsx
import PlanCard from "../components/PlanCard"

export default function PricingPage() {
  return (
    <main className="w-full min-h-screen py-24">
      <section className="text-center">
        <h1 className="text-5xl font-grotesk font-bold">Pricing</h1>
        <p className="mt-4 text-gray-300 font-inter">
          Start at $9.99/month. Scale when your operations demand it.
        </p>
        <p className="mt-2 text-xs text-gray-500 font-inter">
          Cancel anytime. No contracts. Operator‑grade performance from day one.
        </p>
      </section>

      <section className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Starter – $9.99/mo */}
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
          stripeUrl="https://buy.stripe.com/REPLACE_ME_STARTER"
          paypalUrl="https://paypal.com/checkoutnow?token=REPLACE_ME_STARTER"
        />

        {/* Pro – $29.99/mo */}
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
          stripeUrl="https://buy.stripe.com/REPLACE_ME_PRO"
          paypalUrl="https://paypal.com/checkoutnow?token=REPLACE_ME_PRO"
        />

        {/* Operator – $79.99/mo */}
        <PlanCard
          name="Operator"
          description="For high‑volume, high‑stakes operations."
          price={79.99}
          features={[
            "Everything in Pro",
            "Custom workflow design",
            "SLAs & integrations",
            "Dedicated operator support",
          ]}
          stripeUrl="https://buy.stripe.com/REPLACE_ME_OPERATOR"
          paypalUrl="https://paypal.com/checkoutnow?token=REPLACE_ME_OPERATOR"
        />
      </section>

      <section className="mt-10 text-center text-xs text-gray-500 font-inter">
        <p>Replace Stripe and PayPal URLs with your live payment links.</p>
      </section>
    </main>
  )
}
