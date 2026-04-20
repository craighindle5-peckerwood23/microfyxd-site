// app/components/HologramSection.tsx
export default function HologramSection() {
  return (
    <section className="w-full py-28 flex flex-col items-center">
      <div className="w-[380px] h-[380px] rounded-full bg-[#0A0F14] border border-[#1BC7F1]/30 shadow-[0_0_60px_#1BC7F1] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1BC7F1]/20 to-transparent animate-pulse" />
        <div className="w-48 h-48 bg-[#1BC7F1]/10 rounded-full border border-[#1BC7F1]/40 flex items-center justify-center animate-bounce">
          <div className="w-24 h-24 bg-[#1BC7F1]/20 rounded-full border border-[#1BC7F1]/60" />
        </div>
        <div className="absolute bottom-10 text-[#1BC7F1] font-mono text-xs tracking-widest uppercase animate-pulse">
          Holographic Link Active
        </div>
      </div>
    </section>
  )
}
