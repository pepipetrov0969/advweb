import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getPracticeArea, practiceAreas } from "@/content/practice-areas";
import { practiceAreaIcons } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/shared/CtaBand";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return {};
  return { title: area.title, description: area.excerpt };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  const Icon = practiceAreaIcons[area.icon];
  const others = practiceAreas.filter((a) => a.slug !== area.slug).slice(0, 5);

  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="py-14 sm:py-16">
          <Link
            href="/oblasti-na-deynost"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-coffee transition-colors hover:text-espresso"
          >
            <ArrowLeft className="size-4" />
            Всички области
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-coffee text-cream">
              <Icon className="size-7" strokeWidth={1.8} />
            </span>
            <h1 className="font-display text-3xl font-semibold text-espresso sm:text-4xl">
              {area.title}
            </h1>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <div className="space-y-4 leading-relaxed text-ink">
              {area.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-8 font-display text-xl font-semibold text-espresso">
              Типични казуси
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {area.matters.map((matter) => (
                <li key={matter} className="flex items-start gap-2.5 text-sm text-ink">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-coffee/10 text-coffee">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {matter}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-parchment p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-chestnut">
              Други области
            </p>
            <ul className="mt-4 space-y-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/oblasti-na-deynost/${other.slug}`}
                    className="group flex items-center justify-between gap-2 text-sm font-medium text-ink transition-colors hover:text-coffee"
                  >
                    {other.title}
                    <ArrowRight className="size-4 shrink-0 text-chestnut transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
