import Link from "next/link";
import { Scale } from "lucide-react";
import { site } from "@/content/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Към началната страница">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-coffee text-cream">
        <Scale className="size-6" strokeWidth={1.8} />
      </span>
      <span className="leading-tight">
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-chestnut">
          Адвокат
        </span>
        <span className="block font-display text-base font-semibold text-espresso sm:text-lg">
          {site.fullName.replace(" Иванова", "")}
        </span>
      </span>
    </Link>
  );
}
