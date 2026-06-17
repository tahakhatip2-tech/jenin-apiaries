import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: ProductsAdmin,
});

function ProductsAdmin() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // If a child route is active (/admin/products/new or /admin/products/:id), render it instead
  if (pathname !== "/admin/products") return <Outlet />;
  return <ProductsList />;
}

function ProductsList() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const onDelete = async (id: string, name: string) => {
    if (!confirm(`حذف المنتج "${name}"؟`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["admin-stats"] });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold">المنتجات</h2>
          <p className="text-sm text-muted-foreground mt-1">{data?.length ?? 0} منتج</p>
        </div>
        <Button asChild className="bg-gradient-gold text-primary-foreground shadow-gold border-0">
          <Link to="/admin/products/new"><Plus className="w-4 h-4 me-2" /> منتج جديد</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-muted-foreground">جاري التحميل...</div>
      ) : !data || data.length === 0 ? (
        <div className="bg-card border border-border border-dashed rounded-2xl p-16 text-center">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">لا توجد منتجات بعد. ابدأ بإضافة منتجك الأول.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            {data.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-accent/50 transition">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name_ar} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Package className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{p.name_ar}</div>
                  <div className="text-xs text-muted-foreground truncate">{p.sku} • {p.category}</div>
                </div>
                <div className="text-sm font-semibold text-amber-deep shrink-0" dir="rtl">
                  {Number(p.price_jod).toFixed(2)} د.أ
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button asChild variant="ghost" size="icon">
                    <Link to="/admin/products/$id" params={{ id: p.id }}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(p.id, p.name_ar)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
