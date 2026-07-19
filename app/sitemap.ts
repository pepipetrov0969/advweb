import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { practiceAreas } from "@/content/practice-areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/za-men",
    "/uslugi",
    "/oblasti-na-deynost",
    "/kalkulatori",
    "/kalkulatori/notarialni-taksi",
    "/kalkulatori/sadebni-taksi",
    "/kalkulatori/advokatski-vaznagrazhdeniya",
    "/zapazi-chas",
    "/kontakti",
    "/politika-za-poveritelnost",
    "/obshti-usloviya",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.domain}${route}`,
      lastModified: new Date(),
      priority: route === "" ? 1 : 0.7,
    })),
    ...practiceAreas.map((area) => ({
      url: `${site.domain}/oblasti-na-deynost/${area.slug}`,
      lastModified: new Date(),
      priority: 0.6,
    })),
  ];
}
