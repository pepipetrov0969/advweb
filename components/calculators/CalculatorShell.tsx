import Link from "next/link";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { LAST_VERIFIED } from "@/lib/tariffs";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/shared/CtaBand";

export const calculatorLinks = [
  {
    href: "/kalkulatori/notarialni-taksi",
    title: "Разноски при имотна сделка",
    description:
      "Нотариална такса, такса за вписване и местен данък при покупка на имот.",
  },
  {
    href: "/kalkulatori/sadebni-taksi",
    title: "Държавни такси в съда",
    description:
      "Такси за исково, заповедно и въззивно производство по ГПК.",
  },
  {
    href: "/kalkulatori/advokatski-vaznagrazhdeniya",
    title: "Адвокатско възнаграждение",
    description:
      "Минимални размери по Наредба № 1 според материалния интерес.",
  },
];

export function CalculatorShell({
  href,
  title,
  lead,
  legalBasis,
  children,
}: {
  href: string;
  title: string;
  lead: string;
  legalBasis: string;
  children: React.ReactNode;
}) {
  const others = calculatorLinks.filter((link) => link.href !== href);

  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="py-14 sm:py-16">
          <Link
            href="/kalkulatori"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-coffee transition-colors hover:text-espresso"
          >
            <ArrowLeft className="size-4" />
            Всички калкулатори
          </Link>
          <h1 className="mt-6 font-display text-3xl font-semibold text-espresso sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl leading-relaxed text-clay">{lead}</p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-14 sm:py-16">
          {children}

          <div className="mt-10 flex gap-3 rounded-xl border border-tan/40 bg-parchment px-5 py-4 text-sm leading-relaxed text-clay">
            <Info className="mt-0.5 size-4.5 shrink-0 text-chestnut" />
            <p>
              Изчислението е ориентировъчно и не представлява правен съвет.
              Правно основание: {legalBasis}. Стойностите са проверени към{" "}
              {LAST_VERIFIED} - при промяна на тарифите е възможно отклонение.
              За точна калкулация по конкретен казус се свържете с кантората.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {others.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-white p-5 transition-all hover:border-tan hover:shadow-md"
              >
                <div>
                  <p className="font-display text-base font-semibold text-espresso group-hover:text-coffee">
                    {link.title}
                  </p>
                  <p className="mt-1 text-sm text-clay">{link.description}</p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-chestnut transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Нужна ви е точна преценка?"
        text="Калкулаторите дават ориентир - конкретният казус може да включва допълнителни такси и разноски."
      />
    </>
  );
}
