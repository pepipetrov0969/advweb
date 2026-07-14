import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PracticeAreasGrid } from "@/components/home/PracticeAreasGrid";
import { CtaBand } from "@/components/shared/CtaBand";

export const metadata: Metadata = {
  title: "Области на дейност",
  description:
    "Области на правна практика - вещно, облигационно, търговско, семейно, наследствено, трудово и административно право.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Области на дейност"
            title="В какво мога да ви съдействам"
            lead="Изберете област, за да видите типичните казуси, по които работя, и как протича защитата."
          />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <PracticeAreasGrid />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
