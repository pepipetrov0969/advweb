import type { Metadata } from "next";
import { Check } from "lucide-react";
import { serviceCategories } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/shared/CtaBand";
import { serviceCategoryIcons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Правни услуги по области - търговско, вещно, банково, гражданско, семейно и наследствено право, трудово и административно право.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Услуги"
            title="В какво мога да ви съдействам"
            lead="Конкретните услуги, които предлагам, подредени по правни области. За индивидуална преценка на казуса ви - запазете час за консултация."
          />
          <nav aria-label="Категории услуги" className="mt-8 flex flex-wrap gap-2">
            {serviceCategories.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-coffee transition-colors hover:border-tan hover:bg-parchment"
              >
                {category.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="space-y-14 py-16 sm:py-20">
          {serviceCategories.map((category) => {
            const Icon = serviceCategoryIcons[category.icon];
            return (
              <div key={category.slug} id={category.slug} className="scroll-mt-36">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-tan/30 text-chestnut">
                    <Icon className="size-6" strokeWidth={1.9} />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-espresso">
                      {category.title}
                    </h2>
                    <p className="mt-1 max-w-3xl text-sm leading-relaxed text-clay">
                      {category.intro}
                    </p>
                  </div>
                </div>

                <ul className="mt-7 grid gap-x-8 gap-y-3 rounded-2xl border border-line bg-parchment p-6 sm:grid-cols-2 sm:p-8">
                  {category.services.map((service) => (
                    <li key={service} className="flex items-start gap-2.5 text-sm text-ink">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-coffee/10 text-coffee">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Container>
      </section>

      <CtaBand
        title="Не откривате услугата, която търсите?"
        text="Свържете се с кантората - ще прецените заедно как може да ви бъде помогнато."
      />
    </>
  );
}
