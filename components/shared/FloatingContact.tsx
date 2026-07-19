import { Phone } from "lucide-react";
import { FaViber, FaWhatsapp } from "react-icons/fa6";
import { site } from "@/content/site";

export function FloatingContact() {
  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col gap-3 sm:bottom-5">
      <a
        href={`tel:${site.phone}`}
        aria-label="Обадете се"
        title="Обадете се"
        className="flex size-13 items-center justify-center rounded-full bg-coffee text-white shadow-lg transition-transform hover:scale-105"
      >
        <Phone className="size-6" />
      </a>
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Пишете ни в WhatsApp"
        title="WhatsApp"
        className="flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <FaWhatsapp className="size-6" />
      </a>
      <a
        href={site.viberUrl}
        aria-label="Пишете ни във Viber"
        title="Viber"
        className="flex size-13 items-center justify-center rounded-full bg-[#7360F2] text-white shadow-lg transition-transform hover:scale-105"
      >
        <FaViber className="size-6" />
      </a>
    </div>
  );
}
