import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck, Check } from "lucide-react";
import { allServices, getService } from "@/content/services";
import { dualPrice } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/shared/CtaBand";

export function generateStaticParams() {
  return allServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.excerpt };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="py-14 sm:py-16">
          <Link
            href="/uslugi"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-coffee transition-colors hover:text-espresso"
          >
            <ArrowLeft className="size-4" />
            Всички услуги
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-chestnut">
            {service.category.title}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold text-espresso sm:text-4xl">
            {service.title}
          </h1>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <div className="space-y-4 leading-relaxed text-ink">
              {service.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {service.includes?.length ? (
              <div className="mt-8">
                <h2 className="font-display text-xl font-semibold text-espresso">
                  Какво включва услугата
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-coffee/10 text-coffee">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-parchment p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-chestnut">
              Цена
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-espresso">
              {service.priceEUR === null
                ? "По договаряне"
                : dualPrice(service.priceEUR, service.priceFrom ? "от" : undefined)}
            </p>
            {service.priceNote ? (
              <p className="mt-1 text-sm text-clay">{service.priceNote}</p>
            ) : null}
            <p className="mt-4 text-xs leading-relaxed text-clay">
              Цената е ориентировъчна и се потвърждава след запознаване с
              конкретния казус. Не включва държавни и нотариални такси.
            </p>
            <ButtonLink
              href={`/zapazi-chas?tema=${encodeURIComponent(service.category.title)}`}
              className="mt-6 w-full"
            >
              <CalendarCheck className="size-4" />
              Запазете час
            </ButtonLink>
          </aside>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
