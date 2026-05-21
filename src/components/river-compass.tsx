import { Link } from "wouter";

const compassLinks = [
  {
    label: "See the whole river",
    href: "/roadmap",
    note: "18 stages in five arcs",
  },
  {
    label: "Understand the instrument",
    href: "/inner-science",
    note: "body, prana, mind, witness",
  },
  {
    label: "Practice safely",
    href: "/practice",
    note: "readiness lanes and gates",
  },
  {
    label: "Clarify a term",
    href: "/glossary",
    note: "relationships, not isolated words",
  },
];

export function RiverCompass({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "w-full" : "px-4 py-16 sm:px-6"} aria-labelledby="river-compass-title">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/8 bg-white/[0.025] p-5 shadow-2xl shadow-black/20 sm:p-7 safe-card">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.26em] text-primary/60 safe-copy">Start without confusion</p>
            <h2 id="river-compass-title" className="mt-3 font-serif text-2xl leading-tight text-foreground sm:text-3xl safe-title">
              Choose the right chamber for your next step.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground safe-copy">
              Every path returns to the same river: seeing clearly, refining the instrument, practicing safely, and living awareness in action.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 min-w-0">
            {compassLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-white/8 bg-background/40 p-4 transition-colors hover:border-primary/35 hover:bg-primary/[0.04] safe-card safe-tap-target"
              >
                <span className="block text-sm font-semibold text-foreground transition-colors group-hover:text-primary safe-copy">{item.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground safe-copy">{item.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
