import { useStageProgress, StageStatus } from "@/hooks/use-stage-progress";

const OPTIONS: { status: StageStatus; label: string; description: string; active: string; idle: string }[] = [
  {
    status: "studying",
    label: "Studying",
    description: "I am actively working with this stage",
    active: "border-amber-500/60 bg-amber-900/20 text-amber-400/90",
    idle: "border-white/8 bg-card/20 text-muted-foreground/50 hover:border-amber-700/30 hover:text-amber-400/60",
  },
  {
    status: "integrating",
    label: "Integrating",
    description: "I have practiced and am integrating it into life",
    active: "border-violet-500/50 bg-violet-900/20 text-violet-400/90",
    idle: "border-white/8 bg-card/20 text-muted-foreground/50 hover:border-violet-700/30 hover:text-violet-400/60",
  },
  {
    status: "complete",
    label: "Complete",
    description: "This stage has settled — I have moved through it",
    active: "border-emerald-500/50 bg-emerald-900/20 text-emerald-400/90",
    idle: "border-white/8 bg-card/20 text-muted-foreground/50 hover:border-emerald-700/30 hover:text-emerald-400/60",
  },
];

interface Props {
  stageNum: number;
}

export function StageStatusControl({ stageNum }: Props) {
  const { getStageStatus, setStageStatus } = useStageProgress();
  const current = getStageStatus(stageNum);

  const handleClick = (status: StageStatus) => {
    if (current === status) {
      setStageStatus(stageNum, "none");
    } else {
      setStageStatus(stageNum, status);
    }
  };

  return (
    <div className="border border-white/5 bg-card/20 p-6">
      <div className="text-primary/40 uppercase tracking-[0.2em] text-[10px] mb-4">
        Mark Your Relationship to This Stage
      </div>
      <div className="grid grid-cols-3 gap-3">
        {OPTIONS.map(({ status, label, description, active, idle }) => {
          const isActive = current === status;
          return (
            <button
              key={status}
              onClick={() => handleClick(status)}
              data-testid={`button-status-${status}`}
              className={`p-3 border text-center transition-all ${isActive ? active : idle}`}
            >
              <div className="text-xs font-medium uppercase tracking-wider mb-1">{label}</div>
              <div className="text-[10px] leading-tight opacity-70">{description}</div>
            </button>
          );
        })}
      </div>
      {current !== "none" && (
        <button
          onClick={() => setStageStatus(stageNum, "none")}
          className="mt-3 w-full text-center text-muted-foreground/30 text-[10px] uppercase tracking-widest hover:text-muted-foreground/50 transition-colors"
          data-testid="button-clear-stage-status"
        >
          Clear
        </button>
      )}
      <p className="text-muted-foreground/25 text-[10px] mt-4 leading-relaxed text-center italic font-serif">
        Saved locally in your browser. The tradition does not require you to track your path.
      </p>
    </div>
  );
}
