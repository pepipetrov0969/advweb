import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PracticeAreasGrid } from "@/components/home/PracticeAreasGrid";
import { AboutPreview } from "@/components/home/AboutPreview";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CtaBand } from "@/components/shared/CtaBand";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ServicesPreview />

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Области на дейност"
              title="Правна помощ във всички ключови области"
              lead="От имотни сделки и договори до съдебни спорове - компетентна защита според конкретния ви казус."
            />
            <ButtonLink href="/oblasti-na-deynost" variant="outline">
              Всички области
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <PracticeAreasGrid compact className="mt-12" />
        </Container>
      </section>

      <AboutPreview />
      <TestimonialsCarousel />
      <CtaBand />
    </>
  );
}
