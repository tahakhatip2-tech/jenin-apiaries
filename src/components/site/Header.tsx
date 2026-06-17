import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/seo";
import logoUrl from "@/assets/logo.png";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/products", label: t("nav.products") },
    { to: "/therapy", label: t("nav.therapy") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <img src={logoUrl} alt="Jenin Apiaries Logo" className="w-12 h-12 object-contain drop-shadow-md" />
              </div>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold text-foreground">
                {lang === "ar" ? SITE.nameAr : SITE.nameEn}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {lang === "ar" ? "عسل وعلاج" : "Honey & Therapy"}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent transition"
                activeProps={{ className: "text-foreground bg-accent" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-border hover:bg-accent transition"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span>{t("lang.switch")}</span>
            </button>
            <Button asChild variant="default" className="hidden md:inline-flex bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold border-0">
              <Link to="/contact">{t("cta.contact")}</Link>
            </Button>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent"
              aria-label="Menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setLang(lang === "ar" ? "en" : "ar");
                setOpen(false);
              }}
              className="w-full text-start px-4 py-3 rounded-lg text-base font-medium hover:bg-accent flex items-center gap-2"
            >
              <Globe className="w-5 h-5" />
              {t("lang.switch")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
