// Bilingual SEO helpers for Shaqfa Honey Trading & Honey Therapy
// Business based in Zarqa, Jordan.

export const SITE = {
  nameEn: "Jenin Apiaries",
  nameAr: "مناحل جنين",
  taglineEn: "Nature's Healing, Pure Excellence",
  taglineAr: "شفاء الطبيعة، نقاء الامتياز",
  phone: "+962785873669",
  email: "info@shaqfa-honey.com",
  streetAr: "اشارات المشيرفة، الزرقاء، الأردن",
  streetEn: "Al-Musheirfah Traffic Lights, Zarqa, Jordan",
  city: "Zarqa",
  region: "Zarqa Governorate",
  country: "JO",
};

type MetaTag = Record<string, string>;

export interface BilingualSeo {
  path: string; // e.g. "/about"
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image?: string; // absolute or root-relative
  type?: "website" | "article" | "product";
}

export function buildBilingualMeta(s: BilingualSeo): MetaTag[] {
  const title = `${s.titleAr} | ${s.titleEn}`;
  const description = `${s.descAr} — ${s.descEn}`;
  const meta: MetaTag[] = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: "عسل, عسل خام, العلاج بالعسل, الأردن, الزرقاء, غذاء ملكات, عكبر, حبوب لقاح, honey, raw honey, apitherapy, royal jelly, propolis, bee pollen, Jordan, Zarqa" },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: "og:type", content: s.type ?? "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: s.path },
    { property: "og:site_name", content: `${SITE.nameAr} — ${SITE.nameEn}` },
    { property: "og:locale", content: "ar_JO" },
    { property: "og:locale:alternate", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (s.image) {
    meta.push({ property: "og:image", content: s.image });
    meta.push({ name: "twitter:image", content: s.image });
  }
  return meta;
}

export function buildLinks(path: string) {
  return [
    { rel: "canonical", href: path },
    { rel: "alternate", hreflang: "ar", href: path },
    { rel: "alternate", hreflang: "en", href: path },
    { rel: "alternate", hreflang: "x-default", href: path },
  ];
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Store"],
    name: SITE.nameEn,
    alternateName: SITE.nameAr,
    slogan: SITE.taglineEn,
    url: "/",
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetEn,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    areaServed: ["JO", "SA", "AE", "KW", "QA", "BH", "OM"],
    description:
      "Premium honey trading and certified honey therapy (apitherapy) based in Zarqa, Jordan. Raw honey, royal jelly, propolis and bee pollen.",
  };
}

export function breadcrumbsJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path,
    })),
  };
}

export function jsonLdScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}
