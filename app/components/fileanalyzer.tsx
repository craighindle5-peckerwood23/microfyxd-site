// app/components/FileAnalyzer.tsx
export default function FileAnalyzer() {
  return (
    <section className="w-full py-28 text-center">
      <h2 className="text-4xl font-grotesk font-bold">File Analyzer</h2>
      <p className="mt-4 text-gray-300 font-inter max-w-xl mx-auto">
        Upload documents, reports, or data files for instant structured analysis.
      </p>
      
      <div className="mt-12 max-w-xl mx-auto p-8 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#1BC7F1]/30 transition-all cursor-pointer group">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📄</div>
        <div className="text-white font-grotesk font-bold">Drop files here</div>
        <div className="text-gray-500 text-sm mt-2">PDF, CSV, or TXT (Max 50MB)</div>
      </div>
    </section>
  )
}
