import { CalendarCheck, Check } from "lucide-react";
import { site } from "@/content/site";
import { bookingTopics } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BookingForm } from "@/components/forms/BookingForm";

const highlights = [
  "Личен ангажимент по всеки казус",
  "Лична консултация в кантора или онлайн",
  "Ясни условия и предвидими разходи",
  "Отговор в рамките на един работен ден",
  "Гарантирана конфиденциалност и правна отговорност",
];

export function Hero() {
  return (
    <section className="border-b border-line bg-cream">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-chestnut">
            {site.tagline}
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-espresso sm:text-5xl">
            Сигурна защита на вашите права и интереси
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-clay">
            Правни консултации, сделки с недвижими имоти, търговско право и
            процесуално представителство - с внимание към детайла и личен
            подход към всеки клиент.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/zapazi-chas" size="lg">
              <CalendarCheck className="size-5" />
              Запазете час
            </ButtonLink>
            <ButtonLink href="/uslugi" variant="outline" size="lg">
              Разгледайте услугите
            </ButtonLink>
          </div>

          <ul className="mt-9 space-y-2.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-ink">
                <span className="flex size-5 items-center justify-center rounded-full bg-coffee/10 text-coffee">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:-translate-y-4">
          <BookingForm
            topics={bookingTopics()}
            title="Запазете час за консултация"
            compact
          />
        </div>
      </Container>
    </section>
  );
}
