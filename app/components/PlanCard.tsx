// app/components/PlanCard.tsx
import StripeButton from "./StripeButton"
import PayPalButton from "./PayPalButton"
import CashAppButton from "./CashAppButton"

type PlanCardProps = {
  name: string
  description: string
  price: number
  period?: string
  features: string[]
  highlight?: boolean
  stripeUrl: string
  paypalUrl: string
}

export default function PlanCard({
  name,
  description,
  price,
  period = "mo",
  features,
  highlight,
  stripeUrl,
  paypalUrl,
}: PlanCardProps) {
  return (
    <div
      className={`p-8 rounded-2xl bg-[#05070A] border ${
        highlight
          ? "border-[#1BC7F1]/70 shadow-[0_0_40px_#1BC7F1]/40"
          : "border-gray-800"
      }`}
    >
      <h2 className="text-xl font-grotesk font-semibold">{name}</h2>
      <p className="mt-2 text-gray-400 font-inter text-sm">{description}</p>

      <p className="mt-6 text-4xl font-grotesk font-bold">
        ${price.toFixed(2)}
        <span className="text-base text-gray-400 font-inter">/{period}</span>
      </p>

      <ul className="mt-6 space-y-2 text-sm text-gray-300 font-inter">
        {features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>

      <div className="mt-8 space-y-2">
        <StripeButton url={stripeUrl} label="Subscribe with Stripe" />
        <PayPalButton url={paypalUrl} label="Subscribe with PayPal" />
        <CashAppButton amount={price} />
      </div>

      {highlight && (
        <p className="mt-3 text-[11px] text-[#1BC7F1] font-inter uppercase tracking-wide">
          Most popular
        </p>
      )}
    </div>
  )
}
