import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  ar: {
    "brand.name": "مناحل جنين",
    "brand.tagline": "شفاء الطبيعة، نقاء الامتياز",
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.products": "المنتجات",
    "nav.therapy": "الخلطات العلاجية",
    "nav.contact": "تواصل معنا",
    "cta.shop": "اكتشف منتجاتنا",
    "cta.book": "تصفح الخلطات العلاجية",
    "cta.contact": "تواصل معنا",
    "cta.learn": "اعرف المزيد",

    "hero.eyebrow": "تجارة العسل الفاخر والعلاج الطبيعي",
    "hero.title": "شفاء الطبيعة في كل قطرة ذهبية",
    "hero.subtitle": "عسل خام أصيل ومنتجات نحل عضوية مختارة بعناية من أنقى المصادر، تجمع بين الحكمة القديمة والمعايير العالمية للجودة.",

    "company.title": "شركة مناحل جنين",
    "company.subtitle": "الخيار الأول للعسل الأصلي والخلطات العلاجية",
    "company.desc": "نحن في مناحل جنين نفخر بكوننا شركة رائدة في إنتاج وتصدير جميع أنواع العسل الطبيعي. نقدم خدمات البيع بالجملة والمفرق لتلبية كافة احتياجاتكم من العسل الفاخر، بالإضافة إلى تميزنا في تحضير الخلطات العلاجية المتخصصة بأعلى معايير الجودة لضمان صحتكم وعافيتكم.",

    "stats.years": "سنوات من الخبرة",
    "stats.products": "منتج طبيعي",
    "stats.countries": "دولة نخدمها",
    "stats.clients": "عميل سعيد",

    "section.features.title": "لماذا تختار شقفا",
    "section.features.subtitle": "إرث من الجودة والثقة في كل منتج",
    "feature.pure.title": "نقاء ١٠٠٪",
    "feature.pure.desc": "عسل خام غير مبستر، خالٍ من أي إضافات أو محليات صناعية.",
    "feature.organic.title": "عضوي معتمد",
    "feature.organic.desc": "مصادر مختارة من مناحل عضوية بعيدًا عن التلوث.",
    "feature.tested.title": "مختبر ومضمون",
    "feature.tested.desc": "كل دفعة تخضع لاختبارات صارمة لضمان الأصالة.",
    "feature.therapy.title": "علاج معتمد",
    "feature.therapy.desc": "جلسات علاج بالعسل تحت إشراف متخصصين معتمدين.",

    "section.products.title": "منتجاتنا المميزة",
    "section.products.subtitle": "تشكيلة فاخرة من أرقى منتجات النحل",
    "product.raw.title": "عسل خام طبيعي",
    "product.raw.desc": "عسل جبلي وزهري نقي معبأ مباشرة من المنحل.",
    "product.royal.title": "غذاء الملكات",
    "product.royal.desc": "كنز طبيعي يعزز المناعة والحيوية.",
    "product.propolis.title": "العكبر (البروبوليس)",
    "product.propolis.desc": "مضاد طبيعي يدعم صحة الجسم والمناعة.",
    "product.pollen.title": "حبوب اللقاح",
    "product.pollen.desc": "غذاء كامل غني بالبروتين والمعادن والفيتامينات.",

    "section.therapy.title": "الخلطات العلاجية الطبيعية",
    "section.therapy.subtitle": "مزيج من العسل الخام والمنتجات الطبيعية لدعم صحتك",
    "therapy.desc": "نقدم لك مجموعة من الخلطات العلاجية المتخصصة الجاهزة، محضرة بعناية فائقة باستخدام أجود أنواع العسل الخام ومنتجات النحل لدعم الجهاز المناعي، تسريع شفاء الجروح، وتحسين الصحة العامة.",
    "therapy.point1": "علاج الجروح والحروق",
    "therapy.point2": "تعزيز المناعة والطاقة",
    "therapy.point3": "العناية بالبشرة والشعر",
    "therapy.point4": "تخفيف آلام المفاصل",

    "section.about.title": "قصتنا",
    "section.about.subtitle": "إرث من النحالة والعلاج الطبيعي",
    "about.desc": "تأسست شقفا على شغف عريق بتراث النحالة وفنون الشفاء الطبيعي. نعمل مع مربي النحل في أنقى المناطق الجبلية والزهرية لنقدم لك منتجات تتجاوز المعايير العالمية للجودة والأصالة.",

    "section.cta.title": "ابدأ رحلتك مع الشفاء الطبيعي",
    "section.cta.subtitle": "اكتشف الفرق الذي يصنعه العسل النقي في حياتك",

    "contact.title": "تواصل معنا",
    "contact.subtitle": "نحن هنا للإجابة على أسئلتك",
    "contact.name": "الاسم الكامل",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "رقم الهاتف",
    "contact.message": "رسالتك",
    "contact.send": "إرسال الرسالة",
    "contact.address": "العنوان",
    "contact.email.label": "البريد الإلكتروني",
    "contact.phone.label": "اتصل بنا",
    "contact.hours": "ساعات العمل",
    "contact.hours.value": "السبت - الخميس: ٩ صباحاً - ٧ مساءً",
    "contact.address.value": "اشارات المشيرفة، الزرقاء، المملكة الأردنية الهاشمية",

    "footer.about": "مناحل جنين — شريكك الموثوق في عالم العسل النقي ومنتجات النحل العضوية والعلاج الطبيعي.",
    "footer.quicklinks": "روابط سريعة",
    "footer.contact": "تواصل",
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.follow": "تابعنا",

    "lang.switch": "English",
  },
  en: {
    "brand.name": "Jenin Apiaries",
    "brand.tagline": "Nature's Healing, Pure Excellence",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.products": "Products",
    "nav.therapy": "Therapeutic Blends",
    "nav.contact": "Contact",
    "cta.shop": "Explore Products",
    "cta.book": "Browse Blends",
    "cta.contact": "Contact Us",
    "cta.learn": "Learn More",

    "hero.eyebrow": "Premium Honey Trading & Natural Therapy",
    "hero.title": "Nature's Healing in Every Golden Drop",
    "hero.subtitle": "Authentic raw honey and organic bee products, hand-selected from the purest sources — where ancient wisdom meets world-class standards.",

    "company.title": "Jenin Apiaries Company",
    "company.subtitle": "The Premier Choice for Authentic Honey & Therapeutic Blends",
    "company.desc": "At Jenin Apiaries, we pride ourselves on being a leading company in the production and export of all types of natural honey. We offer wholesale and retail services to meet all your needs for premium honey, in addition to our excellence in preparing specialized therapeutic blends to the highest quality standards.",

    "stats.years": "Years of Expertise",
    "stats.products": "Natural Products",
    "stats.countries": "Countries Served",
    "stats.clients": "Happy Clients",

    "section.features.title": "Why Choose Shaqfa",
    "section.features.subtitle": "A legacy of quality and trust in every product",
    "feature.pure.title": "100% Pure",
    "feature.pure.desc": "Raw, unpasteurized honey, free from additives or artificial sweeteners.",
    "feature.organic.title": "Certified Organic",
    "feature.organic.desc": "Sourced from organic apiaries far from pollution and pesticides.",
    "feature.tested.title": "Lab Tested",
    "feature.tested.desc": "Every batch undergoes rigorous testing for authenticity and purity.",
    "feature.therapy.title": "Expert Therapy",
    "feature.therapy.desc": "Honey therapy sessions supervised by certified apitherapy specialists.",

    "section.products.title": "Our Signature Products",
    "section.products.subtitle": "A premium selection of the finest bee products",
    "product.raw.title": "Raw Natural Honey",
    "product.raw.desc": "Pure mountain and wildflower honey, bottled straight from the apiary.",
    "product.royal.title": "Royal Jelly",
    "product.royal.desc": "Nature's treasure that boosts immunity and vitality.",
    "product.propolis.title": "Propolis",
    "product.propolis.desc": "Natural antimicrobial supporting immunity and overall wellness.",
    "product.pollen.title": "Bee Pollen",
    "product.pollen.desc": "Complete superfood rich in protein, minerals and vitamins.",

    "section.therapy.title": "Natural Therapeutic Blends",
    "section.therapy.subtitle": "A mix of raw honey and natural products to support your health",
    "therapy.desc": "We offer a range of specialized ready-to-use therapeutic blends, carefully prepared using the finest raw honey and bee products to support the immune system, accelerate wound healing, and improve overall health.",
    "therapy.point1": "Wound and burn healing",
    "therapy.point2": "Immunity and energy boost",
    "therapy.point3": "Skin and hair care",
    "therapy.point4": "Joint pain relief",

    "section.about.title": "Our Story",
    "section.about.subtitle": "A heritage of beekeeping and natural healing",
    "about.desc": "Shaqfa was founded on a deep passion for beekeeping heritage and the art of natural healing. We work alongside beekeepers in the purest mountain and wildflower regions to bring you products that exceed global standards of quality and authenticity.",

    "section.cta.title": "Begin Your Journey with Natural Healing",
    "section.cta.subtitle": "Discover the difference pure honey can make in your life",

    "contact.title": "Get in Touch",
    "contact.subtitle": "We're here to answer your questions",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.address": "Address",
    "contact.email.label": "Email Us",
    "contact.phone.label": "Call Us",
    "contact.hours": "Working Hours",
    "contact.hours.value": "Sat - Thu: 9:00 AM - 7:00 PM",
    "contact.address.value": "Al-Musheirfah Traffic Lights, Zarqa, Hashemite Kingdom of Jordan",

    "footer.about": "Jenin Apiaries — your trusted partner for pure honey, organic bee products, and natural healing.",
    "footer.quicklinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved",
    "footer.follow": "Follow Us",

    "lang.switch": "العربية",
  },
};

interface I18nContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang)) || "ar";
    setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: string) => translations[lang][key] ?? key;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return <I18nContext.Provider value={{ lang, dir, t, setLang }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
