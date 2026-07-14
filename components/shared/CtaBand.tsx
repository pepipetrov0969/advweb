import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function CtaBand({
  title = "Имате правен въпрос?",
  text = "Опишете накратко казуса си и ще получите отговор с възможните следващи стъпки - обикновено в рамките на един работен ден.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-coffee">
      <Container className="flex flex-col items-start justify-between gap-8 py-14 sm:py-16 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 leading-relaxed text-cream/85">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/zapazi-chas" variant="light" size="lg">
            <CalendarCheck className="size-5" />
            Запазете час
          </ButtonLink>
          <ButtonLink
            href={`tel:${site.phone}`}
            variant="ghost-light"
            size="lg"
          >
            <Phone className="size-5" />
            {site.phoneDisplay}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
