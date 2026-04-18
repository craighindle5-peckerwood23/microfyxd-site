// app/page.tsx

import Hero from "@/components/Hero"
import HologramSection from "@/components/HologramSection"
import NeuralLink from "@/components/NeuralLink"
import GroqLPU from "@/components/GroqLPU"
import Capabilities from "@/components/Capabilities"
import OperatorConsoleSection from "@/components/OperatorConsoleSection"
import MicroTaskEngine from "@/components/MicroTaskEngine"
import FileAnalyzer from "@/components/FileAnalyzer"
import WorkflowBuilder from "@/components/WorkflowBuilder"
import PoweredByGroq from "@/components/PoweredByGroq"
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