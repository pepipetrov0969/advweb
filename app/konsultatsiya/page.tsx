import type { Metadata } from "next";
import {
  AlertTriangle,
  Calendar,
  CalendarCheck,
  Clock,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Video,
} from "lucide-react";
import { site } from "@/content/site";
import { fmtMoney } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/shared/CtaBand";

export const metadata: Metadata = {
  title: "Консултация",
  description:
    "Правна консултация с адв. Красимира Атанасова - в кантората в Монтана, скоро и в София, или онлайн чрез видеовръзка, Viber или WhatsApp.",
};

const where = [
  {
    icon: MapPin,
    title: "В кантората в Монтана",
    text: "Удобно място в центъра на града, в комфортна и дискретна обстановка.",
  },
  {
    icon: MapPin,
    title: "Скоро и в София",
    text: "Разширяваме присъствието си, за да сме по-близо до повече клиенти.",
  },
  {
    icon: Video,
    title: "Онлайн",
    text: "Чрез видеовръзка или телефонно обаждане във Viber или WhatsApp - удобно за ангажирани клиенти.",
  },
];

const whyReasons = [
  "Липсата на професионална консултация често усложнява правните проблеми и води до финансови загуби",
  "Правният свят се определя от множество срокове - пропускането на един от тях може да доведе до необратими последици",
  "Неглижирането на правното ви положение ви поставя в риск, който не си струва да поемате",
  "Навременната консултация ви дава ясна стратегия и надеждна защита на интересите ви",
];

const bookingSteps = [
  {
    icon: MessageSquare,
    title: "Свържете се с мен",
    text: "По телефон или чрез сайта ми.",
  },
  {
    icon: Calendar,
    title: "Посочете дата и час",
    text: "Изберете удобни за вас дата и час за консултация.",
  },
  {
    icon: FileText,
    title: "Изпратете документите",
    text: "Изпратете предварително документите, свързани със случая ви.",
  },
  {
    icon: CalendarCheck,
    title: "Получете потвърждение",
    text: "Получавате потвърждение и напомняне за срещата.",
  },
];

export default function KonsultatsiyaPage() {
  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-chestnut">
            Консултация
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-espresso sm:text-5xl">
            Навременна консултация с адвокат
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-clay">
            Навременната консултация с адвокат и предприемането на адекватни
            правни мерки могат да бъдат решаващ фактор за успешното
            разрешаване на вашите правни въпроси, както и да ви спестят редица
            главоболия и да ви предпазят от излишни рискове, които в някои
            случаи могат да се окажат фатални.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/zapazi-chas" size="lg">
              <CalendarCheck className="size-5" />
              Запазете консултация
            </ButtonLink>
            <ButtonLink href={`tel:${site.phone}`} variant="outline" size="lg">
              <Phone className="size-5" />
              {site.phoneDisplay}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-espresso">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tan">
                Цена
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-cream">
                {fmtMoney(69, "EUR")}
              </p>
              <p className="mt-2 text-sm text-cream/70">
                Продължителност - около 1 час
              </p>
              <p className="mt-6 text-sm leading-relaxed text-cream/85">
                Цената покрива първоначален анализ на вашата правна ситуация,
                преглед на документи, конкретни правни съвети и изготвяне на
                план за по-нататъшни действия. Гарантирам прозрачност и
                яснота в ценообразуването - без скрити такси и неочаквани
                разходи.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-cream/85">
                Ако казусът ви позволява завеждане на дело и процесуално
                представителство, ще получите оферта за правна защита и
                съдействие - цената за тази услуга винаги е окончателна.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-6">
                <p className="font-display text-base font-semibold text-cream">
                  Плащане за онлайн консултация
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream/80">
                  Онлайн консултациите се заплащат предварително. Избраният
                  от вас час се запазва за срок от 24 часа след получаване на
                  инструкциите за плащане. След заплащане получавате
                  потвърждение за уговорените ден и час.
                </p>
              </div>

              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-6">
                <div className="flex items-center gap-2.5">
                  <FileText className="size-4.5 shrink-0 text-tan" />
                  <p className="font-display text-base font-semibold text-cream">
                    Писмено становище
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-cream/80">
                  При необходимост мога да изготвя писмена консултация или
                  правно становище по случая ви. Услугата се заплаща
                  допълнително, след запознаване с фактическата и правната
                  сложност на казуса.
                </p>
              </div>

              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-6">
                <div className="flex items-center gap-2.5">
                  <Mail className="size-4.5 shrink-0 text-tan" />
                  <p className="font-display text-base font-semibold text-cream">
                    Консултации по имейл
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-cream/80">
                  Извършват се след предварително плащане и се основават
                  единствено на посочените от клиента факти. Този вариант
                  крие рискове - възможно е да бъде пропусната важна
                  информация от решаващо значение. Затова препоръчвам винаги
                  консултация на място или онлайн чрез видеовръзка.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="py-14 sm:py-16">
          <SectionHeading eyebrow="Формат" title="Къде и как се провежда" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {where.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line bg-parchment p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-coffee text-cream">
                  <item.icon className="size-5" strokeWidth={1.9} />
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-espresso">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-clay">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-clay">
            И двата вида консултации - на място и онлайн - са съобразени с
            индивидуалните нужди и конкретния казус на всеки клиент. Целта ми
            е да гарантирам, че правата и законните ви интереси са напълно
            защитени, затова осигурявам лесен и удобен начин за запазване на
            час - по телефона, по имейл или чрез формата на сайта.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-parchment">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Процес"
            title="Как протича консултацията"
            lead="Консултацията протича в рамките на около един час."
          />
          <div className="mt-8 max-w-3xl space-y-4 leading-relaxed text-ink">
            <p>
              През това време се разглеждат и обсъждат документите, относими
              към конкретния казус. Коментират се приложимите законови
              разпоредби и съдебната практика, която може да има отношение
              към вашия случай, както и силните и слабите страни на
              защитната теза и дължимото от вас процесуално поведение.
            </p>
            <p>
              По време на консултацията ще изградите ясна представа за
              правното положение, в което се намирате, както и за възможните
              начини за разрешаване на възникналата ситуация, следвайки
              предоставените ви насоки.
            </p>
            <p>
              Консултацията може да се проведе и в присъствието на други
              лица, ангажирани по случая, като задаването на въпроси е
              свободно - за мен е важно да разберете същността на проблема и
              точната юридическа конструкция на ситуацията.
            </p>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-white p-6 sm:max-w-xl">
            <Clock className="mt-0.5 size-5 shrink-0 text-chestnut" />
            <p className="text-sm leading-relaxed text-ink">
              Консултациите се провеждат в работно време - от{" "}
              <strong>09:00 до 17:00 часа</strong>, след предварителна
              уговорка по телефон, имейл или чрез формата за запитване.
              Срещи извън посочения диапазон се провеждат само след
              предварителна уговорка и изрично потвърждение.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Защо е важно"
            title="Защо да потърсите консултация навреме"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {whyReasons.map((reason) => (
              <li
                key={reason}
                className="flex items-start gap-3 rounded-xl border border-line bg-parchment p-5 text-sm leading-relaxed text-ink"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-coffee/10 text-coffee">
                  <AlertTriangle className="size-3.5" strokeWidth={2.5} />
                </span>
                {reason}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-clay">
            Консултацията включва подробен анализ на вашия случай, преглед на
            документите и изготвяне на конкретен план за действие.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-parchment">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Избор"
            title="Консултация онлайн или на място?"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-7">
              <span className="flex size-11 items-center justify-center rounded-xl bg-tan/30 text-chestnut">
                <Video className="size-5" strokeWidth={1.9} />
              </span>
              <p className="mt-4 font-display text-lg font-semibold text-espresso">
                Онлайн консултация
              </p>
              <p className="mt-2 text-sm leading-relaxed text-clay">
                Удобен вариант за хора с натоварено ежедневие - провежда се
                чрез видеовръзка или телефонно обаждане във Viber или
                WhatsApp, без да се налага да пътувате.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-7">
              <span className="flex size-11 items-center justify-center rounded-xl bg-tan/30 text-chestnut">
                <MapPin className="size-5" strokeWidth={1.9} />
              </span>
              <p className="mt-4 font-display text-lg font-semibold text-espresso">
                Консултация на място
              </p>
              <p className="mt-2 text-sm leading-relaxed text-clay">
                Препоръчителна при по-комплексни казуси, изискващи подробно
                разглеждане на документи и детайлно обсъждане.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-clay">
            Препоръчително е винаги да ми изпращате относимите документи
            предварително - така разговорът ще бъде по-целенасочен и
            по-полезен.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="py-14 sm:py-16">
          <SectionHeading eyebrow="Запазване на час" title="Как да запазите час" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {bookingSteps.map((step, i) => (
              <div key={step.title}>
                <span className="flex size-11 items-center justify-center rounded-xl bg-coffee text-cream">
                  <step.icon className="size-5" strokeWidth={1.9} />
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-espresso">
                  {i + 1}. {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-clay">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Готови ли сте да запазите своята консултация?"
        text="Обадете се на посочените контакти или попълнете формата за запитване - ще получите потвърждение в рамките на един работен ден."
      />
    </>
  );
}
