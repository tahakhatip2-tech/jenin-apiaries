import { createFileRoute, Outlet, Link, useNavigate, useRouterState, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, MessageSquare, Settings, LogOut, Hexagon, Menu, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw redirect({ to: "/auth" });
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roles) throw redirect({ to: "/auth" });
  },
  component: AdminLayout,
});

const NAV: { to: "/admin" | "/admin/products" | "/admin/messages" | "/admin/settings"; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "نظرة عامة", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "المنتجات", icon: Package },
  { to: "/admin/messages", label: "الرسائل", icon: MessageSquare },
  { to: "/admin/settings", label: "الإعدادات", icon: Settings },
];

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  // Hide site chrome on admin pages
  useEffect(() => {
    document.body.classList.add("admin-mode");
    return () => document.body.classList.remove("admin-mode");
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج");
    navigate({ to: "/auth" });
  };

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="fixed inset-0 z-[100] bg-background flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`${open ? "translate-x-0" : "translate-x-full md:translate-x-0"} fixed md:static inset-y-0 right-0 z-50 w-72 bg-card border-l border-border transition-transform flex flex-col`}>
        <div className="h-20 flex items-center gap-3 px-6 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
            <Hexagon className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display font-semibold">شقفا</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">لوحة التحكم</div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                isActive(item.to, item.exact)
                  ? "bg-gradient-gold text-primary-foreground shadow-gold"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-foreground py-2">
            ← عرض الموقع
          </Link>
          <Button onClick={signOut} variant="outline" className="w-full">
            <LogOut className="w-4 h-4 me-2" /> تسجيل الخروج
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 md:h-20 border-b border-border bg-card/50 backdrop-blur px-4 md:px-8 flex items-center justify-between">
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-accent">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="font-display text-lg md:text-xl font-semibold">
            {NAV.find((n) => isActive(n.to, n.exact))?.label ?? "لوحة التحكم"}
          </h1>
          <div className="w-9" />
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
