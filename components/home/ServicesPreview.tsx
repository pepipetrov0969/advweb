import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredServices } from "@/content/services";
import { dualPrice } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { serviceCategoryIcons } from "@/components/icons";

export function ServicesPreview() {
  const services = featuredServices();

  return (
    <section className="border-y border-line bg-parchment">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Услуги"
            title="Как мога да ви бъда полезна"
            lead="Фиксирани цени за най-търсените услуги - знаете разходите си предварително, без скрити такси."
          />
          <ButtonLink href="/uslugi" variant="outline">
            Всички услуги
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceCategoryIcons[service.category.icon];
            return (
              <Link
                key={service.slug}
                href={`/uslugi/${service.slug}`}
                className="group flex flex-col rounded-xl border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-tan hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-tan/30 text-chestnut">
                    <Icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <p className="text-xs font-medium uppercase tracking-wider text-chestnut">
                    {service.category.title}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-espresso group-hover:text-coffee">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-clay">
                  {service.excerpt}
                </p>
                <p className="mt-5 border-t border-line pt-4 text-sm font-semibold text-coffee">
                  {service.priceEUR === null
                    ? "по договаряне"
                    : dualPrice(service.priceEUR, service.priceFrom ? "от" : undefined)}
                  {service.priceNote ? (
                    <span className="ml-1 font-normal text-clay">
                      · {service.priceNote}
                    </span>
                  ) : null}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
