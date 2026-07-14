import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "ghost-light";
type Size = "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-coffee text-white hover:bg-espresso focus-visible:ring-coffee/50 focus-visible:ring-offset-white",
  outline:
    "border border-coffee/40 bg-transparent text-coffee hover:border-coffee hover:bg-coffee/5 focus-visible:ring-coffee/40 focus-visible:ring-offset-white",
  light:
    "bg-white text-espresso hover:bg-cream focus-visible:ring-white/60 focus-visible:ring-offset-coffee",
  "ghost-light":
    "border border-white/40 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/60 focus-visible:ring-offset-coffee",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "submit",
  disabled,
  children,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}
