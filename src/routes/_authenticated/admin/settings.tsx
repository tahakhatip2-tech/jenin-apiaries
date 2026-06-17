import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsPage,
});

const FIELDS: { key: string; label: string; dir?: "ltr" | "rtl" }[] = [
  { key: "phone", label: "رقم الهاتف", dir: "ltr" },
  { key: "whatsapp", label: "رقم واتساب (E.164)", dir: "ltr" },
  { key: "email", label: "البريد الإلكتروني", dir: "ltr" },
  { key: "address_ar", label: "العنوان (عربي)" },
  { key: "address_en", label: "Address (English)", dir: "ltr" },
];

function SettingsPage() {
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((r) => (map[r.key] = r.value));
      return map;
    },
  });

  useEffect(() => {
    if (data) setValues(data);
  }, [data]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const rows = FIELDS.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("تم حفظ الإعدادات");
    qc.invalidateQueries({ queryKey: ["site-settings"] });
  };

  if (isLoading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-6">
      <h2 className="font-display text-2xl font-semibold">إعدادات الموقع</h2>
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="text-sm font-medium mb-2 block">{f.label}</label>
            <Input
              value={values[f.key] ?? ""}
              onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
              dir={f.dir}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={saving} className="bg-gradient-gold text-primary-foreground shadow-gold border-0">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "حفظ"}
        </Button>
      </div>
    </form>
  );
}
