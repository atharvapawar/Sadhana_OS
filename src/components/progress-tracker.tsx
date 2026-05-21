import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useStageProgress, StageStatus } from "@/hooks/use-stage-progress";
import { STAGES } from "@/data/stages";

const STATUS_CONFIG: Record<StageStatus, { label: string; color: string; dot: string }> = {
  none: { label: "Not begun", color: "text-muted-foreground/40", dot: "bg-white/10" },
  studying: { label: "Studying", color: "text-amber-400/80", dot: "bg-amber-500/70" },
  integrating: { label: "Integrating", color: "text-violet-400/80", dot: "bg-violet-500/70" },
  complete: { label: "Complete", color: "text-emerald-400/80", dot: "bg-emerald-500/70" },
};

export function ProgressTracker() {
  const [open, setOpen] = useState(false);
  const { progress, summary, clearAll } = useStageProgress();

  const activePct = Math.round(((summary.studying + summary.integrating + summary.complete) / 18) * 100);

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        data-testid="button-progress-tracker"
        className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 px-4 py-3 bg-background/90 backdrop-blur-md border border-primary/25 hover:border-primary/50 transition-all shadow-xl shadow-black/40"
        aria-label="Open progress tracker"
      >
        {/* Mini arc indicators */}
        <div className="flex gap-1 items-center">
          {[...Array(18)].map((_, i) => {
            const status = progress[i + 1] ?? "none";
            return (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${STATUS_CONFIG[status].dot}`}
              />
            );
          })}
        </div>
        <div className="text-primary/70 font-serif text-sm tracking-wide">
          {activePct > 0 ? `${activePct}%` : "My Path"}
        </div>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 48 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-background border-l border-white/8 overflow-y-auto flex flex-col"
              data-testid="panel-progress-tracker"
            >
              {/* Header */}
              <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-white/5 px-6 py-5 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg text-foreground">My Sadhana Path</h2>
                  <p className="text-muted-foreground/50 text-xs uppercase tracking-widest mt-0.5">
                    {summary.touched} of 18 stages marked
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground/40 hover:text-muted-foreground transition-colors text-xl leading-none"
                  aria-label="Close progress tracker"
                >
                  ×
                </button>
              </div>

              {/* Summary pills */}
              <div className="px-6 pt-4 pb-2 grid grid-cols-3 gap-2">
                {(["studying", "integrating", "complete"] as StageStatus[]).map((status) => (
                  <div key={status} className="text-center p-2 border border-white/5 bg-card/30">
                    <div className={`text-lg font-serif ${STATUS_CONFIG[status].color}`}>
                      {summary[status as keyof typeof summary]}
                    </div>
                    <div className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
                      {STATUS_CONFIG[status].label}
                    </div>
                  </div>
                ))}
              </div>

              {/* River progress bar */}
              <div className="px-6 py-4">
                <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${activePct}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
                <div className="text-muted-foreground/30 text-[10px] uppercase tracking-widest mt-1 text-right">
                  {activePct}% of the river
                </div>
              </div>

              {/* Stage list */}
              <div className="flex-1 px-4 pb-6 space-y-1">
                {STAGES.map((stage) => {
                  const status = progress[stage.num] ?? "none";
                  const cfg = STATUS_CONFIG[status];
                  return (
                    <Link
                      key={stage.num}
                      href={`/stage/${stage.num}`}
                      onClick={() => setOpen(false)}
                      data-testid={`tracker-stage-${stage.num}`}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/3 transition-colors group rounded-sm"
                    >
                      {/* Status dot */}
                      <div className={`shrink-0 w-2 h-2 rounded-full ${cfg.dot}`} />
                      {/* Stage number */}
                      <div className="shrink-0 w-5 text-right text-muted-foreground/30 text-xs font-mono">
                        {stage.num}
                      </div>
                      {/* Stage title */}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors truncate font-serif">
                          {stage.title}
                        </div>
                        <div className="text-[10px] text-muted-foreground/30 truncate">
                          {stage.sanskrit}
                        </div>
                      </div>
                      {/* Status label */}
                      {status !== "none" && (
                        <div className={`shrink-0 text-[9px] uppercase tracking-wider ${cfg.color}`}>
                          {cfg.label}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-white/5 px-6 py-4 flex items-center justify-between">
                <p className="text-muted-foreground/30 text-[10px] italic font-serif leading-tight max-w-[140px]">
                  The river does not track itself.
                </p>
                {summary.touched > 0 && (
                  <button
                    onClick={() => { clearAll(); }}
                    className="text-muted-foreground/30 text-[10px] uppercase tracking-widest hover:text-muted-foreground/60 transition-colors"
                    data-testid="button-clear-progress"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
