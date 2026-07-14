import type { Metadata } from "next";
import Image from "next/image";
import { Award, BookOpen, Handshake, Scale } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/shared/CtaBand";

export const metadata: Metadata = {
  title: "За мен",
  description: `Запознайте се с ${site.name} - образование, опит и принципи на работа.`,
};

const principles = [
  {
    icon: Scale,
    title: "Честна преценка",
    text: "Ще чуете реалистична оценка на казуса - включително когато правни действия не си струват.",
  },
  {
    icon: BookOpen,
    title: "Разбираем език",
    text: "Обяснявам правото на човешки език, за да вземате информирани решения.",
  },
  {
    icon: Handshake,
    title: "Решения преди спорове",
    text: "Когато е възможно, търся споразумение - то е по-бързо и по-евтино от съда.",
  },
  {
    icon: Award,
    title: "Постоянно развитие",
    text: "Следя актуалната съдебна практика и промените в законодателството.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-2xl border-2 border-tan" />
            <Image
              src="/images/portrait-placeholder.svg"
              alt={`Портрет на ${site.name}`}
              width={600}
              height={760}
              priority
              className="relative rounded-2xl border border-line object-cover shadow-lg"
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-chestnut">
              За мен
            </p>
            <h1 className="font-display text-4xl font-semibold text-espresso sm:text-5xl">
              адв. {site.fullName}
            </h1>

            {/* TODO: заменете абзаците по-долу с реалната биография -
                образование, година на вписване, специализации, опит. */}
            <div className="mt-6 space-y-4 leading-relaxed text-clay">
              <p>
                Консултирам граждани и фирми по въпроси на вещното,
                облигационното, семейното и търговското право. Практиката ми е
                фокусирана върху сделки с недвижими имоти, договорни отношения
                и процесуално представителство пред съд.
              </p>
              <p>
                Преди да поема ангажимент, правя внимателна преценка на казуса
                и очертавам възможните пътища - със силните и слабите им
                страни. Клиентите ми знаят във всеки момент на какъв етап е
                тяхната работа и какво предстои.
              </p>
              <p>
                Работя с ясни договорки за възнаграждението, определени още в
                началото, и с уважение към времето и спокойствието на хората,
                които са ми се доверили.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Принципи на работа"
            title="Какво можете да очаквате"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-line bg-parchment p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-coffee text-cream">
                  <p.icon className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-espresso">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-clay">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Да обсъдим вашия казус?"
        text="Първата стъпка е кратка консултация - ще получите ясна преценка и план за действие."
      />
    </>
  );
}
