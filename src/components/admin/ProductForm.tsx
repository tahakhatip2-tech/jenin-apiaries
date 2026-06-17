import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";

export type ProductFormValue = {
  id?: string;
  sku: string;
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  long_desc_ar: string;
  long_desc_en: string;
  price_jod: number;
  unit: string;
  category: string;
  image_url: string;
  benefits_ar: string[];
  benefits_en: string[];
  ingredients_ar: string;
  ingredients_en: string;
  usage_ar: string;
  usage_en: string;
  is_active: boolean;
};

export const emptyProduct: ProductFormValue = {
  sku: "",
  name_ar: "",
  name_en: "",
  desc_ar: "",
  desc_en: "",
  long_desc_ar: "",
  long_desc_en: "",
  price_jod: 0,
  unit: "",
  category: "",
  image_url: "",
  benefits_ar: [],
  benefits_en: [],
  ingredients_ar: "",
  ingredients_en: "",
  usage_ar: "",
  usage_en: "",
  is_active: true,
};

export function ProductForm({ initial, mode }: { initial: ProductFormValue; mode: "create" | "edit" }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [value, setValue] = useState<ProductFormValue>(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = <K extends keyof ProductFormValue>(k: K, v: ProductFormValue[K]) =>
    setValue((p) => ({ ...p, [k]: v }));

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("products").upload(path, file, {
      upsert: false,
      contentType: file.type,
    });
    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }
    // Create long-lived signed URL (1 year) for display
    const { data: signed } = await supabase.storage
      .from("products")
      .createSignedUrl(path, 60 * 60 * 24 * 365);
    if (signed?.signedUrl) set("image_url", signed.signedUrl);
    setUploading(false);
    toast.success("تم رفع الصورة");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...value,
      price_jod: Number(value.price_jod) || 0,
    };
    if (mode === "create") {
      const { id: _ignore, ...insert } = payload;
      void _ignore;
      const { error } = await supabase.from("products").insert(insert);
      if (error) {
        toast.error(error.message);
        setSaving(false);
        return;
      }
      toast.success("تم إضافة المنتج");
    } else {
      const { id, ...update } = payload;
      const { error } = await supabase.from("products").update(update).eq("id", id!);
      if (error) {
        toast.error(error.message);
        setSaving(false);
        return;
      }
      toast.success("تم الحفظ");
    }
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["public-products"] });
    qc.invalidateQueries({ queryKey: ["admin-stats"] });
    navigate({ to: "/admin/products" });
  };

  return (
    <form onSubmit={onSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-semibold text-lg">المعلومات الأساسية</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="رمز المنتج (SKU)" required>
            <Input value={value.sku} onChange={(e) => set("sku", e.target.value)} required dir="ltr" />
          </Field>
          <Field label="الفئة">
            <Input value={value.category} onChange={(e) => set("category", e.target.value)} placeholder="Honey" />
          </Field>
          <Field label="الاسم (عربي)" required>
            <Input value={value.name_ar} onChange={(e) => set("name_ar", e.target.value)} required />
          </Field>
          <Field label="الاسم (English)" required>
            <Input value={value.name_en} onChange={(e) => set("name_en", e.target.value)} required dir="ltr" />
          </Field>
          <Field label="السعر (د.أ)" required>
            <Input
              type="number" step="0.01" min="0"
              value={value.price_jod}
              onChange={(e) => set("price_jod", parseFloat(e.target.value))}
              required dir="ltr"
            />
          </Field>
          <Field label="الوحدة">
            <Input value={value.unit} onChange={(e) => set("unit", e.target.value)} placeholder="250g jar" />
          </Field>
        </div>

        <Field label="وصف قصير (عربي)">
          <Textarea rows={2} value={value.desc_ar} onChange={(e) => set("desc_ar", e.target.value)} />
        </Field>
        <Field label="Short description (English)">
          <Textarea rows={2} value={value.desc_en} onChange={(e) => set("desc_en", e.target.value)} dir="ltr" />
        </Field>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-semibold text-lg">صورة المنتج</h3>
        {value.image_url && (
          <div className="relative inline-block">
            <img src={value.image_url} alt="" className="w-40 h-40 object-cover rounded-xl border border-border" />
            <button
              type="button"
              onClick={() => set("image_url", "")}
              className="absolute -top-2 -end-2 w-7 h-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-border cursor-pointer hover:bg-accent">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "جاري الرفع..." : "رفع صورة"}
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={uploading} />
        </label>
        <p className="text-xs text-muted-foreground">أو ألصق رابط صورة:</p>
        <Input value={value.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="https://..." dir="ltr" />
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-semibold text-lg">التفاصيل</h3>
        <Field label="الوصف المفصّل (عربي)">
          <Textarea rows={3} value={value.long_desc_ar} onChange={(e) => set("long_desc_ar", e.target.value)} />
        </Field>
        <Field label="Long description (English)">
          <Textarea rows={3} value={value.long_desc_en} onChange={(e) => set("long_desc_en", e.target.value)} dir="ltr" />
        </Field>
        <Field label="الفوائد (عربي) — سطر لكل فائدة">
          <Textarea
            rows={4}
            value={value.benefits_ar.join("\n")}
            onChange={(e) => set("benefits_ar", e.target.value.split("\n").filter(Boolean))}
          />
        </Field>
        <Field label="Benefits (English) — one per line">
          <Textarea
            rows={4}
            value={value.benefits_en.join("\n")}
            onChange={(e) => set("benefits_en", e.target.value.split("\n").filter(Boolean))}
            dir="ltr"
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="المكونات (عربي)">
            <Textarea rows={2} value={value.ingredients_ar} onChange={(e) => set("ingredients_ar", e.target.value)} />
          </Field>
          <Field label="Ingredients (English)">
            <Textarea rows={2} value={value.ingredients_en} onChange={(e) => set("ingredients_en", e.target.value)} dir="ltr" />
          </Field>
          <Field label="طريقة الاستخدام (عربي)">
            <Textarea rows={2} value={value.usage_ar} onChange={(e) => set("usage_ar", e.target.value)} />
          </Field>
          <Field label="Usage (English)">
            <Textarea rows={2} value={value.usage_en} onChange={(e) => set("usage_en", e.target.value)} dir="ltr" />
          </Field>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={value.is_active}
            onChange={(e) => set("is_active", e.target.checked)}
            className="w-5 h-5 rounded accent-amber-500"
          />
          <span className="font-medium">منتج نشط (يظهر للزوار)</span>
        </label>
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/admin/products" })}>
          إلغاء
        </Button>
        <Button
          type="submit"
          disabled={saving}
          className="bg-gradient-gold text-primary-foreground shadow-gold border-0"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "create" ? "إضافة" : "حفظ"}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}
