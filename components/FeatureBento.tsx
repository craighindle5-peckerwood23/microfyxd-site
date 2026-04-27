export function FeatureBento({ features }) {
  return (
    <section className="grid gap-4 md:grid-cols-3 py-16">
      {features.map((f) => (
        <article
          key={f.id}
          className="group relative overflow-hidden rounded-frame border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.04)] backdrop-blur-xl opacity-15 hover:opacity-100 transition-all duration-500 hover:-translate-y-1"
        >
          <div className="relative p-6 flex flex-col gap-3">
            <div className="text-cyan-300/80">{f.icon}</div>
            <h3 className="text-sm font-medium text-slate-100">{f.title}</h3>
            <p className="text-xs text-slate-400">{f.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}