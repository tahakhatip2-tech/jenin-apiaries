import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { ShieldCheck, Award, Sprout, Globe2 } from "lucide-react";
import beekeeper from "@/assets/beekeeper.jpg";
import honeycomb from "@/assets/honeycomb.jpg";
import heroAbout from "@/assets/hero-about.png";

import { buildBilingualMeta, buildLinks, jsonLdScript, organizationJsonLd, breadcrumbsJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: buildBilingualMeta({
      path: "/about",
      titleEn: "About Shaqfa — Heritage of Pure Honey from Jordan",
      titleAr: "من نحن — إرث شقفا في عالم العسل النقي من الأردن",
      descEn: "Discover the heritage, values and craftsmanship behind Shaqfa Honey Trading & Honey Therapy in Zarqa, Jordan.",
      descAr: "تعرّف على إرث وقيم وحرفية شقفا لتجارة العسل والعلاج بالعسل في الزرقاء، الأردن.",
      image: beekeeper,
    }),
    links: buildLinks("/about"),
    scripts: [
      jsonLdScript(organizationJsonLd()),
      jsonLdScript(breadcrumbsJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ])),
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Shaqfa Honey",
        url: "/about",
      }),
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useI18n();
  const values = [
    { icon: Sprout, title: lang === "ar" ? "أصالة" : "Authenticity", desc: lang === "ar" ? "منتجات طبيعية ١٠٠٪ بلا تنازلات." : "100% natural products with no compromises." },
    { icon: ShieldCheck, title: lang === "ar" ? "ثقة" : "Trust", desc: lang === "ar" ? "شفافية كاملة في المصدر والجودة." : "Full transparency in source and quality." },
    { icon: Award, title: lang === "ar" ? "تميّز" : "Excellence", desc: lang === "ar" ? "معايير عالمية في كل خطوة." : "World-class standards at every step." },
    { icon: Globe2, title: lang === "ar" ? "استدامة" : "Sustainability", desc: lang === "ar" ? "نحمي النحل ونصون البيئة." : "We protect bees and preserve the environment." },
  ];

  return (
    <>
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img src={heroAbout} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.04_60/0.95)] via-[oklch(0.22_0.06_55/0.8)] to-[oklch(0.42_0.12_55/0.4)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center z-10 pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium uppercase tracking-[0.2em] mb-6 shadow-elegant">
            {t("section.about.subtitle")}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white drop-shadow-md">
            {t("section.about.title")}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl mx-auto drop-shadow-sm">
            {t("about.desc")}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src={beekeeper} alt="" loading="lazy" width={1280} height={960} className="rounded-2xl aspect-[3/4] object-cover shadow-elegant" />
            <img src={honeycomb} alt="" loading="lazy" width={1280} height={960} className="rounded-2xl aspect-[3/4] object-cover mt-10 shadow-elegant" />
          </div>
          <div>
            <h2 className="font-display text-4xl font-semibold">{lang === "ar" ? "من المنحل إلى يديك" : "From the apiary to your hands"}</h2>
            <p className="mt-5 text-foreground/80 leading-relaxed">
              {lang === "ar"
                ? "نتعاون مع نحالين متخصصين في مناطق جبلية بكر، حيث تتغذى النحلات على رحيق الأزهار البرية. نحرص على قطف العسل بأساليب تقليدية تحافظ على خصائصه الطبيعية ثم نعبّئه دون تسخين ليصلك بكامل قيمته الغذائية."
                : "We partner with specialist beekeepers in pristine mountain regions where bees forage on wild blossoms. Honey is harvested using traditional methods that preserve its natural properties, then bottled without heating so it reaches you with full nutritional value."}
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              {lang === "ar"
                ? "كل دفعة تخضع لاختبارات مخبرية للأصالة، الرطوبة، الإنزيمات، وغياب البقايا—لأن النقاء عندنا ليس وعدًا، بل التزام موثّق."
                : "Every batch is laboratory-tested for authenticity, moisture, enzymes and residues — because for us, purity is not a promise but a documented commitment."}
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-gradient-soft">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-2xl p-7 border border-border hover:shadow-elegant transition">
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold mb-5">
                <v.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
