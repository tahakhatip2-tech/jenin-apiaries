import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductForm, emptyProduct, type ProductFormValue } from "@/components/admin/ProductForm";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/products/$id")({
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  if (error || !data) return <div className="text-center py-20 text-destructive">تعذّر تحميل المنتج</div>;

  const value: ProductFormValue = {
    ...emptyProduct,
    id: data.id,
    sku: data.sku,
    name_ar: data.name_ar,
    name_en: data.name_en,
    desc_ar: data.desc_ar,
    desc_en: data.desc_en,
    long_desc_ar: data.long_desc_ar,
    long_desc_en: data.long_desc_en,
    price_jod: Number(data.price_jod),
    unit: data.unit,
    category: data.category,
    image_url: data.image_url,
    benefits_ar: (data.benefits_ar as string[]) ?? [],
    benefits_en: (data.benefits_en as string[]) ?? [],
    ingredients_ar: data.ingredients_ar,
    ingredients_en: data.ingredients_en,
    usage_ar: data.usage_ar,
    usage_en: data.usage_en,
    is_active: data.is_active,
  };

  return <ProductForm initial={value} mode="edit" />;
}
