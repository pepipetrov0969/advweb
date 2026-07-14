import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-cream">
      <Container className="flex flex-col items-center py-24 text-center sm:py-32">
        <p className="font-display text-7xl font-semibold text-chestnut">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-espresso">
          Страницата не е намерена
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-clay">
          Страницата, която търсите, не съществува или е преместена. Проверете
          адреса или се върнете към началната страница.
        </p>
        <ButtonLink href="/" className="mt-8">
          <ArrowLeft className="size-4" />
          Към началото
        </ButtonLink>
      </Container>
    </section>
  );
}
