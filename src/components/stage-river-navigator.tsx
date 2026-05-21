import { Link } from "wouter";
import { STAGES } from "@/data/stages";

type StageRiverNavigatorProps = {
  stageNum: number;
};

const SECTION_JUMPS = [
  { href: "#guided-study-layers", label: "Study" },
  { href: "#contemplation-protocol", label: "Reflect" },
  { href: "#integrated-yogic-ascent-matrix", label: "Ascent" },
  { href: "#cross-linking-intelligence", label: "Links" },
  { href: "#practice-safety-gate", label: "Practice" },
];

export function StageRiverNavigator({ stageNum }: StageRiverNavigatorProps) {
  const stage = STAGES.find((item) => item.num === stageNum);
  if (!stage) return null;

  const previous = STAGES.find((item) => item.num === stageNum - 1);
  const next = STAGES.find((item) => item.num === stageNum + 1);
  const arcStages = STAGES.filter((item) => item.arc === stage.arc);
  const progressPercent = Math.round((stageNum / STAGES.length) * 100);

  return (
    <section
      id="river-stage-navigator"
      className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 scroll-mt-28 min-w-0"
      aria-labelledby="river-stage-navigator-heading"
    >
      <div className="rounded-[2rem] border border-primary/15 bg-gradient-to-br from-card/35 via-background to-primary/[0.055] p-5 sm:p-7 safe-card min-w-0">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between min-w-0">
          <div className="min-w-0">
            <p className="text-primary/60 uppercase tracking-[0.22em] text-[10px] font-semibold mb-3 safe-copy">
              River Stage Navigator
            </p>
            <h2 id="river-stage-navigator-heading" className="font-serif text-2xl sm:text-3xl text-foreground safe-title">
              Know where you are in the river.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed safe-copy">
              This stage belongs to {stage.arc}. Move gently through the previous stage, the present work, and the next bridge without losing the whole sequence.
            </p>
          </div>

          <div className="w-full lg:w-56 rounded-2xl border border-white/10 bg-white/[0.025] p-4 min-w-0" aria-label="Overall stage progress">
            <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-widest text-primary/55 font-semibold safe-copy">
              <span>Stage {stage.num}/18</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div className="h-full rounded-full bg-primary/70" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 min-w-0" aria-label="Previous current and next stages">
          <StageBridgeCard eyebrow="Previous" stage={previous} fallback="This is the opening stage." />
          <StageBridgeCard eyebrow="Current" stage={stage} isCurrent />
          <StageBridgeCard eyebrow="Next" stage={next} fallback="This stage completes the river into life." />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-background/45 p-4 sm:p-5 min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 min-w-0">
            <div className="min-w-0">
              <div className="text-primary/55 uppercase tracking-widest text-[10px] font-semibold safe-copy">Arc companions</div>
              <p className="mt-1 text-sm text-muted-foreground safe-copy">Stages in the same movement of the river.</p>
            </div>
            <Link
              href="/roadmap"
              className="rounded-full border border-primary/25 px-4 py-2 text-[11px] uppercase tracking-widest text-primary transition hover:bg-primary/5 safe-copy safe-tap-target self-start"
            >
              Full roadmap
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 min-w-0">
            {arcStages.map((item) => {
              const active = item.num === stage.num;
              return (
                <Link
                  key={item.num}
                  href={`/stage/${item.num}`}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl border px-3 py-3 text-left transition safe-card safe-tap-target min-w-0 ${
                    active
                      ? "border-primary/45 bg-primary/10 text-foreground"
                      : "border-white/10 bg-white/[0.025] text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  <span className="block text-[10px] uppercase tracking-widest text-primary/55 safe-copy">
                    {String(item.num).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-serif text-sm safe-title">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <nav className="mt-6 flex flex-wrap gap-2 min-w-0" aria-label="Stage detail sections">
          {SECTION_JUMPS.map((jump) => (
            <a
              key={jump.href}
              href={jump.href}
              className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-[11px] uppercase tracking-widest text-muted-foreground transition hover:border-primary/30 hover:text-primary safe-copy safe-tap-target"
            >
              {jump.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

type StageBridgeCardProps = {
  eyebrow: string;
  stage?: (typeof STAGES)[number];
  fallback?: string;
  isCurrent?: boolean;
};

function StageBridgeCard({ eyebrow, stage, fallback, isCurrent = false }: StageBridgeCardProps) {
  if (!stage) {
    return (
      <div className="rounded-2xl border border-white/8 bg-white/[0.015] p-4 sm:p-5 safe-card min-w-0">
        <div className="text-primary/45 uppercase tracking-widest text-[10px] mb-2 font-semibold safe-copy">{eyebrow}</div>
        <p className="text-sm text-muted-foreground leading-relaxed safe-copy">{fallback}</p>
      </div>
    );
  }

  const content = (
    <>
      <div className="text-primary/45 uppercase tracking-widest text-[10px] mb-2 font-semibold safe-copy">{eyebrow}</div>
      <div className="flex items-start gap-3 min-w-0">
        <span className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] text-primary safe-copy">
          {String(stage.num).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="font-serif text-lg text-foreground/90 safe-title">{stage.title}</h3>
          <p className="text-primary/55 text-sm italic safe-copy">{stage.sanskrit}</p>
        </div>
      </div>
    </>
  );

  if (isCurrent) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/[0.075] p-4 sm:p-5 safe-card min-w-0" aria-current="step">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/stage/${stage.num}`}
      className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5 transition hover:border-primary/30 hover:bg-primary/[0.04] safe-card min-w-0"
    >
      {content}
    </Link>
  );
}
