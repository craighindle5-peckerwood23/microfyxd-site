// app/components/StripeButton.tsx
type StripeButtonProps = {
  url: string
  label?: string
}

export default function StripeButton({ url, label }: StripeButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="w-full py-3 rounded-lg bg-white text-black font-semibold text-center block hover:bg-gray-100 transition text-sm"
    >
      {label || 'Pay with Stripe'}
    </a>
  )
}
