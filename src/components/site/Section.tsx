import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-14`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-xs font-semibold uppercase tracking-[0.2em] text-amber-deep mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-gold" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
