// One-time idempotent endpoint that ensures the default admin user exists.
// Safe to call from the public /auth page on mount.
import { createFileRoute } from "@tanstack/react-router";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin@12345";

export const Route = createFileRoute("/api/public/bootstrap-admin")({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Find user by email via the Auth Admin API
        const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers({
          page: 1,
          perPage: 200,
        });
        if (listErr) {
          return Response.json({ error: listErr.message }, { status: 500 });
        }

        let user = list.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);

        if (!user) {
          const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            email_confirm: true,
          });
          if (createErr || !created.user) {
            return Response.json({ error: createErr?.message ?? "create failed" }, { status: 500 });
          }
          user = created.user;
        }

        // Ensure admin role exists
        const { error: roleErr } = await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: user.id, role: "admin" }, { onConflict: "user_id,role" });
        if (roleErr) {
          return Response.json({ error: roleErr.message }, { status: 500 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
