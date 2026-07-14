"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const ROTATE_MS = 7000;

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      ROTATE_MS,
    );
    return () => clearInterval(timer);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Отзиви"
          title="Какво споделят клиентите"
          align="center"
        />

        <div
          className="relative mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex min-h-[26rem] flex-col items-center justify-center rounded-2xl border border-line bg-parchment px-8 py-10 text-center shadow-sm sm:min-h-[21rem] sm:px-14">
            <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-coffee text-cream">
              <Quote className="size-5" />
            </span>
            <blockquote key={index} className="animate-fade-up">
              <p className="mt-6 font-display text-lg leading-relaxed text-espresso sm:text-xl">
                „{current.quote}“
              </p>
              <footer className="mt-6 text-sm">
                <span className="font-semibold text-coffee">{current.author}</span>
                <span className="text-clay"> · {current.context}</span>
              </footer>
            </blockquote>
          </div>

          <button
            type="button"
            aria-label="Предишен отзив"
            onClick={() =>
              setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
            }
            className="absolute -left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-espresso shadow-sm transition-colors hover:bg-cream sm:-left-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Следващ отзив"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="absolute -right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-espresso shadow-sm transition-colors hover:bg-cream sm:-right-6"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.author}
                type="button"
                aria-label={`Отзив ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-coffee" : "w-2 bg-line hover:bg-tan",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
