import type { Metadata } from "next";
import { CalendarCheck, MessageSquare, Phone, PhoneCall } from "lucide-react";
import { bookingTopics } from "@/content/services";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/forms/BookingForm";

export const metadata: Metadata = {
  title: "Запазете час за консултация",
  description:
    "Запазете час за правна консултация - в кантората, по телефон или онлайн. Отговор в рамките на един работен ден.",
};

const steps = [
  {
    icon: MessageSquare,
    title: "Изпращате запитване",
    text: "Попълвате формата с кратко описание на казуса и удобно за вас време.",
  },
  {
    icon: PhoneCall,
    title: "Потвърждаваме часа",
    text: "Свързваме се с вас за уточняване на деня, часа и формата на срещата.",
  },
  {
    icon: CalendarCheck,
    title: "Провеждаме консултацията",
    text: "В кантората, по телефон или видеовръзка - според вашето предпочитание.",
  },
];

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ tema?: string }>;
}) {
  const { tema } = await searchParams;
  const topics = bookingTopics();
  const defaultTopic = tema && topics.includes(tema) ? tema : undefined;

  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Запазване на час"
            title="Запазете час за консултация"
            lead="Опишете накратко казуса си и посочете удобно време - ще получите потвърждение в рамките на един работен ден."
          />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.3fr_0.7fr]">
          <BookingForm topics={topics} defaultTopic={defaultTopic} />

          <aside className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-semibold text-espresso">
                Как протича записването
              </h2>
              <ol className="mt-5 space-y-5">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tan/30 text-chestnut">
                      <step.icon className="size-5" strokeWidth={1.9} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-espresso">
                        {i + 1}. {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-clay">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-line bg-parchment p-6">
              <p className="font-display text-base font-semibold text-espresso">
                Спешен случай?
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-clay">
                При неотложни въпроси (срокове, връчени книжа, насрочени
                заседания) се обадете директно:
              </p>
              <a
                href={`tel:${site.phone}`}
                className="mt-3 inline-flex items-center gap-2 font-medium text-coffee transition-colors hover:text-espresso"
              >
                <Phone className="size-4" />
                {site.phoneDisplay}
              </a>
              <p className="mt-3 text-xs text-clay">{site.hours}</p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
