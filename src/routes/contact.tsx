import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import heroContact from "@/assets/hero-contact.png";

import { buildBilingualMeta, buildLinks, jsonLdScript, organizationJsonLd, breadcrumbsJsonLd, SITE } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: buildBilingualMeta({
      path: "/contact",
      titleEn: "Contact Shaqfa Honey — Zarqa, Jordan",
      titleAr: "تواصل مع شقفا للعسل — الزرقاء، الأردن",
      descEn: "Get in touch with Shaqfa Honey Trading & Honey Therapy in Zarqa, Jordan for products, wholesale or apitherapy bookings.",
      descAr: "تواصل مع شقفا لتجارة العسل والعلاج بالعسل في الزرقاء، الأردن للاستفسار عن المنتجات أو حجز جلسات العلاج بالعسل.",
    }),
    links: buildLinks("/contact"),
    scripts: [
      jsonLdScript(organizationJsonLd()),
      jsonLdScript(breadcrumbsJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ])),
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Shaqfa Honey",
        url: "/contact",
        mainEntity: {
          "@type": "Organization",
          name: "Shaqfa Honey Trading & Honey Therapy",
          telephone: SITE.phone,
          email: SITE.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: SITE.city,
            addressRegion: SITE.region,
            addressCountry: SITE.country,
          },
        },
      }),
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useI18n();
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    setSent(true);
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("contact_messages").insert({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || "") || null,
      phone: String(fd.get("phone") || "") || null,
      message: String(fd.get("message") || ""),
    });
    if (error) {
      toast.error(error.message);
      setSent(false);
      return;
    }
    toast.success(lang === "ar" ? "تم إرسال رسالتك بنجاح" : "Your message has been sent successfully");
    form.reset();
    setTimeout(() => setSent(false), 2000);
  };

  const items = [
    { icon: MapPin, label: t("contact.address"), value: t("contact.address.value") },
    { icon: Mail, label: t("contact.email.label"), value: SITE.email },
    { icon: Phone, label: t("contact.phone.label"), value: SITE.phone, ltr: true },
    { icon: Clock, label: t("contact.hours"), value: t("contact.hours.value") },
  ];

  return (
    <>
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img src={heroContact} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.04_60/0.95)] via-[oklch(0.22_0.06_55/0.8)] to-[oklch(0.42_0.12_55/0.4)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center z-10 pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium uppercase tracking-[0.2em] mb-6 shadow-elegant">
            {t("nav.contact")}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white drop-shadow-md">
            {t("contact.title")}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl mx-auto drop-shadow-sm">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {items.map((it) => (
              <div key={it.label} className="bg-card border border-border rounded-2xl p-6 flex gap-4 hover:shadow-elegant transition">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold shrink-0">
                  <it.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{it.label}</div>
                  <div className="mt-1 font-medium text-foreground" dir={it.ltr ? "ltr" : undefined}>{it.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 bg-card border border-border rounded-2xl p-8 shadow-elegant space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium mb-2 block">{t("contact.name")}</label>
                <Input required name="name" className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t("contact.email")}</label>
                <Input required type="email" name="email" className="h-12" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("contact.phone")}</label>
              <Input name="phone" className="h-12" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("contact.message")}</label>
              <Textarea required name="message" rows={5} />
            </div>
            <Button type="submit" disabled={sent} size="lg" className="w-full bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold border-0 h-14">
              <Send className="w-5 h-5" /> {t("contact.send")}
            </Button>
          </form>
        </div>
      </Section>
    </>
  );
}
