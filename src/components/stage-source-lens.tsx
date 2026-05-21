import { SOURCE_STREAMS, STAGE_SOURCE_LENS } from "@/data/tradition-source-map";

export function StageSourceLens({ stageNum }: { stageNum: number }) {
  const lens = STAGE_SOURCE_LENS[stageNum];
  if (!lens) return null;

  const streams = lens.primaryStreams.map((key) => SOURCE_STREAMS[key]);

  return (
    <section id="traditional-source-lens" className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 scroll-mt-28 min-w-0">
      <div className="flex items-center gap-4 mb-6 min-w-0">
        <h2 className="text-primary/60 uppercase tracking-[0.16em] sm:tracking-[0.2em] text-xs font-semibold safe-copy">
          Traditional Source Lens
        </h2>
        <div className="flex-1 h-[1px] bg-white/5" />
      </div>

      <div className="rounded-3xl border border-primary/15 bg-primary/5 p-5 sm:p-6 safe-card min-w-0">
        <div className="text-primary/60 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
          Source Logic
        </div>
        <p className="font-serif text-lg sm:text-xl text-foreground/85 leading-relaxed safe-copy">
          {lens.sourceLogic}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
        {streams.map((stream) => (
          <div key={stream.key} className="rounded-2xl border border-white/10 bg-card/25 p-5 safe-card min-w-0">
            <div className="text-primary/55 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
              {stream.label}
            </div>
            <p className="text-sm text-foreground/75 leading-relaxed safe-copy">{stream.role}</p>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed safe-copy">{stream.guardrail}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
        <SourceNote label="Integration Rule" value={lens.integrationRule} />
        <SourceNote label="Guardrail" value={lens.guardrail} />
        <SourceNote label="Not a Claim" value={lens.notAClaim} />
      </div>
    </section>
  );
}

function SourceNote({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 safe-card min-w-0">
      <div className="text-primary/45 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">{label}</div>
      <p className="text-sm text-foreground/75 leading-relaxed safe-copy">{value}</p>
    </div>
  );
}
