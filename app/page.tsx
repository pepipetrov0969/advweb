import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CtaBand } from "@/components/shared/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ServicesPreview />
      <AboutPreview />
      <TestimonialsCarousel />
      <CtaBand />
    </>
  );
}
