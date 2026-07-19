import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaViber, FaWhatsapp } from "react-icons/fa6";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Контакти",
  description: `Свържете се с ${site.name} - адрес, телефон, имейл и контактна форма.`,
};

export default function ContactPage() {
  const cards = [
    {
      icon: MapPin,
      title: "Адрес",
      lines: [`${site.address.city}`, site.address.line],
    },
    {
      icon: MapPin,
      title: "Адрес (София)",
      lines: ["гр. София", "Очаквайте скоро"],
    },
    {
      icon: Phone,
      title: "Телефон",
      lines: [site.phoneDisplay],
      href: `tel:${site.phone}`,
    },
    {
      icon: Mail,
      title: "Имейл",
      lines: [site.email],
      href: `mailto:${site.email}`,
    },
    {
      icon: Clock,
      title: "Работно време",
      lines: [site.hours],
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      lines: [site.phoneDisplay],
      href: site.whatsappUrl,
      external: true,
    },
    {
      icon: FaViber,
      title: "Viber",
      lines: [site.phoneDisplay],
      href: site.viberUrl,
    },
  ];

  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Контакти"
            title="Свържете се с кантората"
            lead="Пишете, обадете се или заповядайте на място - след предварително уговорен час."
          />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
              const content = (
                <>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-tan/30 text-chestnut">
                    <card.icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-chestnut">
                    {card.title}
                  </p>
                  {card.lines.map((line) => (
                    <p key={line} className="mt-1 text-sm font-medium text-ink">
                      {line}
                    </p>
                  ))}
                </>
              );
              return card.href ? (
                <a
                  key={card.title}
                  href={card.href}
                  {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="rounded-xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-tan hover:shadow-md"
                >
                  {content}
                </a>
              ) : (
                <div key={card.title} className="rounded-xl border border-line bg-white p-6">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">
                Пишете ни
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-clay">
                Опишете накратко въпроса си - ще получите отговор обикновено в
                рамките на един работен ден.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso">
                Как да ни намерите
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-clay">
                {site.address.city}, {site.address.line}
              </p>
              <iframe
                title="Карта с местоположението на кантората"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-6 h-105 w-full rounded-2xl border border-line"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
