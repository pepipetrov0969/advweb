import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sm:hidden">
      <ButtonLink href={`tel:${site.phone}`} variant="outline" className="flex-1">
        <Phone className="size-4" />
        Обадете се
      </ButtonLink>
      <ButtonLink href="/zapazi-chas" className="flex-1">
        <CalendarCheck className="size-4" />
        Запазете час
      </ButtonLink>
    </div>
  );
}
