import Hero from "@/app/components/Hero";
import ProofIntoPower from "@/app/components/ProofIntoPower";
import TopTools from "@/app/components/TopTools";
import RecommendedBundles from "@/app/components/RecommendedBundles";
import EmergencyBundle from "@/app/components/EmergencyBundle";
import TestimonialCarousel from "@/app/components/TestimonialCarousel";
import OperatorConsoleSection from "@/app/components/OperatorConsoleSection";
import WorkflowBuilder from "@/app/components/WorkflowBuilder";
import MicroTaskEngine from "@/app/components/MicroTaskEngine";
import FileAnalyzer from "@/app/components/FileAnalyzer";
import PoweredByGroq from "@/app/components/PoweredByGroq";
import FinalCTA from "@/app/components/FinalCTA";

export default function Page() {
  return (
    <main className="flex flex-col w-full items-center">

      {/* HERO */}
      <section className="w-full">
        <Hero />
      </section>

      {/* PROOF INTO POWER */}
      <section className="w-full">
        <ProofIntoPower />
      </section>

      {/* TOP 5 TOOLS */}
      <section className="w-full">
        <TopTools />
      </section>

      {/* RECOMMENDED BUNDLES */}
      <section className="w-full">
        <RecommendedBundles />
      </section>

      {/* EMERGENCY BUNDLE (Best Value Badge) */}
      <section className="w-full">
        <EmergencyBundle />
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full">
        <TestimonialCarousel />
      </section>

      {/* OPERATOR CONSOLE */}
      <section className="w-full">
        <OperatorConsoleSection />
      </section>

      {/* WORKFLOW BUILDER */}
      <section className="w-full">
        <WorkflowBuilder />
      </section>

      {/* MICRO TASK ENGINE */}
      <section className="w-full">
