// app/components/FinalCTA.tsx
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="w-full py-32 text-center">
      <h2 className="text-5xl font-grotesk font-bold">
        Ready to Operate at Groq Speed
      </h2>

      <Link href="/upgrade">
        <button className="mt-10 px-10 py-4 rounded-lg font-semibold bg-gradient-to-r from-[#2EE9D1] via-[#1BC7F1] to-[#007BFF] text-black">
          Launch Microfyxd
        </button>
      </Link>
    </section>
  )
}
