import { Link } from "@tanstack/react-router";
import { Hexagon, Mail, Phone, MapPin, Camera, MessageCircle, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/seo";
import logoUrl from "@/assets/logo.png";

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(0.18_0.03_60)] text-[oklch(0.95_0.012_85)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <img src={logoUrl} alt="Jenin Apiaries Logo" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <div className="font-display text-xl font-semibold">{lang === "ar" ? SITE.nameAr : SITE.nameEn}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-[oklch(0.78_0.17_78)]">
                  {t("brand.tagline")}
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70 max-w-md">{t("footer.about")}</p>
            <div className="flex items-center gap-3 mt-6">
              {[Camera, MessageCircle, Send].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-gradient-gold hover:border-transparent transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-white">{t("footer.quicklinks")}</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/" className="hover:text-[oklch(0.78_0.17_78)] transition">{t("nav.home")}</Link></li>
              <li><Link to="/about" className="hover:text-[oklch(0.78_0.17_78)] transition">{t("nav.about")}</Link></li>
              <li><Link to="/products" className="hover:text-[oklch(0.78_0.17_78)] transition">{t("nav.products")}</Link></li>
              <li><Link to="/therapy" className="hover:text-[oklch(0.78_0.17_78)] transition">{t("nav.therapy")}</Link></li>
              <li><Link to="/contact" className="hover:text-[oklch(0.78_0.17_78)] transition">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-white">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[oklch(0.78_0.17_78)] shrink-0" /><span>{lang === "ar" ? "اشارات المشيرفة، الزرقاء، المملكة الأردنية الهاشمية" : SITE.streetEn}</span></li>
              <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-[oklch(0.78_0.17_78)] shrink-0" /><span>{SITE.email}</span></li>
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-[oklch(0.78_0.17_78)] shrink-0" /><span dir="ltr">{SITE.phone}</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>© {year} {t("brand.name")}. {t("footer.rights")}.</p>
          <p>{t("brand.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
