import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { ArrowRight } from "lucide-react";
import therapyImg from "@/assets/therapy.jpg";
import heroTherapy from "@/assets/hero-therapy.png";

import { buildBilingualMeta, buildLinks, jsonLdScript, breadcrumbsJsonLd } from "@/lib/seo";
import { formatJod, PRODUCTS } from "@/lib/catalog";

const THERAPY_BLENDS = PRODUCTS.filter((p) => p.category === "Therapeutic Blends");

export const Route = createFileRoute("/therapy")({
  head: () => ({
    meta: buildBilingualMeta({
      path: "/therapy",
      titleEn: "Therapeutic Blends — Jenin Apiaries",
      titleAr: "الخلطات العلاجية — مناحل جنين",
      descEn: "Natural therapeutic honey blends for immunity, wound healing, and wellness.",
      descAr: "خلطات علاجية طبيعية بالعسل لتعزيز المناعة، تسريع شفاء الجروح، وتحسين الصحة العامة.",
      image: therapyImg,
    }),
    links: buildLinks("/therapy"),
    scripts: [
      jsonLdScript(breadcrumbsJsonLd([
        { name: "Home", path: "/" },
        { name: "Therapeutic Blends", path: "/therapy" },
      ])),
    ],
  }),
  component: TherapyPage,
});

function TherapyPage() {
  const { t, lang, dir } = useI18n();
  return (
    <>
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img src={heroTherapy} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.04_60/0.95)] via-[oklch(0.22_0.06_55/0.8)] to-[oklch(0.42_0.12_55/0.4)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center z-10 pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium uppercase tracking-[0.2em] mb-6 shadow-elegant">
            {lang === "ar" ? "منتجات علاجية" : "Therapeutic Products"}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight drop-shadow-md">
            {t("section.therapy.title")}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl mx-auto drop-shadow-sm">
            {t("section.therapy.subtitle")}
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-lg text-foreground/80 leading-relaxed">{t("therapy.desc")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {THERAPY_BLENDS.map((p) => (
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
    </>
  );
}
