"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Clock, Mail, Menu, Phone, X } from "lucide-react";
import { FaViber, FaWhatsapp } from "react-icons/fa6";
import { nav, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Горна лента с контакти */}
      <div className="bg-espresso text-cream">
        <Container className="relative flex h-11 items-center justify-end text-xs">
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-6 text-sm font-medium">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-tan"
            >
              <Phone className="size-4" />
              <span>{site.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-tan sm:flex"
            >
              <Mail className="size-4" />
              <span>{site.email}</span>
            </a>
            <span className="flex items-center gap-3">
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Пишете ни в WhatsApp"
                title="WhatsApp"
                className="transition-colors hover:text-tan"
              >
                <FaWhatsapp className="size-4" />
              </a>
              <a
                href={site.viberUrl}
                aria-label="Пишете ни във Viber"
                title="Viber"
                className="transition-colors hover:text-tan"
              >
                <FaViber className="size-4" />
              </a>
            </span>
          </div>
          <p className="hidden items-center gap-1.5 text-cream/80 md:flex">
            <Clock className="size-3.5" />
            <span>{site.hours}</span>
          </p>
        </Container>
      </div>

      {/* Основна навигация */}
      <div className="border-b border-line bg-white/95 backdrop-blur">
        <Container className="flex h-18 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Основна навигация" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap text-sm font-medium transition-colors hover:text-coffee",
                  isActive(item.href) ? "text-coffee" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ButtonLink href="/zapazi-chas">
                <CalendarCheck className="size-4" />
                Запази час
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Затвори менюто" : "Отвори менюто"}
              className="flex size-10 items-center justify-center rounded-lg border border-line text-espresso lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>

        {/* Мобилно меню */}
        {open ? (
          <div className="border-t border-line bg-white lg:hidden">
            <Container className="flex flex-col gap-1 py-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === "/" ? "bg-tan/30 text-chestnut" : "text-ink hover:bg-cream/60",
                )}
              >
                Начало
              </Link>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium",
                    isActive(item.href) ? "bg-tan/30 text-chestnut" : "text-ink hover:bg-cream/60",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <ButtonLink href="/zapazi-chas" className="mt-2">
                <CalendarCheck className="size-4" />
                Запази час
              </ButtonLink>
            </Container>
          </div>
        ) : null}
      </div>
    </header>
  );
}
