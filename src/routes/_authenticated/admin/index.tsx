import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, MessageSquare, MailOpen, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [products, allMsg, unread] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
      ]);
      return {
        products: products.count ?? 0,
        messages: allMsg.count ?? 0,
        unread: unread.count ?? 0,
      };
    },
  });

  const cards = [
    { label: "المنتجات", value: stats?.products ?? "—", icon: Package, to: "/admin/products", color: "from-amber-400 to-amber-600" },
    { label: "إجمالي الرسائل", value: stats?.messages ?? "—", icon: MessageSquare, to: "/admin/messages", color: "from-emerald-400 to-emerald-600" },
    { label: "رسائل غير مقروءة", value: stats?.unread ?? "—", icon: MailOpen, to: "/admin/messages", color: "from-rose-400 to-rose-600" },
    { label: "النشاط", value: "نشط", icon: TrendingUp, to: "/admin", color: "from-sky-400 to-sky-600" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="font-display text-3xl font-semibold">مرحباً بك 👋</h2>
        <p className="text-muted-foreground mt-1">إدارة منتجات شقفا والرسائل والإعدادات من مكان واحد.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
              <c.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-display font-semibold">{c.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-8">
        <h3 className="font-display text-xl font-semibold mb-4">إجراءات سريعة</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <Link to="/admin/products/new" className="px-4 py-3 rounded-xl bg-gradient-gold text-primary-foreground shadow-gold text-center font-medium">
            + إضافة منتج جديد
          </Link>
          <Link to="/admin/messages" className="px-4 py-3 rounded-xl border border-border hover:bg-accent text-center font-medium">
            عرض الرسائل
          </Link>
          <Link to="/admin/settings" className="px-4 py-3 rounded-xl border border-border hover:bg-accent text-center font-medium">
            تعديل الإعدادات
          </Link>
        </div>
      </div>
    </div>
  );
}
