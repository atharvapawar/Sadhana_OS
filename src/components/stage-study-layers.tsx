import { Link } from "wouter";
import { useMemo, useState } from "react";
import { STAGES } from "@/data/stages";
import { STAGE_INTELLIGENCE } from "@/data/stage-intelligence";
import { STAGE_DEPTH_ASCENT } from "@/data/stage-depth-ascent";
import { STAGE_CROSS_LINKS } from "@/data/cross-linking";
import { glossaryHash } from "@/lib/slug";

type StageStudyLayersProps = {
  stageNum: number;
};

type StudyLayer = {
  id: string;
  label: string;
  title: string;
  purpose: string;
  readTarget: string;
  href: string;
  practice: string;
};

export function StageStudyLayers({ stageNum }: StageStudyLayersProps) {
  const [openLayer, setOpenLayer] = useState("quick-orientation");
  const stage = STAGES.find((item) => item.num === stageNum);
  const intelligence = STAGE_INTELLIGENCE[stageNum];
  const depthAscent = STAGE_DEPTH_ASCENT[stageNum];
  const crossLink = STAGE_CROSS_LINKS[stageNum];

  const layers = useMemo<StudyLayer[]>(() => {
    const stageTitle = stage ? `${String(stage.num).padStart(2, "0")} ${stage.title}` : "this stage";
    const nextStage = STAGES.find((item) => item.num === stageNum + 1);
    const firstGlossaryTerm = crossLink?.glossaryTerms?.[0] ?? depthAscent?.glossaryTerms?.[0];

    return [
      {
        id: "quick-orientation",
        label: "Layer 1",
        title: "Quick orientation",
        purpose: intelligence?.essence ?? `Understand the core signal of ${stageTitle}.`,
        readTarget: "Begin with the stage title, doctrine quote, and Stage Intelligence essence.",
        href: "#stage-intelligence",
        practice: "Ask: what is this stage correcting in my identity, habit, or attention today?",
      },
      {
        id: "sequence-logic",
        label: "Layer 2",
        title: "Sequence logic",
        purpose:
          depthAscent?.depth.whyThisComesHere ??
          "Understand why this stage appears here instead of being practiced randomly.",
        readTarget: "Study why this comes here, what happens if skipped, and the bridge to the next stage.",
        href: "#deep-stage-architecture",
        practice: nextStage
          ? `Notice how this stage prepares ${String(nextStage.num).padStart(2, "0")} ${nextStage.title}.`
          : "Notice how the final stage returns awareness into ordinary action.",
      },
      {
        id: "body-prana-map",
        label: "Layer 3",
        title: "Body-prana-inner science map",
        purpose:
          depthAscent?.ascentMatrix.healingMeaning ??
          "See how kosha, element, vayu, chakra language, and practice direction connect without forcing a rigid chart.",
        readTarget: "Open the Integrated Yogic Ascent Matrix and read it as a symbolic-practical support map.",
        href: "#integrated-yogic-ascent-matrix",
        practice: "Track what this stage stabilizes first: body, breath, senses, mind, identity, or action.",
      },
      {
        id: "safe-practice",
        label: "Layer 4",
        title: "Safe practice gate",
        purpose:
          intelligence?.beginnerSafePractice ??
          "Translate the stage into safe daily practice without jumping into teacher-only methods.",
        readTarget: "Read the beginner-safe practice, practice cards, advanced note, and safety note.",
        href: "#practice-safety-gate",
        practice: "Choose the simplest safe daily anchor before seeking intensity, power, or special experience.",
      },
      {
        id: "integration",
        label: "Layer 5",
        title: "Integration and cross-linking",
        purpose:
          crossLink?.integrationPrompt ??
          "Connect this stage back to Doctrine, Inner Science, Path & Practice, Glossary, and the wider river.",
        readTarget: "Use the cross-link cards and glossary bridges to place this stage inside the complete system.",
        href: firstGlossaryTerm ? `/glossary#${glossaryHash(firstGlossaryTerm)}` : "#cross-linking-intelligence",
        practice: "End by naming one real-life action where this stage can become visible today.",
      },
    ];
  }, [stage, stageNum, intelligence, depthAscent, crossLink]);

  return (
    <section
      id="guided-study-layers"
      className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 scroll-mt-28 min-w-0"
      aria-labelledby="guided-study-layers-heading"
    >
      <div className="rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/[0.08] via-card/30 to-background p-5 sm:p-7 safe-card min-w-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6 min-w-0">
          <div className="min-w-0">
            <p className="text-primary/60 uppercase tracking-[0.22em] text-[10px] font-semibold mb-3 safe-copy">
              Progressive Study Mode
            </p>
            <h2 id="guided-study-layers-heading" className="font-serif text-2xl sm:text-3xl text-foreground safe-title">
              Read this stage without getting overwhelmed.
            </h2>
          </div>
          <Link
            href="/practice#protected-zone"
            className="rounded-full border border-amber-500/25 bg-amber-900/10 px-4 py-2 text-[11px] uppercase tracking-widest text-amber-200 transition hover:border-amber-300/40 safe-copy safe-tap-target"
          >
            Safety first
          </Link>
        </div>

        <div className="space-y-3" role="list">
          {layers.map((layer) => {
            const panelId = `study-layer-panel-${stageNum}-${layer.id}`;
            const buttonId = `study-layer-button-${stageNum}-${layer.id}`;
            const isOpen = openLayer === layer.id;

            return (
              <div key={layer.id} className="rounded-2xl border border-white/10 bg-background/45 safe-card min-w-0" role="listitem">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenLayer(isOpen ? "" : layer.id)}
                  className="flex w-full flex-col gap-2 p-4 text-left transition hover:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between safe-tap-target"
                >
                  <span className="flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-4">
                    <span className="text-primary/55 uppercase tracking-widest text-[10px] font-semibold safe-copy">
                      {layer.label}
                    </span>
                    <span className="font-serif text-lg text-foreground/90 safe-title">{layer.title}</span>
                  </span>
                  <span className="text-primary/60 text-xs uppercase tracking-widest safe-copy">
                    {isOpen ? "Close" : "Open"}
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="border-t border-white/8 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 min-w-0"
                >
                  <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] min-w-0">
                    <div className="min-w-0">
                      <div className="text-primary/45 uppercase tracking-widest text-[10px] mb-2 font-semibold safe-copy">
                        Why this layer matters
                      </div>
                      <p className="text-sm sm:text-base text-foreground/75 leading-relaxed safe-copy">
                        {layer.purpose}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/[0.025] p-4 min-w-0">
                      <div className="text-primary/45 uppercase tracking-widest text-[10px] mb-2 font-semibold safe-copy">
                        What to read and do
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed safe-copy">{layer.readTarget}</p>
                      <p className="mt-3 text-sm text-foreground/75 leading-relaxed safe-copy">{layer.practice}</p>
                      <Link
                        href={layer.href}
                        className="mt-4 inline-flex rounded-full border border-primary/25 px-4 py-2 text-[11px] uppercase tracking-widest text-primary transition hover:bg-primary/5 safe-copy safe-tap-target"
                      >
                        Go to layer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
