import Link from "next/link";
import { practiceAreas } from "@/content/practice-areas";
import { practiceAreaIcons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function PracticeAreasGrid({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-4",
        compact
          ? "sm:grid-cols-2 lg:grid-cols-5"
          : "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {practiceAreas.map((area) => {
        const Icon = practiceAreaIcons[area.icon];
        return (
          <Link
            key={area.slug}
            href={`/oblasti-na-deynost/${area.slug}`}
            className={cn(
              "group rounded-xl border border-line bg-white transition-all hover:-translate-y-0.5 hover:border-tan hover:shadow-md",
              compact ? "p-5" : "p-6",
            )}
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-tan/30 text-chestnut transition-colors group-hover:bg-coffee group-hover:text-cream">
              <Icon className="size-5" strokeWidth={1.9} />
            </span>
            <h3
              className={cn(
                "mt-4 font-display font-semibold text-espresso group-hover:text-coffee",
                compact ? "text-[0.95rem] leading-snug" : "text-lg",
              )}
            >
              {area.title}
            </h3>
            {!compact ? (
              <p className="mt-2 text-sm leading-relaxed text-clay">{area.excerpt}</p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
