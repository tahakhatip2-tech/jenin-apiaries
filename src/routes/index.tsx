import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Leaf, FlaskConical, HeartPulse, Sparkles, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import heroHoney from "@/assets/hero-honey.jpg";
import honeycomb from "@/assets/honeycomb.jpg";
import therapyImg from "@/assets/therapy.jpg";
import beekeeper from "@/assets/beekeeper.jpg";
import productRaw from "@/assets/product-raw.jpg";
import productRoyal from "@/assets/product-royal.jpg";
import productPropolis from "@/assets/product-propolis.jpg";
import productPollen from "@/assets/product-pollen.jpg";
import heroAbout from "@/assets/hero-about.png";

import { buildBilingualMeta, buildLinks, jsonLdScript, organizationJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildBilingualMeta({
      path: "/",
      titleEn: "Shaqfa Honey Trading & Honey Therapy — Zarqa, Jordan",
      titleAr: "شقفا لتجارة العسل والعلاج بالعسل — الزرقاء، الأردن",
      descEn: "Premium raw honey, organic bee products and certified honey therapy from Zarqa, Jordan. Authentic healing rooted in tradition and science.",
      descAr: "عسل خام فاخر ومنتجات نحل عضوية وجلسات علاج بالعسل معتمدة من الزرقاء، الأردن. شفاء أصيل يجمع بين التراث والعلم.",
      image: heroHoney,
    }),
    links: buildLinks("/"),
    scripts: [
      jsonLdScript(organizationJsonLd()),
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Shaqfa Honey Trading & Honey Therapy",
        url: "/",
        inLanguage: ["ar", "en"],
      }),
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, lang, dir } = useI18n();

  const features = [
    { icon: Sparkles, key: "pure" },
    { icon: Leaf, key: "organic" },
    { icon: FlaskConical, key: "tested" },
    { icon: HeartPulse, key: "therapy" },
  ];

  const products = [
    { img: productRaw, key: "raw" },
    { img: productRoyal, key: "royal" },
    { img: productPropolis, key: "propolis" },
    { img: productPollen, key: "pollen" },
  ];

  const stats = [
    { value: "25+", key: "years" },
    { value: "40+", key: "products" },
    { value: "12", key: "countries" },
    { value: "10K+", key: "clients" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img src={heroHoney} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.18_0.04_60/0.85)] via-[oklch(0.22_0.06_55/0.7)] to-[oklch(0.42_0.12_55/0.55)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium uppercase tracking-[0.25em] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.78_0.17_78)] animate-pulse" />
              {t("hero.eyebrow")}
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mb-10">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              {/* Primary CTA — solid gold */}
              <a
                href="/products"
                className="inline-flex items-center gap-2.5 h-14 px-8 rounded-xl text-base font-semibold bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 shadow-[0_4px_24px_rgba(245,158,11,0.55)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {t("cta.shop")}
                <ArrowRight className={`w-5 h-5 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </a>
              {/* Secondary CTA — solid white */}
              <a
                href="/therapy"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl text-base font-semibold bg-white text-gray-900 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:bg-amber-50 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {t("cta.book")}
              </a>
            </div>
          </div>
        </div>

        {/* stats overlay */}
        <div className="absolute bottom-0 inset-x-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-background/95 backdrop-blur-xl border border-border rounded-t-2xl shadow-elegant grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border rtl:divide-x-reverse">
              {stats.map((s) => (
                <div key={s.key} className="px-6 py-6 text-center">
                  <div className="font-display text-3xl md:text-4xl font-semibold text-gradient-gold">{s.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1 uppercase tracking-wider">{t(`stats.${s.key}`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY INFO */}
      <Section>
        <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-elegant">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-10 md:p-14 lg:p-20 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-xs font-semibold uppercase tracking-[0.2em] text-amber-deep mb-6 w-max">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-gold" />
                {lang === "ar" ? "تعرف علينا" : "Get to know us"}
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-4">
                {t("company.title")}
              </h2>
              <h3 className="text-xl text-amber-600 font-medium mb-6">
                {t("company.subtitle")}
              </h3>
              <p className="text-foreground/80 leading-relaxed text-lg mb-8">
                {t("company.desc")}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="border-t border-border pt-4">
                  <div className="text-amber-deep font-bold text-lg mb-1">{lang === "ar" ? "إنتاج وتصدير" : "Produce & Export"}</div>
                  <div className="text-sm text-muted-foreground">{lang === "ar" ? "بأعلى معايير الجودة العالمية" : "Highest global standards"}</div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="text-amber-deep font-bold text-lg mb-1">{lang === "ar" ? "جملة ومفرق" : "Wholesale & Retail"}</div>
                  <div className="text-sm text-muted-foreground">{lang === "ar" ? "نلبي كافة احتياجاتكم" : "Meeting all your needs"}</div>
                </div>
              </div>
            </div>
            <div className="relative min-h-[400px] lg:min-h-full">
              <img src={heroAbout} alt="Jenin Apiaries Company" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </Section>

      {/* FEATURES */}
      <Section className="bg-gradient-soft">
        <SectionHeader eyebrow={lang === "ar" ? "تميّزنا" : "Our Excellence"} title={t("section.features.title")} subtitle={t("section.features.subtitle")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.key} className="group bg-card rounded-2xl p-7 border border-border hover:shadow-elegant transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold mb-5 group-hover:scale-110 transition">
                <f.icon className="w-7 h-7 text-primary-foreground" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{t(`feature.${f.key}.title`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`feature.${f.key}.desc`)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-xs font-semibold uppercase tracking-[0.2em] text-amber-deep mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-gold" />
              {lang === "ar" ? "تشكيلتنا" : "Collection"}
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold">{t("section.products.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("section.products.subtitle")}</p>
          </div>
          <Button asChild variant="ghost" className="text-amber-deep hover:text-foreground">
            <Link to="/products">{t("cta.learn")} <ArrowRight className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`} /></Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.key} className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all">
              <div className="aspect-square overflow-hidden bg-gradient-soft">
                <img src={p.img} alt={t(`product.${p.key}.title`)} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground">{t(`product.${p.key}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`product.${p.key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* THERAPY */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 honeycomb-pattern opacity-50 pointer-events-none" />
        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-gold rounded-3xl blur-2xl opacity-20" />
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <img src={therapyImg} alt={t("section.therapy.title")} loading="lazy" width={1280} height={960} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 ltr:-right-6 rtl:-left-6 bg-card border border-border rounded-2xl p-5 shadow-elegant max-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  <HeartPulse className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold text-foreground">98%</div>
                  <div className="text-xs text-muted-foreground">{lang === "ar" ? "رضا العملاء" : "Satisfaction"}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-xs font-semibold uppercase tracking-[0.2em] text-amber-deep mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-gold" />
              {lang === "ar" ? "أبيثيرابي" : "Apitherapy"}
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">{t("section.therapy.title")}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t("section.therapy.subtitle")}</p>
            <p className="mt-6 text-foreground/80 leading-relaxed">{t("therapy.desc")}</p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{t(`therapy.point${i}`)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold border-0">
                <Link to="/therapy">{t("cta.book")} <ArrowRight className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`} /></Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ABOUT TEASER */}
      <Section className="bg-gradient-soft">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-xs font-semibold uppercase tracking-[0.2em] text-amber-deep mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              {lang === "ar" ? "إرثنا" : "Our Heritage"}
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">{t("section.about.title")}</h2>
            <p className="mt-6 text-foreground/80 leading-relaxed text-lg">{t("about.desc")}</p>
            <Button asChild size="lg" variant="outline" className="mt-8 border-amber-deep/30 hover:bg-accent">
              <Link to="/about">{t("cta.learn")}</Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-elegant">
              <img src={beekeeper} alt="" loading="lazy" width={1280} height={960} className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] mt-12 shadow-elegant">
              <img src={honeycomb} alt="" loading="lazy" width={1280} height={960} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative rounded-3xl overflow-hidden bg-gradient-gold p-10 md:p-16 text-center shadow-gold">
          <div className="absolute inset-0 honeycomb-pattern opacity-30" />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary-foreground leading-tight">{t("section.cta.title")}</h2>
            <p className="mt-4 text-primary-foreground/85 text-lg">{t("section.cta.subtitle")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-[oklch(0.22_0.04_60)] text-white hover:bg-[oklch(0.28_0.05_60)] h-14 px-8">
                <Link to="/contact">{t("cta.contact")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[oklch(0.22_0.04_60)] text-[oklch(0.22_0.04_60)] bg-transparent hover:bg-[oklch(0.22_0.04_60)] hover:text-white h-14 px-8">
                <Link to="/products">{t("cta.shop")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
