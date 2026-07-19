import type { Metadata } from "next";
import {
  Award,
  CalendarCheck,
  Check,
  FileText,
  MessageSquare,
  Phone,
  ShieldCheck,
  Stamp,
  Users,
} from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Превалутиране на капитала на дружеството в евро",
  description:
    "Правно съдействие при превалутиране на капитала на търговски дружества в евро - документи, решение и вписване в Търговския регистър.",
};

const reasons = [
  "Законово задължение за всички дружества с капитал, вписан в левове",
  "Просрочването пречи на бъдещи вписвания и промени по партидата на дружеството",
  "Изисква коректно изчисляване и закръгляне на новия размер на капитала по официалния курс",
  "Навременната подготовка на документите означава по-бързо и безпроблемно вписване",
];

const includes = [
  "Изготвяне на решение за превалутиране на капитала",
  "Изчисляване на новия размер на капитала по официалния курс лев/евро",
  "Актуализация на дружествения договор / учредителния акт",
  "Подготовка и подаване на заявление до Търговския регистър",
  "Комуникация и отстраняване на евентуални забележки от регистъра",
  "Консултация по всички съпътстващи въпроси около промяната",
];

const steps = [
  {
    icon: MessageSquare,
    title: "Кратка консултация",
    text: "Изпращате данните на дружеството - ще прецените заедно какво точно е нужно за вашия случай.",
  },
  {
    icon: FileText,
    title: "Подготовка на документите",
    text: "Изготвяме решението за превалутиране и актуализираните учредителни документи.",
  },
  {
    icon: Stamp,
    title: "Вписване в Търговския регистър",
    text: "Подаваме заявлението и следим вписването до успешния му край.",
  },
];

const trust = [
  { icon: Award, text: "Над 25 години юридическа практика" },
  { icon: Users, text: "Член на Адвокатска колегия - Монтана от 1999 г." },
  { icon: ShieldCheck, text: "Обслужени десетки търговски дружества" },
];

const faq = [
  {
    q: "Кои дружества трябва да превалутират капитала си?",
    a: "Всички търговски дружества, чийто капитал е вписан в левове в Търговския регистър, трябва да приведат размера му в евро и да отразят промяната по партидата си.",
  },
  {
    q: "Какъв е срокът за превалутиране?",
    a: "Срокът е определен в Закона за въвеждането на еврото в Република България. За да сте сигурни, че сте в срок за вашето конкретно дружество, свържете се с нас за кратка ориентировъчна консултация.",
  },
  {
    q: "Трябва ли да сменям целия дружествен договор?",
    a: "Обикновено не - актуализират се само клаузите, засегнати от промяната на капитала. Ще прегледаме конкретния ви учредителен акт и ще предложим най-простото решение.",
  },
];

export default function PrevalutiraneNaKapitalaPage() {
  return (
    <>
      <section className="border-b border-line bg-espresso">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tan">
            Важно за търговски дружества
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-cream sm:text-5xl">
            Превалутиране на капитала на дружеството в евро
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-cream/85">
            С въвеждането на еврото всяко търговско дружество с капитал,
            вписан в левове, трябва да приведе размера му в евро и да отрази
            промяната в Търговския регистър. Осигурете си съдействие от
            адвокат с дългогодишен опит в търговското право - бързо, коректно
            и без излишни главоболия.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={`/zapazi-chas?tema=${encodeURIComponent("Търговско право")}`}
              variant="light"
              size="lg"
            >
              <CalendarCheck className="size-5" />
              Запазете консултация
            </ButtonLink>
            <ButtonLink href={`tel:${site.phone}`} variant="ghost-light" size="lg">
              <Phone className="size-5" />
              {site.phoneDisplay}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Защо трябва да действате"
            title="Не оставяйте промяната за последния момент"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <li
                key={reason}
                className="flex items-start gap-3 rounded-xl border border-line bg-parchment p-5 text-sm leading-relaxed text-ink"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-coffee/10 text-coffee">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-line bg-parchment">
        <Container className="py-14 sm:py-16">
          <SectionHeading eyebrow="Услугата" title="Какво включва съдействието" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-coffee/10 text-coffee">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="py-14 sm:py-16">
          <SectionHeading eyebrow="Процес" title="Как протича превалутирането" />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title}>
                <span className="flex size-11 items-center justify-center rounded-xl bg-coffee text-cream">
                  <step.icon className="size-5" strokeWidth={1.9} />
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-espresso">
                  {i + 1}. {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-clay">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-parchment">
        <Container className="py-10 sm:py-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {trust.map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tan/30 text-chestnut">
                  <item.icon className="size-5" strokeWidth={1.9} />
                </span>
                <p className="text-sm font-medium text-espresso">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-14 sm:py-16">
          <SectionHeading eyebrow="Въпроси" title="Често задавани въпроси" />
          <div className="mt-8 max-w-3xl space-y-6">
            {faq.map((item) => (
              <div key={item.q} className="border-b border-line pb-6">
                <p className="font-display text-lg font-semibold text-espresso">
                  {item.q}
                </p>
                <p className="mt-2 leading-relaxed text-clay">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-coffee">
        <Container className="flex flex-col items-start justify-between gap-8 py-14 sm:py-16 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Да приведем капитала на дружеството ви в евро?
            </h2>
            <p className="mt-3 leading-relaxed text-cream/85">
              Запазете кратка консултация - ще прецените заедно точния обем
              работа и следващите стъпки за вашето дружество.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href={`/zapazi-chas?tema=${encodeURIComponent("Търговско право")}`}
              variant="light"
              size="lg"
            >
              <CalendarCheck className="size-5" />
              Запазете консултация
            </ButtonLink>
            <ButtonLink href={`tel:${site.phone}`} variant="ghost-light" size="lg">
              <Phone className="size-5" />
              {site.phoneDisplay}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
