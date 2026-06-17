import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export function ChatWidget() {
  const { lang, dir } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={lang === "ar" ? "افتح المحادثة" : "Open chat"}
        className={cn(
          "fixed bottom-5 z-50 h-14 w-14 rounded-full shadow-gold flex items-center justify-center text-primary-foreground bg-gradient-gold transition-transform hover:scale-105 active:scale-95",
          "left-5",
        )}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {open && (
        <div
          className={cn(
            "fixed z-50 bg-card border border-border rounded-2xl shadow-elegant flex flex-col overflow-hidden",
            "bottom-24 w-[min(95vw,380px)] h-[min(75vh,560px)]",
            "left-5",
          )}
          dir={dir}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-gold text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <div className="font-display font-semibold text-sm leading-tight">
                  {lang === "ar" ? "نحلة — مساعدة مناحل جنين" : "Nahla — Jenin Apiaries Assistant"}
                </div>
                <div className="text-[11px] text-white/85">
                  {lang === "ar" ? "متصلة الآن • مستشارة العسل" : "Online • Honey advisor"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-md hover:bg-white/20 flex items-center justify-center"
              aria-label={lang === "ar" ? "إغلاق" : "Close"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <ChatPane lang={lang} dir={dir} />
        </div>
      )}
    </>
  );
}

function ChatPane({
  lang,
  dir,
}: {
  lang: "ar" | "en";
  dir: "rtl" | "ltr";
}) {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error } = useChat({
    transport,
    onError: (e) => console.error("[chat] error", e),
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  const isBusy = status === "submitted" || status === "streaming";

  const handleSubmit = async () => {
    const text = input.trim();
    if (!text || isBusy) return;
    setInput("");
    await sendMessage({ text });
  };

  const suggestions =
    lang === "ar"
      ? ["ما هي فوائد العسل الخام؟", "أحتاج علاج للمناعة", "احكيلي عن أسعار الخلطات"]
      : ["What are raw honey benefits?", "I need an immunity therapy", "Tell me blends prices"];

  return (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        {messages.length === 0 && (
          <div className="text-center py-6">
            <div className="text-sm text-muted-foreground mb-4">
              {lang === "ar"
                ? "مرحباً بك في مناحل جنين 🍯 كيف يمكنني مساعدتك اليوم؟"
                : "Welcome to Jenin Apiaries 🍯 How can I help you today?"}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage({ text: s })}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-accent transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => {
          const text = m.parts
            .map((p) => (p.type === "text" ? p.text : ""))
            .join("");
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  isUser
                    ? "bg-gradient-gold text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm",
                )}
              >
                {isUser ? (
                  <div className="whitespace-pre-wrap">{text}</div>
                ) : (
                  <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1">
                    <ReactMarkdown>{text || "…"}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm text-muted-foreground">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-deep animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-deep animate-bounce [animation-delay:120ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-deep animate-bounce [animation-delay:240ms]" />
              </span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-xs text-destructive text-center">
            {lang === "ar" ? "حدث خطأ، حاول مرة أخرى." : "Something went wrong, please retry."}
          </div>
        )}
      </div>

      <div className="border-t border-border p-3 bg-card rounded-b-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit();
          }}
          className="relative flex items-center bg-muted rounded-full overflow-hidden border border-border focus-within:ring-1 focus-within:ring-amber-500/50 transition-all shadow-sm"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === "ar" ? "اكتب رسالتك..." : "Type your message..."}
            className="flex-1 bg-transparent border-0 px-4 py-3 text-sm focus:outline-none focus:ring-0 placeholder:text-muted-foreground/70"
            dir={dir}
          />
          <div className="px-2">
            <button
              type="submit"
              disabled={!input.trim() || isBusy}
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                input.trim() && !isBusy
                  ? "bg-gradient-gold text-primary-foreground shadow-sm hover:scale-105"
                  : "bg-background/50 text-muted-foreground cursor-not-allowed"
              )}
            >
              {isBusy ? (
                <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              ) : (
                <Send className={cn("w-4 h-4", dir === "rtl" && "rotate-180")} />
              )}
            </button>
          </div>
        </form>
        <div className="text-[10px] text-muted-foreground text-center mt-2 pb-1">
          {lang === "ar"
            ? "للطلب أو الحجز السريع زر صفحة المنتجات"
            : "For fast orders visit the Products page"}
        </div>
      </div>
    </>
  );
}

export default ChatWidget;
