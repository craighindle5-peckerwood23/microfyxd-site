import hero from "@/components/hero";
import hologramsection from "@/components/hologramsection";
import neurallink from "@/components/neurallink";
import groqlpu from "@/components/groqlpu";
import operatorconsolesection from "@/components/operatorconsolesection";
import microtaskengine from "@/components/microtaskengine";
import fileanalyzer from "@/components/fileanalyzer";
import workflowbuilder from "@/components/workflowbuilder";
import poweredbygroq from "@/components/poweredbygroq";
import coachingpost from "@/components/coachingpost";
import finalcta from "@/components/finalcta";

export default function Page() {
  return (
    <main className="flex flex-col w-full items-center justify-center">
      <section className="w-full">
        <hero />
      </section>

      <section className="w-full">
        <hologramsection />
      </section>

      <section className="w-full">
        <neurallink />
      </section>

      <section className="w-full">
        <groqlpu />
      </section>

      <section className="w-full">
        <operatorconsolesection />
      </section>

      <section className="w-full">
        <microtaskengine />
      </section>

      <section className="w-full">
        <fileanalyzer />
      </section>

      <section className="w-full">
        <workflowbuilder />
      </section>

      <section className="w-full">
        <poweredbygroq />
      </section>

      <section className="w-full">
        <coachingpost />
      </section>

      <section className="w-full">
        <finalcta />
      </section>
    </main>
  );
}
