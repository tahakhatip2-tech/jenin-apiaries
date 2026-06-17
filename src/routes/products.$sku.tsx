import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Truck,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Phone,
  MessageSquare,
  ChevronRight,
  Leaf,
  Award,
} from "lucide-react";

import { buildBilingualMeta, buildLinks, jsonLdScript, breadcrumbsJsonLd, SITE } from "@/lib/seo";
import { formatJod, getProductBySku, PRODUCTS, buildWhatsappUrl, type ProductItem } from "@/lib/catalog";

const productJsonLd = (p: ProductItem) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `/products/${p.sku}`,
  sku: p.sku,
  name: p.nameEn,
  alternateName: p.nameAr,
  description: `${p.descEn} — ${p.descAr}\n\n${p.longDescEn}\n\n${p.longDescAr}`,
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

export const Route = createFileRoute("/products/$sku")({
  loader: ({ params }) => {
    const product = getProductBySku(params.sku);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    return {
      meta: buildBilingualMeta({
        path: `/products/${p.sku}`,
        titleEn: `${p.nameEn} — Jenin Apiaries`,
        titleAr: `${p.nameAr} — مناحل جنين`,
        descEn: p.descEn,
        descAr: p.descAr,
        image: p.image,
        type: "product",
      }),
      links: buildLinks(`/products/${p.sku}`),
      scripts: [
        jsonLdScript(
          breadcrumbsJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: p.nameEn, path: `/products/${p.sku}` },
          ]),
        ),
        jsonLdScript(productJsonLd(p)),
      ],
    };
  },
  notFoundComponent: () => {
    const { lang } = useI18n();
    return (
      <Section>
        <div className="text-center py-20">
          <h1 className="font-display text-3xl font-semibold mb-4">
            {lang === "ar" ? "المنتج غير موجود" : "Product not found"}
          </h1>
          <Button asChild>
            <Link to="/products">{lang === "ar" ? "العودة للمنتجات" : "Back to products"}</Link>
          </Button>
        </div>
      </Section>
    );
  },
  errorComponent: ({ reset }) => (
    <Section>
      <div className="text-center py-20">
        <h1 className="font-display text-3xl font-semibold mb-4">Something went wrong</h1>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </Section>
  ),
  component: ProductDetailPage,
});

// ─── WhatsApp SVG icon ────────────────────────────────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Build professional WhatsApp order message ────────────────────────────────
function buildOrderMessage(
  product: ProductItem,
  qty: number,
  lang: "ar" | "en",
): string {
  const total = product.priceJod * qty;
  if (lang === "ar") {
    return [
      `🛒 *طلب جديد — مناحل جنين*`,
      ``,
      `📦 *المنتج:* ${product.nameAr}`,
      `🔖 *الكود:* ${product.sku}`,
      `📏 *الوحدة:* ${product.unit}`,
      `🔢 *الكمية:* ${qty}`,
      `💰 *سعر الوحدة:* ${formatJod(product.priceJod, "ar")}`,
      `💵 *الإجمالي:* ${formatJod(total, "ar")}`,
      ``,
      `📍 *فئة المنتج:* ${product.category}`,
      ``,
      `أرجو التواصل لتأكيد الطلب وتحديد موعد التوصيل. شكراً 🙏`,
    ].join("\n");
  }
  return [
    `🛒 *New Order — Jenin Apiaries*`,
    ``,
    `📦 *Product:* ${product.nameEn}`,
    `🔖 *SKU:* ${product.sku}`,
    `📏 *Unit:* ${product.unit}`,
    `🔢 *Quantity:* ${qty}`,
    `💰 *Unit Price:* ${formatJod(product.priceJod, "en")}`,
    `💵 *Total:* ${formatJod(total, "en")}`,
    ``,
    `📍 *Category:* ${product.category}`,
    ``,
    `Please contact me to confirm the order and arrange delivery. Thank you 🙏`,
  ].join("\n");
}

// ─── Main component ───────────────────────────────────────────────────────────
function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const { lang, dir } = useI18n();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "benefits" | "usage">("desc");

  const name = lang === "ar" ? product.nameAr : product.nameEn;
  const desc = lang === "ar" ? product.descAr : product.descEn;
  const longDesc = lang === "ar" ? product.longDescAr : product.longDescEn;
  const benefits: string[] = lang === "ar" ? product.benefitsAr : product.benefitsEn;
  const ingredients = lang === "ar" ? product.ingredientsAr : product.ingredientsEn;
  const usage = lang === "ar" ? product.usageAr : product.usageEn;

  const gallery = [product.image, ...product.gallery];
  const total = product.priceJod * qty;

  const orderMsg = buildOrderMessage(product, qty, lang);
  const orderUrl = buildWhatsappUrl(SITE.phone, orderMsg);

  const inquiryMsg =
    lang === "ar"
      ? `مرحباً، أريد الاستفسار عن: ${product.nameAr} (${product.sku})`
      : `Hello, I'd like to inquire about: ${product.nameEn} (${product.sku})`;
  const inquiryUrl = buildWhatsappUrl(SITE.phone, inquiryMsg);

  const related = PRODUCTS.filter((p) => p.sku !== product.sku).slice(0, 3);

  const tabs = [
    { id: "desc" as const, label: lang === "ar" ? "الوصف" : "Description" },
    { id: "benefits" as const, label: lang === "ar" ? "الفوائد" : "Benefits" },
    { id: "usage" as const, label: lang === "ar" ? "طريقة الاستخدام" : "How to Use" },
  ];

  return (
    <>
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <Section className="pt-10 pb-0">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/products" className="hover:text-foreground transition-colors">
            {lang === "ar" ? "المنتجات" : "Products"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[180px]">{name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* ── Gallery ── */}
          <div className="sticky top-24">
            {/* Main image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-soft border border-border shadow-elegant group">
              <img
                src={gallery[activeImg]}
                alt={name}
                width={1200}
                height={1200}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Badge */}
              {product.availability === "InStock" && (
                <div className="absolute top-4 start-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow">
                  {lang === "ar" ? "✓ متوفر" : "✓ In Stock"}
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    aria-label={`${name} ${i + 1}`}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImg === i
                        ? "border-amber-500 shadow-md scale-105"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div dir={dir}>
            {/* Category badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-widest mb-5">
              <Leaf className="w-3.5 h-3.5" />
              {product.category}
            </div>

            {/* Name */}
            <h1 className="font-display text-3xl md:text-4xl xl:text-5xl font-bold leading-tight mb-3">
              {name}
            </h1>

            {/* Short desc */}
            <p className="text-muted-foreground text-base leading-relaxed mb-6">{desc}</p>

            {/* Rating placeholder */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {lang === "ar" ? "جودة مضمونة ١٠٠٪" : "100% quality guaranteed"}
              </span>
            </div>

            {/* Price */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 mb-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-extrabold text-amber-700 tabular-nums">
                  {formatJod(product.priceJod, lang)}
                </span>
                <span className="text-muted-foreground text-sm">/ {product.unit}</span>
              </div>
              {qty > 1 && (
                <div className="text-sm text-amber-700 font-medium mt-1">
                  {lang === "ar" ? `الإجمالي: ${formatJod(total, "ar")}` : `Total: ${formatJod(total, "en")}`}
                </div>
              )}
            </div>

            {/* ── Quantity Selector ── */}
            <div className="mb-6">
              <label className="text-sm font-semibold mb-2 block">
                {lang === "ar" ? "الكمية" : "Quantity"}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-11 w-11 rounded-xl border-2 border-border bg-background hover:border-amber-400 hover:bg-amber-50 flex items-center justify-center transition-all"
                  aria-label={lang === "ar" ? "إنقاص الكمية" : "Decrease quantity"}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="h-11 w-16 rounded-xl border-2 border-amber-400 bg-amber-50 flex items-center justify-center text-lg font-bold text-amber-700 tabular-nums">
                  {qty}
                </div>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="h-11 w-11 rounded-xl border-2 border-border bg-background hover:border-amber-400 hover:bg-amber-50 flex items-center justify-center transition-all"
                  aria-label={lang === "ar" ? "زيادة الكمية" : "Increase quantity"}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── CTA Buttons ── */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {/* Order via WhatsApp */}
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 h-13 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold text-base shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.55)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                {lang === "ar" ? `اطلب الآن (${qty} قطعة)` : `Order Now (${qty} unit${qty > 1 ? "s" : ""})`}
              </a>

              {/* Inquiry */}
              <a
                href={inquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-13 px-5 py-3.5 rounded-2xl border-2 border-border bg-background hover:border-amber-400 hover:bg-amber-50 text-foreground font-semibold text-base transition-all duration-200"
              >
                <MessageSquare className="w-5 h-5 shrink-0 text-amber-600" />
                {lang === "ar" ? "استفسار" : "Inquire"}
              </a>
            </div>

            {/* Direct call */}
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              {lang === "ar"
                ? `أو اتصل بنا: ${SITE.phone}`
                : `Or call us: ${SITE.phone}`}
            </a>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-card border border-border">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-sm font-medium">
                  {lang === "ar" ? "شحن لكل الأردن والخليج" : "Ships Jordan & GCC"}
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-card border border-border">
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-sm font-medium">
                  {lang === "ar" ? "نقاء مضمون ١٠٠٪" : "100% purity guaranteed"}
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-card border border-border">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium">
                  {lang === "ar" ? "منتج أردني أصيل" : "Authentic Jordanian"}
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-card border border-border">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium">
                  {lang === "ar" ? "طبيعي ١٠٠٪" : "100% Natural"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Tabs Section ──────────────────────────────────────────────── */}
      <Section className="bg-gradient-soft pt-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2" dir={dir}>
            {/* Tab bar */}
            <div className="flex gap-1 p-1 rounded-xl bg-muted w-fit mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="min-h-[180px]">
              {activeTab === "desc" && (
                <p className="text-muted-foreground leading-relaxed text-base">{longDesc}</p>
              )}
              {activeTab === "benefits" && (
                <ul className="grid sm:grid-cols-2 gap-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                      <Check className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === "usage" && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100">
                  <h3 className="font-semibold text-amber-800 mb-2">
                    {lang === "ar" ? "🍯 طريقة الاستخدام الموصى بها" : "🍯 Recommended Usage"}
                  </h3>
                  <p className="text-amber-900 leading-relaxed">{usage}</p>
                  {ingredients && (
                    <div className="mt-4 pt-4 border-t border-amber-200">
                      <h3 className="font-semibold text-amber-800 mb-1">
                        {lang === "ar" ? "🌿 المكونات" : "🌿 Ingredients"}
                      </h3>
                      <p className="text-amber-900 text-sm leading-relaxed">{ingredients}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4" dir={dir}>
            {/* Product info card */}
            <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
              <h3 className="font-display text-base font-semibold mb-1">
                {lang === "ar" ? "معلومات المنتج" : "Product Details"}
              </h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="font-mono font-medium">{product.sku}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{lang === "ar" ? "الفئة" : "Category"}</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{lang === "ar" ? "الوحدة" : "Unit"}</span>
                  <span className="font-medium">{product.unit}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">{lang === "ar" ? "الحالة" : "Status"}</span>
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {product.availability === "InStock"
                      ? lang === "ar" ? "متوفر" : "In Stock"
                      : lang === "ar" ? "حسب الطلب" : "Pre-order"}
                  </span>
                </div>
              </div>
            </div>

            {/* Order summary box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="w-5 h-5 text-amber-700" />
                <h3 className="font-semibold text-amber-900">
                  {lang === "ar" ? "ملخص طلبك" : "Your Order"}
                </h3>
              </div>
              <div className="text-sm space-y-1.5 mb-4">
                <div className="flex justify-between">
                  <span className="text-amber-700">{lang === "ar" ? "الكمية" : "Qty"}</span>
                  <span className="font-bold text-amber-900">{qty} × {formatJod(product.priceJod, lang)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-amber-200">
                  <span className="font-semibold text-amber-800">{lang === "ar" ? "الإجمالي" : "Total"}</span>
                  <span className="font-extrabold text-amber-900 text-base">{formatJod(total, lang)}</span>
                </div>
              </div>
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold text-sm shadow transition-all hover:scale-[1.02]"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                {lang === "ar" ? "أرسل الطلب الآن" : "Send Order Now"}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      {/* ─── Related Products ──────────────────────────────────────────── */}
      <Section>
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold mb-2">
            {lang === "ar" ? "منتجات قد تعجبك" : "You May Also Like"}
          </h2>
          <p className="text-muted-foreground">
            {lang === "ar" ? "اكتشف مزيداً من منتجاتنا الطبيعية" : "Explore more of our natural products"}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link
              key={p.sku}
              to="/products/$sku"
              params={{ sku: p.sku }}
              className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant hover:border-amber-200 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-gradient-soft">
                <img
                  src={p.image}
                  alt={lang === "ar" ? p.nameAr : p.nameEn}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="p-5 flex flex-col flex-1" dir={dir}>
                <span className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-1">{p.category}</span>
                <h3 className="font-display text-lg font-semibold mb-1">
                  {lang === "ar" ? p.nameAr : p.nameEn}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {lang === "ar" ? p.descAr : p.descEn}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-amber-700 text-base" dir={lang === "ar" ? "rtl" : "ltr"}>
                    {formatJod(p.priceJod, lang)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:gap-2 transition-all">
                    {lang === "ar" ? "عرض" : "View"}
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
