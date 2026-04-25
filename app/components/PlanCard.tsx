"use client";

import CashAppButton from "./CashAppButton";

type PlanCardProps = {
  name: string;
  description: string;
  price: number;
  period?: string;
  features: string[];
  highlight?: boolean;
};

export default function PlanCard({
  name,
  description,
  price,
  period = "mo",
  features,
  highlight,
}: PlanCardProps) {
  return (
    <div
      className={`p-8 rounded-2xl bg-[#05070A] border ${
        highlight
          ? "border-[#1BC7F1]/70 shadow-[0_0_40px_rgba(27,199,241,0.2)]"
          : "border-gray-800"
      }`}
    >
      {highlight && (
        <p className="mb-3 text-[11px] text-[#1BC7F1] font-inter uppercase tracking-widest">
          Most Popular
        </p>
      )}
      <h2 className="text-xl font-grotesk font-semibold">{name}</h2>
      <p className="mt-2 text-gray-400 font-inter text-sm">{description}</p>

      <p className="mt-6 text-4xl font-grotesk font-bold">
        ${price.toFixed(2)}
        <span className="text-base text-gray-400 font-inter">/{period}</span>
      </p>

      <ul className="mt-6 space-y-2 text-sm text-gray-300 font-inter">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-[#00D632] mt-0.5">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <CashAppButton amount={price} planName={name} />
      </div>
    </div>
  );
}
