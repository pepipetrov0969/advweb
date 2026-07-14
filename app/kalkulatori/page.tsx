import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gavel, Info, Scale, Stamp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/shared/CtaBand";
import { calculatorLinks } from "@/components/calculators/CalculatorShell";
import { LAST_VERIFIED } from "@/lib/tariffs";

export const metadata: Metadata = {
  title: "Правни калкулатори",
  description:
    "Безплатни калкулатори за нотариални такси, държавни такси в съда и минимални адвокатски възнаграждения.",
};

const icons = [Stamp, Gavel, Scale];

export default function CalculatorsPage() {
  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Калкулатори"
            title="Изчислете разноските предварително"
            lead="Безплатни инструменти за бърза ориентация в таксите и възнагражденията - преди да предприемете каквито и да е правни действия."
          />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculatorLinks.map((link, i) => {
              const Icon = icons[i];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col rounded-xl border border-line bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-tan hover:shadow-md"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-tan/30 text-chestnut transition-colors group-hover:bg-coffee group-hover:text-cream">
                    <Icon className="size-6" strokeWidth={1.8} />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-semibold text-espresso group-hover:text-coffee">
                    {link.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-clay">
                    {link.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-coffee">
                    Към калкулатора
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 flex gap-3 rounded-xl border border-tan/40 bg-parchment px-5 py-4 text-sm leading-relaxed text-clay">
            <Info className="mt-0.5 size-4.5 shrink-0 text-chestnut" />
            <p>
              Калкулаторите дават ориентировъчни стойности по действащите
              тарифи (проверени към {LAST_VERIFIED}) и не представляват правен
              съвет. Конкретният казус може да включва допълнителни такси и
              разноски.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
