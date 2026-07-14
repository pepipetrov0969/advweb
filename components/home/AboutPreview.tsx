import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const credentials = [
  "Практика в гражданското, вещното и търговското право",
  "Работа с граждани, фирми и чуждестранни клиенти",
];

export function AboutPreview() {
  return (
    <section className="border-y border-line bg-cream">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
          <div className="absolute -right-4 -top-4 h-full w-full rounded-2xl border-2 border-tan" />
          <Image
            src="/images/portrait-placeholder.svg"
            alt={`Портрет на ${site.name}`}
            width={600}
            height={760}
            className="relative rounded-2xl border border-line object-cover shadow-md"
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-chestnut">
            За мен
          </p>
          <h2 className="font-display text-3xl font-semibold text-espresso sm:text-4xl">
            адв. {site.fullName}
          </h2>
          {/* TODO: заменете с реалната биография */}
          <p className="mt-5 leading-relaxed text-clay">
            Консултирам граждани и фирми по въпроси на вещното, облигационното,
            семейното и търговското право. Практиката ми е фокусирана върху
            сделки с недвижими имоти, договорни отношения и процесуално
            представителство пред съд.
          </p>
          <p className="mt-3 leading-relaxed text-clay">
            Вярвам, че добрата правна защита започва с разбираемо обяснение -
            затова ще получите ясна преценка на казуса, възможните пътища и
            реалистичните очаквания, преди да предприемем каквото и да е.
          </p>

          <ul className="mt-6 space-y-2.5">
            {credentials.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-coffee/10 text-coffee">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <ButtonLink href="/za-men" variant="outline" className="mt-8">
            Научете повече
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
