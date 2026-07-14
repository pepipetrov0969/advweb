import { site } from "@/content/site";
import { practiceAreas } from "@/content/practice-areas";

// Структурирани данни (schema.org) за по-добро локално SEO.
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.name,
    description: site.description,
    url: site.domain,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Монтана",
      addressCountry: "BG",
      streetAddress: site.address.line,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    founder: {
      "@type": "Person",
      name: site.fullName,
      jobTitle: "Адвокат",
    },
    areaServed: "BG",
    knowsAbout: practiceAreas.map((a) => a.title),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
