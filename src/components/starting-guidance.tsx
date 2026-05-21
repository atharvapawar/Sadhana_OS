import { useMemo, useState } from "react";
import { Link } from "wouter";
import { START_GUIDANCE_PATHS, type SeekerSignal } from "@/data/start-guidance";

const defaultSignal: SeekerSignal = "new";

export function StartingGuidance() {
  const [selected, setSelected] = useState<SeekerSignal>(defaultSignal);
  const activePath = useMemo(
    () => START_GUIDANCE_PATHS.find((path) => path.id === selected) ?? START_GUIDANCE_PATHS[0],
    [selected],
  );

  return (
    <section className="px-4 py-16 sm:px-6" aria-labelledby="starting-guidance-title">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/[0.08] via-white/[0.025] to-secondary/[0.08] p-5 shadow-2xl shadow-black/25 sm:p-7 lg:p-9 safe-card">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.28em] text-primary/70 safe-copy">Where should I start?</p>
            <h2 id="starting-guidance-title" className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl safe-title">
              Choose by your current condition, not by spiritual curiosity.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base safe-copy">
              Sadhana OS routes the seeker by readiness. The right first step is the one that reduces confusion, stabilizes life, and protects the river from forced intensity.
            </p>

            <fieldset className="mt-7 space-y-3" aria-describedby="starting-guidance-help">
              <legend className="sr-only">Select your current starting point</legend>
              <p id="starting-guidance-help" className="text-xs uppercase tracking-[0.22em] text-muted-foreground safe-copy">
                Select one signal
              </p>
              <div className="grid gap-2" role="radiogroup" aria-label="Starting guidance options">
                {START_GUIDANCE_PATHS.map((path) => {
                  const checked = path.id === selected;
                  return (
                    <button
                      key={path.id}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      onClick={() => setSelected(path.id)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition-colors safe-tap-target safe-card ${
                        checked
                          ? "border-primary/60 bg-primary/10 text-foreground"
                          : "border-white/8 bg-background/35 text-muted-foreground hover:border-primary/35 hover:text-foreground"
                      }`}
                    >
                      <span className="block font-medium safe-copy">{path.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="min-w-0 rounded-[1.75rem] border border-white/8 bg-background/55 p-5 sm:p-6 safe-card" aria-live="polite">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.24em] text-primary/60 safe-copy">Recommended first movement</p>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-foreground safe-title">{activePath.startWith.title}</h3>
              </div>
              <Link
                href={activePath.startWith.href}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-primary/35 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10 safe-tap-target"
              >
                Begin here
              </Link>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground safe-copy">{activePath.signal}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-300 safe-copy">{activePath.startWith.reason}</p>
            {activePath.warning ? (
              <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-relaxed text-amber-100/85 safe-copy">
                {activePath.warning}
              </div>
            ) : null}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {activePath.nextSteps.map((step) => (
                <Link
                  key={step.href}
                  href={step.href}
                  className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 transition-colors hover:border-primary/35 hover:bg-primary/[0.04] safe-card safe-tap-target"
                >
                  <span className="block text-sm font-semibold text-foreground safe-copy">{step.title}</span>
                  <span className="mt-2 block text-xs leading-relaxed text-muted-foreground safe-copy">{step.reason}</span>
                </Link>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4 safe-card">
                <p className="text-xs uppercase tracking-[0.22em] text-primary/60 safe-copy">Avoid for now</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {activePath.avoid.map((item) => (
                    <li key={item} className="safe-copy">• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4 safe-card">
                <p className="text-xs uppercase tracking-[0.22em] text-primary/60 safe-copy">Daily anchor</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground safe-copy">{activePath.dailyAnchor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
