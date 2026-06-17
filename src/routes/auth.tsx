import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Hexagon, Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [{ title: "تسجيل الدخول — لوحة التحكم | Shaqfa Admin" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [bootstrapped, setBootstrapped] = useState(false);

  // Ensure default admin user exists once on mount
  useEffect(() => {
    fetch("/api/public/bootstrap-admin", { method: "POST" })
      .then(() => setBootstrapped(true))
      .catch(() => setBootstrapped(true));
  }, []);

  // If already signed in, jump to admin
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("تم تسجيل الدخول بنجاح");
    navigate({ to: "/admin" });
  };

  const onGoogle = async () => {
    setLoading(true);
    const result = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/admin",
      },
    });
    if (result.error) {
      toast.error("فشل تسجيل الدخول عبر Google");
      setLoading(false);
      return;
    }
    // Supabase will handle redirect
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft honeycomb-pattern px-4 py-12">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-elegant p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold mb-4">
            <Hexagon className="w-7 h-7 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-2xl font-semibold">لوحة التحكم</h1>
          <p className="text-sm text-muted-foreground mt-1">سجّل الدخول للوصول إلى إدارة الموقع</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">البريد الإلكتروني</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
              className="h-12"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">كلمة المرور</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              dir="ltr"
              className="h-12"
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !bootstrapped}
            size="lg"
            className="w-full bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold border-0 h-12"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "دخول"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">أو</span></div>
        </div>

        <Button onClick={onGoogle} disabled={loading} variant="outline" size="lg" className="w-full h-12">
          <svg className="w-5 h-5 me-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          متابعة عبر Google
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-6">
          <Link to="/" className="hover:text-foreground">← العودة إلى الموقع</Link>
        </p>
      </div>
    </div>
  );
}
