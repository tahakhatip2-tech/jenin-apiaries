import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MailOpen, Mail, Trash2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const toggleRead = async (id: string, current: boolean) => {
    const { error } = await supabase.from("contact_messages").update({ is_read: !current }).eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-messages"] });
    qc.invalidateQueries({ queryKey: ["admin-stats"] });
  };

  const remove = async (id: string) => {
    if (!confirm("حذف الرسالة؟")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    qc.invalidateQueries({ queryKey: ["admin-messages"] });
    qc.invalidateQueries({ queryKey: ["admin-stats"] });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="font-display text-2xl font-semibold">الرسائل الواردة</h2>

      {isLoading ? (
        <div className="text-center py-20 text-muted-foreground">جاري التحميل...</div>
      ) : !data || data.length === 0 ? (
        <div className="bg-card border border-border border-dashed rounded-2xl p-16 text-center">
          <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">لا توجد رسائل بعد</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((m) => (
            <div
              key={m.id}
              className={`bg-card border rounded-2xl p-5 ${m.is_read ? "border-border" : "border-amber-500/50 shadow-gold"}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {!m.is_read && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                    {m.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {m.email && <span dir="ltr">{m.email}</span>}
                    {m.phone && <span dir="ltr"> • {m.phone}</span>}
                    {" • "}
                    {new Date(m.created_at).toLocaleString("ar-JO")}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => toggleRead(m.id, m.is_read)} title={m.is_read ? "تعليم كغير مقروءة" : "تعليم كمقروءة"}>
                    {m.is_read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(m.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
