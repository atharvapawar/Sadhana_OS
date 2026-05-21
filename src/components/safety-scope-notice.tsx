import { SAFETY_SCOPE_POINTS, SAFETY_SCOPE_RED_FLAGS, SAFETY_SCOPE_SHORT } from "@/data/safety-scope";

type SafetyScopeNoticeProps = {
  variant?: "compact" | "full";
  id?: string;
};

export function SafetyScopeNotice({ variant = "compact", id = "safety-scope" }: SafetyScopeNoticeProps) {
  if (variant === "full") {
    return (
      <section id={id} className="scroll-mt-28 rounded-[1.75rem] border border-amber-300/15 bg-amber-300/[0.045] p-5 sm:p-7 md:p-8 safe-card">
        <div className="mb-6 min-w-0">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-300/75 safe-copy">
            Safety & Scope
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground safe-title">
            Deep knowledge, clear boundaries.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground safe-copy">
            {SAFETY_SCOPE_SHORT}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 min-w-0">
          {SAFETY_SCOPE_POINTS.map((point) => (
            <article key={point.title} className="rounded-[1.25rem] border border-white/8 bg-black/15 p-4 min-w-0 safe-card">
              <h3 className="mb-2 font-serif text-lg text-foreground safe-title">{point.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground safe-copy">{point.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-destructive/20 bg-destructive/[0.035] p-4 min-w-0 safe-card">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-destructive/85 safe-copy">
            Stop signs and red flags
          </h3>
          <ul className="space-y-3 min-w-0">
            {SAFETY_SCOPE_RED_FLAGS.map((flag) => (
              <li key={flag} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground safe-copy min-w-0">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/75" />
                <span className="min-w-0">{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <aside id={id} className="mx-auto mt-8 max-w-6xl rounded-[1.5rem] border border-amber-300/10 bg-amber-300/[0.035] p-4 sm:p-5 text-left safe-card">
      <details className="group min-w-0">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300/75 safe-copy">
          <span>Safety & Scope</span>
          <span className="text-lg leading-none text-amber-300/60 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
        </summary>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground safe-copy">
          <p>{SAFETY_SCOPE_SHORT}</p>
          <p>
            If practice creates pain, breath distress, panic, dissociation, destabilization, or loss of ordinary functioning, stop and seek qualified support. Do not delay medical or mental-health care because of this site.
          </p>
        </div>
      </details>
    </aside>
  );
}
