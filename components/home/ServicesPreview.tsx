import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceCategories } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { serviceCategoryIcons } from "@/components/icons";

export function ServicesPreview() {
  return (
    <section className="border-y border-line bg-parchment">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Услуги"
            title="Как мога да ви бъда полезна"
            lead="Правни услуги по основните области на практиката ми."
          />
          <ButtonLink href="/uslugi" variant="outline">
            Всички услуги
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => {
            const Icon = serviceCategoryIcons[category.icon];
            return (
              <Link
                key={category.slug}
                href={`/uslugi#${category.slug}`}
                className="group flex flex-col rounded-xl border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-tan hover:shadow-md"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-tan/30 text-chestnut transition-colors group-hover:bg-coffee group-hover:text-cream">
                  <Icon className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-espresso group-hover:text-coffee">
                  {category.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-clay">
                  {category.intro}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
