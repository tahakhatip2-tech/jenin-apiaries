// Shared product & therapy catalog with pricing in Jordanian Dinar (JOD).
// Used both for page rendering and JSON-LD structured data.

import productRaw from "@/assets/product-raw.jpg";
import productRoyal from "@/assets/product-royal.jpg";
import productPropolis from "@/assets/product-propolis.jpg";
import productPollen from "@/assets/product-pollen.jpg";
import honeycomb from "@/assets/honeycomb.jpg";
import beekeeper from "@/assets/beekeeper.jpg";
import therapy from "@/assets/therapy.jpg";

export interface ProductItem {
  key: string;
  sku: string; // also used as URL slug
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  longDescEn: string;
  longDescAr: string;
  image: string;
  gallery: string[];
  priceJod: number;
  unit: string;
  category: string;
  availability: "InStock" | "OutOfStock" | "PreOrder";
  benefitsAr: string[];
  benefitsEn: string[];
  ingredientsAr: string;
  ingredientsEn: string;
  usageAr: string;
  usageEn: string;
}

// Therapy items have been converted to products (Therapeutic Blends)

export const PRODUCTS: ProductItem[] = [
  {
    key: "raw",
    sku: "SHQ-HONEY-RAW-250",
    nameEn: "Raw Natural Honey",
    nameAr: "عسل خام طبيعي",
    descEn: "Pure mountain and wildflower honey, unpasteurized and bottled straight from the apiary.",
    descAr: "عسل جبلي وزهري نقي غير مبستر، معبأ مباشرة من المنحل.",
    longDescEn:
      "Harvested from pristine Jordanian apiaries in the highlands, our raw honey is cold-extracted and never heated above hive temperature — preserving all natural enzymes, antioxidants and pollen.",
    longDescAr:
      "يُجنى عسلنا الخام من مناحل أردنية في المرتفعات الجبلية، ويُستخرج بالطرق الباردة دون تسخين، للحفاظ على جميع الإنزيمات الطبيعية ومضادات الأكسدة وحبوب اللقاح.",
    image: productRaw,
    gallery: [productRaw, honeycomb, beekeeper],
    priceJod: 18.0,
    unit: "250g jar",
    category: "Honey",
    availability: "InStock",
    benefitsAr: [
      "غني بمضادات الأكسدة الطبيعية",
      "يعزز المناعة والطاقة اليومية",
      "يهدئ الحلق ويدعم الجهاز الهضمي",
      "بديل صحي للسكر الأبيض",
    ],
    benefitsEn: [
      "Rich in natural antioxidants",
      "Boosts immunity and daily energy",
      "Soothes the throat and supports digestion",
      "Healthy alternative to refined sugar",
    ],
    ingredientsAr: "١٠٠٪ عسل نحل طبيعي خام، غير مبستر، بدون أي إضافات.",
    ingredientsEn: "100% raw natural bee honey, unpasteurized, no additives.",
    usageAr: "ملعقة صغيرة على الريق يومياً، أو حسب الرغبة مع المشروبات الدافئة.",
    usageEn: "One teaspoon on an empty stomach daily, or to taste with warm drinks.",
  },
  {
    key: "royal",
    sku: "SHQ-ROYAL-30",
    nameEn: "Royal Jelly",
    nameAr: "غذاء الملكات",
    descEn: "Premium royal jelly that boosts immunity and vitality.",
    descAr: "غذاء ملكات فاخر يعزز المناعة والحيوية.",
    longDescEn:
      "Fresh royal jelly preserved at low temperature to retain its proteins, B-vitamins and 10-HDA — the signature bioactive compound of authentic royal jelly.",
    longDescAr:
      "غذاء ملكات طازج محفوظ في درجة حرارة منخفضة للحفاظ على البروتينات وفيتامينات ب وحمض 10-HDA المميز لغذاء الملكات الأصيل.",
    image: productRoyal,
    gallery: [productRoyal, honeycomb, productPollen],
    priceJod: 45.0,
    unit: "30g jar",
    category: "Bee Products",
    availability: "InStock",
    benefitsAr: [
      "يعزز المناعة والنشاط الذهني",
      "يدعم الخصوبة والحيوية",
      "يحسّن صحة البشرة والشعر",
      "مضاد طبيعي للإرهاق",
    ],
    benefitsEn: [
      "Boosts immunity and mental focus",
      "Supports fertility and vitality",
      "Improves skin and hair health",
      "Natural anti-fatigue support",
    ],
    ingredientsAr: "١٠٠٪ غذاء ملكات طازج نقي.",
    ingredientsEn: "100% pure fresh royal jelly.",
    usageAr: "كمية بحجم حبة الحمص تحت اللسان صباحاً قبل الطعام.",
    usageEn: "A chickpea-sized amount under the tongue each morning before food.",
  },
  {
    key: "propolis",
    sku: "SHQ-PROPOLIS-30",
    nameEn: "Propolis Extract",
    nameAr: "العكبر (البروبوليس)",
    descEn: "Natural antimicrobial extract supporting immunity and overall wellness.",
    descAr: "مستخلص طبيعي مضاد للميكروبات يدعم المناعة والصحة العامة.",
    longDescEn:
      "A potent propolis tincture rich in flavonoids and polyphenols, traditionally used to support immunity, oral health and wound healing.",
    longDescAr:
      "صبغة عكبر فعّالة غنية بالفلافونويدات والبوليفينولات، تُستخدم تقليدياً لدعم المناعة وصحة الفم والتئام الجروح.",
    image: productPropolis,
    gallery: [productPropolis, honeycomb, beekeeper],
    priceJod: 30.0,
    unit: "30ml bottle",
    category: "Bee Products",
    availability: "InStock",
    benefitsAr: [
      "مضاد طبيعي للبكتيريا والفطريات",
      "يدعم صحة اللثة والفم",
      "يساعد في التئام الجروح",
      "يقوي جهاز المناعة",
    ],
    benefitsEn: [
      "Natural antibacterial and antifungal",
      "Supports gum and oral health",
      "Aids wound healing",
      "Strengthens the immune system",
    ],
    ingredientsAr: "مستخلص عكبر نقي في كحول غذائي.",
    ingredientsEn: "Pure propolis extract in food-grade alcohol.",
    usageAr: "١٠-١٥ نقطة في كوب ماء أو عصير مرتين يومياً.",
    usageEn: "10–15 drops in water or juice twice daily.",
  },
  {
    key: "pollen",
    sku: "SHQ-POLLEN-200",
    nameEn: "Bee Pollen",
    nameAr: "حبوب اللقاح",
    descEn: "Complete superfood rich in protein, minerals and vitamins.",
    descAr: "غذاء كامل غني بالبروتين والمعادن والفيتامينات.",
    longDescEn:
      "Hand-collected bee pollen granules — a natural multivitamin packed with amino acids, enzymes and trace minerals, gently dried to preserve nutrients.",
    longDescAr:
      "حبيبات حبوب لقاح مجموعة يدوياً، فيتامين متعدد طبيعي غني بالأحماض الأمينية والإنزيمات والمعادن، مجففة بلطف للحفاظ على عناصرها الغذائية.",
    image: productPollen,
    gallery: [productPollen, honeycomb, therapy],
    priceJod: 24.0,
    unit: "200g jar",
    category: "Bee Products",
    availability: "InStock",
    benefitsAr: [
      "مصدر طبيعي للبروتين الكامل",
      "يعزز الطاقة والقدرة على التحمل",
      "يدعم صحة الجهاز الهضمي",
      "غني بفيتامينات ب والمعادن",
    ],
    benefitsEn: [
      "Natural complete-protein source",
      "Boosts energy and endurance",
      "Supports digestive health",
      "Rich in B-vitamins and minerals",
    ],
    ingredientsAr: "١٠٠٪ حبوب لقاح نحل طبيعية.",
    ingredientsEn: "100% natural bee pollen granules.",
    usageAr: "ملعقة صغيرة مع الزبادي أو العصير يومياً.",
    usageEn: "One teaspoon daily with yogurt or juice.",
  },
  {
    key: "burn_blend",
    sku: "SHQ-BLEND-BURN-150",
    nameEn: "Burn Healing Blend",
    nameAr: "خلطة الحروق والجروح",
    descEn: "Therapeutic blend of honey and propolis for rapid wound healing.",
    descAr: "خلطة علاجية من العسل والعكبر لتسريع شفاء الحروق والجروح.",
    longDescEn:
      "A specialized therapeutic blend combining raw honey with potent propolis extract, known for its powerful antibacterial and tissue-regenerating properties. Applied topically to soothe burns and promote rapid healing without scarring.",
    longDescAr:
      "خلطة علاجية متخصصة تجمع بين العسل الخام ومستخلص العكبر القوي المعروف بخصائصه المضادة للبكتيريا والمجددة للأنسجة. تستخدم موضعياً لتهدئة الحروق وتسريع الشفاء وتقليل الندبات.",
    image: therapy,
    gallery: [therapy, honeycomb, productPropolis],
    priceJod: 25.0,
    unit: "150g jar",
    category: "Therapeutic Blends",
    availability: "InStock",
    benefitsAr: [
      "يسرع التئام الجروح والحروق",
      "مضاد قوي للبكتيريا ويمنع الالتهابات",
      "يخفف الألم ويهدئ البشرة المتهيجة",
      "يساعد في تقليل الندبات وآثار الحروق",
    ],
    benefitsEn: [
      "Accelerates healing of wounds and burns",
      "Strong antibacterial, prevents infection",
      "Relieves pain and soothes irritated skin",
      "Helps reduce scarring",
    ],
    ingredientsAr: "عسل نحل خام طبيعي، مستخلص عكبر مركز، شمع نحل طبيعي.",
    ingredientsEn: "Raw natural honey, concentrated propolis extract, natural beeswax.",
    usageAr: "توضع طبقة رقيقة على المنطقة المصابة بعد تنظيفها وتغطى بضمادة معقمة يومياً.",
    usageEn: "Apply a thin layer to the cleaned affected area and cover with a sterile bandage daily.",
  },
  {
    key: "immunity_blend",
    sku: "SHQ-BLEND-IMMUNE-250",
    nameEn: "Black Seed Immunity Blend",
    nameAr: "عسل مع حبة البركة للمناعة",
    descEn: "Potent mixture of raw honey and black seed for daily immunity support.",
    descAr: "مزيج قوي من العسل الخام وحبة البركة (الحبة السوداء) لدعم المناعة اليومي.",
    longDescEn:
      "This powerful blend mixes our finest raw mountain honey with premium Nigella Sativa (black seeds). Traditionally known as a cure-all, black seed combined with honey creates a potent daily immune booster and energy source.",
    longDescAr:
      "تجمع هذه الخلطة الفعالة بين أجود أنواع العسل الجبلي الخام وحبة البركة الممتازة (الحبة السوداء). مزيج مثالي لتقوية جهاز المناعة، وعلاج السعال، ومحاربة الالتهابات وتوفير طاقة طبيعية يومية.",
    image: productRaw, // reusing an image for now
    gallery: [productRaw, beekeeper, productPollen],
    priceJod: 22.0,
    unit: "250g jar",
    category: "Therapeutic Blends",
    availability: "InStock",
    benefitsAr: [
      "يرفع كفاءة جهاز المناعة بشكل طبيعي",
      "يخفف من أعراض السعال والربو والبرد",
      "مضاد قوي للالتهابات والأكسدة",
      "يحسن الهضم ويدعم صحة القلب",
    ],
    benefitsEn: [
      "Naturally boosts immune system efficiency",
      "Relieves symptoms of coughs, asthma, and colds",
      "Strong anti-inflammatory and antioxidant",
      "Improves digestion and supports heart health",
    ],
    ingredientsAr: "عسل سدر/جبلي خام طبيعي، حبة البركة (الحبة السوداء) مطحونة طازجة.",
    ingredientsEn: "Raw natural sidr/mountain honey, freshly ground Nigella Sativa (black seed).",
    usageAr: "ملعقة صغيرة على الريق يومياً. يمكن تذويبها في نصف كوب ماء دافئ.",
    usageEn: "One teaspoon daily on an empty stomach. Can be dissolved in warm water.",
  },
];

export function getProductBySku(sku: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.sku === sku);
}

export function formatJod(value: number, lang: "ar" | "en") {
  const num = value.toFixed(2);
  return lang === "ar" ? `${num} د.أ` : `JOD ${num}`;
}

// WhatsApp helper — number sanitized from SITE.phone
export function buildWhatsappUrl(phoneE164: string, message: string) {
  const digits = phoneE164.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
