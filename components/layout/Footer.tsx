import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Scale } from "lucide-react";
import { nav, site } from "@/content/site";
import { practiceAreas } from "@/content/practice-areas";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-espresso text-cream/85">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-cream/10 text-cream">
              <Scale className="size-5" strokeWidth={1.8} />
            </span>
            <div className="leading-tight">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-tan">
                Адвокат
              </p>
              <p className="font-display text-base font-semibold text-cream">
                {site.fullName.replace(" Иванова", "")}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Правни консултации и процесуално представителство с личен ангажимент
            към всеки клиент.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-tan">
            Навигация
          </p>
          <ul className="space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-tan">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/zapazi-chas" className="transition-colors hover:text-tan">
                Запази час
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-tan">
            Области на дейност
          </p>
          <ul className="space-y-2.5 text-sm">
            {practiceAreas.slice(0, 6).map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/oblasti-na-deynost/${area.slug}`}
                  className="transition-colors hover:text-tan"
                >
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-tan">
            Контакти
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-tan" />
              <span>
                {site.address.city}, {site.address.line}
              </span>
            </li>
            <li>
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-2.5 transition-colors hover:text-tan"
              >
                <Phone className="size-4 shrink-0 text-tan" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-tan"
              >
                <Mail className="size-4 shrink-0 text-tan" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-tan" />
              {site.hours}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Всички права запазени.
          </p>
          <div className="flex gap-5">
            <Link
              href="/politika-za-poveritelnost"
              className="transition-colors hover:text-tan"
            >
              Политика за поверителност
            </Link>
            <Link href="/obshti-usloviya" className="transition-colors hover:text-tan">
              Общи условия
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
