export function WhisperCard({ children, className = "" }) {
  return (
    <div className={`whisper-card relative ${className}`}>
      {children}
    </div>
  );
}