// app/components/OperatorConsoleSection.tsx
import AIConsole from './aiconsole'

export default function OperatorConsoleSection() {
  return (
    <section className="w-full py-32">
      <h2 className="text-center text-4xl font-grotesk font-bold">
        Operator Console
      </h2>
      <p className="text-center text-gray-300 mt-4 font-inter">
        Execute tasks, analyze data, and control workflows in real time.
      </p>

      <div className="mt-12 max-w-4xl mx-auto">
        <AIConsole />
      </div>
    </section>
  )
}
