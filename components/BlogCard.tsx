import { WhisperCard } from "./WhisperCard";

export function BlogCard({ title, excerpt }) {
  return (
    <WhisperCard className="p-6 group relative overflow-hidden">
      <div className="relative space-y-2">
        <h3 className="text-sm font-medium text-slate-100">{title}</h3>
        <p className="text-xs text-slate-400">{excerpt}</p>
      </div>
    </WhisperCard>
  );
}