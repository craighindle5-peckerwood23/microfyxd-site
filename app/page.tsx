import Hero from "@/components/Hero";
import HologramSection from "@/components/HologramSection";
import NeuralLink from "@/components/NeuralLink";
import GroqLPU from "@/components/GroqLPU";
import OperatorConsoleSection from "@/components/OperatorConsoleSection";
import MicroTaskEngine from "@/components/MicroTaskEngine";
import FileAnalyzer from "@/components/FileAnalyzer";
import WorkflowBuilder from "@/components/WorkflowBuilder";
import PoweredByGroq from "@/components/PoweredByGroq";
import CoachingPost from "@/components/CoachingPost";
import FinalCTA from "@/components/FinalCTA";

export default function Page() {
  return (
    <main className="flex flex-col w-full items-center justify-center">
      <section className="w-full">
        <Hero />
      </section>

      <section className="w-full">
        <HologramSection />
      </section>

      <section className="w-full">
        <NeuralLink />
      </section>

      <section className="w-full">
        <GroqLPU />
      </section>

      <section className="w-full">
        <OperatorConsoleSection />
      </section>

      <section className="w-full">
        <MicroTaskEngine />
      </section>

      <section className="w-full">
        <FileAnalyzer />
      </section>

      <section className="w-full">
        <WorkflowBuilder />
      </section>

      <section className="w-full">
        <PoweredByGroq />
      </section>

      <section className="w-full">
        <CoachingPost />
      </section>

      <section className="w-full">
        <FinalCTA />
      </section>
    </main>
  );
}:
