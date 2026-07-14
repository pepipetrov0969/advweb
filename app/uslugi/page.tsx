import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceCategories } from "@/content/services";
import { dualPrice } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/shared/CtaBand";
import { serviceCategoryIcons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Услуги и цени",
  description:
    "Правни услуги с ясни цени - недвижими имоти, фирмени регистрации, семейно право, съдебни дела и консултации.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Услуги"
            title="Услуги и цени"
            lead="Най-търсените услуги са с предварително обявени цени. За по-сложни казуси възнаграждението се договаря според обема и материалния интерес."
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
        <Container className="space-y-16 py-16 sm:py-20">
          {serviceCategories.map((category) => {
            const Icon = serviceCategoryIcons[category.icon];
            return (
              <div key={category.slug} id={category.slug}>
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

                <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/uslugi/${service.slug}`}
                      className="group flex flex-col rounded-xl border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-tan hover:shadow-md"
                    >
                      <h3 className="font-display text-lg font-semibold text-espresso group-hover:text-coffee">
                        {service.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-clay">
                        {service.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                        <p className="text-sm font-semibold text-coffee">
                          {service.priceEUR === null
                            ? "по договаряне"
                            : dualPrice(
                                service.priceEUR,
                                service.priceFrom ? "от" : undefined,
                              )}
                        </p>
                        <ArrowRight className="size-4 text-chestnut transition-transform group-hover:translate-x-1" />
                      </div>
                      {service.priceNote ? (
                        <p className="mt-1 text-xs text-clay">{service.priceNote}</p>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <p className="rounded-xl border border-line bg-parchment px-6 py-4 text-sm leading-relaxed text-clay">
            Посочените цени са ориентировъчни и не включват държавни, съдебни и
            нотариални такси, освен ако изрично не е посочено друго. Точното
            възнаграждение се потвърждава преди започване на работа.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Не откривате услугата, която търсите?"
        text="Свържете се с кантората - ще прецените заедно как може да ви бъде помогнато."
      />
    </>
  );
}
