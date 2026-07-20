import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/za-men",
    "/uslugi",
    "/prevalutirane-na-kapitala",
    "/konsultatsiya",
    "/kalkulatori",
    "/kalkulatori/notarialni-taksi",
    "/kalkulatori/sadebni-taksi",
    "/kalkulatori/advokatski-vaznagrazhdeniya",
    "/zapazi-chas",
    "/kontakti",
    "/politika-za-poveritelnost",
    "/obshti-usloviya",
  ];

  return staticRoutes.map((route) => ({
    url: `${site.domain}${route}`,
    lastModified: new Date(),
    priority: route === "" ? 1 : 0.7,
  }));
}
