// app/components/CashAppButton.tsx
type CashAppButtonProps = {
  amount?: number
}

export default function CashAppButton({ amount }: CashAppButtonProps) {
  const tag = "$microfyxd"
  const url = amount
    ? `https://cash.app/${tag}/${amount}`
    : `https://cash.app/${tag}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="w-full py-3 rounded-lg bg-[#00D632] text-black font-semibold text-center block hover:bg-[#00f542] transition text-sm"
    >
      Pay with Cash App
    </a>
  )
}
