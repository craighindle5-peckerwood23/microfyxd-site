// app/components/PayPalButton.tsx
type PayPalButtonProps = {
  url: string
  label?: string
}

export default function PayPalButton({ url, label }: PayPalButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="w-full py-3 rounded-lg bg-[#FFC439] text-black font-semibold text-center block hover:bg-[#ffd766] transition text-sm"
    >
      {label || 'Pay with PayPal'}
    </a>
  )
}
