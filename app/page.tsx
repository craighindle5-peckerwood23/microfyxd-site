import Hero from "@/app/components/Hero";
import HologramSection from "@/app/components/hologramsection";
import NeuralLink from "@/app/components/neurallink";
import GroqLPU from "@/app/components/groqlpu";
import OperatorConsoleSection from "@/app/components/operatorconsolesection";
import MicroTaskEngine from "@/app/components/microtaskengine";
import FileAnalyzer from "@/app/components/fileanalyzer";
import WorkflowBuilder from "@/app/components/workflowbuilder";
import PoweredByGroq from "@/app/components/poweredbygroq";
import CoachingPost from "@/app/components/coachingpost";
import FinalCTA from "@/app/components/finalcta";

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
}
