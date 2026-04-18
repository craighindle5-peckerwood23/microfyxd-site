import FinalCTA from "@/components/FinalCTA"
import CoachingPost from "@/components/CoachingPost"

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <HologramSection />
      <NeuralLink />
      <GroqLPU />
      <Capabilities />
      <OperatorConsoleSection />
      <MicroTaskEngine />
      <FileAnalyzer />
      <WorkflowBuilder />
      <PoweredByGroq />
      <FinalCTA />
      <CoachingPost />
    </main>
  )
}
