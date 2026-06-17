import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import productRaw from "@/assets/product-raw.jpg";
import heroProducts from "@/assets/hero-products.png";

import { buildBilingualMeta, buildLinks, jsonLdScript, breadcrumbsJsonLd, SITE } from "@/lib/seo";
import { formatJod, PRODUCTS, type ProductItem } from "@/lib/catalog";

const productJsonLd = (p: ProductItem) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `/products/${p.sku}`,
  sku: p.sku,
  name: p.nameEn,
  alternateName: p.nameAr,
  description: `${p.descEn} — ${p.descAr}`,
  image: [p.image, ...p.gallery],
  category: p.category,
  brand: { "@type": "Brand", name: "Jenin Apiaries" },
  manufacturer: {
    "@type": "Organization",
    name: SITE.nameEn,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
  },
  offers: {
    "@type": "Offer",
    url: `/products/${p.sku}`,
    priceCurrency: "JOD",
    price: p.priceJod.toFixed(2),
    eligibleQuantity: { "@type": "QuantitativeValue", unitText: p.unit },
    availability: `https://schema.org/${p.availability}`,
    itemCondition: "https://schema.org/NewCondition",
    areaServed: ["JO", "SA", "AE", "KW", "QA", "BH", "OM"],
    seller: { "@type": "Organization", name: SITE.nameEn },
  },
});

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: buildBilingualMeta({
      path: "/products",
      titleEn: "Premium Honey & Bee Products — Jenin Apiaries, Jordan",
      titleAr: "منتجات العسل ومنتجات النحل الفاخرة — مناحل جنين، الأردن",
      descEn: "Explore raw honey, royal jelly, propolis and bee pollen sourced from pristine Jordanian apiaries.",
      descAr: "اكتشف العسل الخام وغذاء الملكات والعكبر وحبوب اللقاح من أنقى مناحل الأردن.",
      image: productRaw,
    }),
    links: buildLinks("/products"),
    scripts: [
      jsonLdScript(breadcrumbsJsonLd([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
      ])),
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Jenin Apiaries Products",
        numberOfItems: PRODUCTS.length,
        itemListElement: PRODUCTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `/products/${p.sku}`,
          item: productJsonLd(p),
        })),
      }),
      ...PRODUCTS.map((p) => jsonLdScript(productJsonLd(p))),
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { t, lang, dir } = useI18n();
  return (
    <>
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img src={heroProducts} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.04_60/0.95)] via-[oklch(0.22_0.06_55/0.8)] to-[oklch(0.42_0.12_55/0.4)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center z-10 pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium uppercase tracking-[0.2em] mb-6 shadow-elegant">
            {lang === "ar" ? "تشكيلتنا" : "Our Collection"}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white drop-shadow-md">
            {t("section.products.title")}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl mx-auto drop-shadow-sm">
            {t("section.products.subtitle")}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <Link
              key={p.key}
              to="/products/$sku"
              params={{ sku: p.sku }}
              className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant transition flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-gradient-soft">
                <img
                  src={p.image}
                  alt={lang === "ar" ? p.nameAr : p.nameEn}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-semibold">
                  {lang === "ar" ? p.nameAr : p.nameEn}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                  {lang === "ar" ? p.descAr : p.descEn}
                </p>
                <div className="mt-2 text-xs text-muted-foreground">{p.unit}</div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-semibold text-amber-deep" dir={lang === "ar" ? "rtl" : "ltr"}>
                    {formatJod(p.priceJod, lang)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-foreground">
                    {lang === "ar" ? "التفاصيل" : "Details"}
                    <ArrowRight className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-gradient-soft">
        <SectionHeader
          eyebrow={lang === "ar" ? "تجارة الجملة" : "Wholesale"}
          title={lang === "ar" ? "هل أنت موزّع أو تاجر تجزئة؟" : "Are you a distributor or retailer?"}
          subtitle={lang === "ar" ? "نقدم برامج جملة مخصصة للأسواق العالمية" : "We offer tailored wholesale programs for international markets"}
        />
        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold border-0">
            <Link to="/contact">{t("cta.contact")}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
