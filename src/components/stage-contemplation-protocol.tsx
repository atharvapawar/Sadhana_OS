import { useMemo, useRef, useState, KeyboardEvent } from "react";
import { STAGE_CONTEMPLATION } from "@/data/stage-contemplation";

type StageContemplationProtocolProps = {
  stageNum: number;
};

type TabId = "observe" | "release" | "integrate";

type TabItem = {
  id: TabId;
  eyebrow: string;
  title: string;
  body: string;
};

const TAB_ORDER: TabId[] = ["observe", "release", "integrate"];

export function StageContemplationProtocol({ stageNum }: StageContemplationProtocolProps) {
  const protocol = STAGE_CONTEMPLATION[stageNum];
  const [activeTab, setActiveTab] = useState<TabId>("observe");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ observe: null, release: null, integrate: null });

  const tabs = useMemo<TabItem[]>(() => {
    if (!protocol) return [];
    return [
      {
        id: "observe",
        eyebrow: "Step 1",
        title: "Observe without forcing",
        body: protocol.observe,
      },
      {
        id: "release",
        eyebrow: "Step 2",
        title: "Release the old movement",
        body: protocol.release,
      },
      {
        id: "integrate",
        eyebrow: "Step 3",
        title: "Integrate through action",
        body: protocol.integrate,
      },
    ];
  }, [protocol]);

  if (!protocol) return null;

  const activePanel = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  const focusTab = (id: TabId) => {
    setActiveTab(id);
    window.requestAnimationFrame(() => tabRefs.current[id]?.focus());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (currentIndex === -1) return;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusTab(TAB_ORDER[(currentIndex + 1) % TAB_ORDER.length]);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusTab(TAB_ORDER[(currentIndex - 1 + TAB_ORDER.length) % TAB_ORDER.length]);
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTab(TAB_ORDER[0]);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTab(TAB_ORDER[TAB_ORDER.length - 1]);
    }
  };

  const panelId = `stage-contemplation-panel-${stageNum}-${activePanel.id}`;

  return (
    <section
      id="contemplation-protocol"
      className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 scroll-mt-28 min-w-0"
      aria-labelledby="contemplation-protocol-heading"
    >
      <div className="rounded-[2rem] border border-primary/15 bg-gradient-to-br from-background via-card/25 to-primary/[0.06] p-5 sm:p-7 safe-card min-w-0">
        <div className="mb-6 min-w-0">
          <p className="text-primary/60 uppercase tracking-[0.22em] text-[10px] font-semibold mb-3 safe-copy">
            Contemplation Protocol
          </p>
          <h2 id="contemplation-protocol-heading" className="font-serif text-2xl sm:text-3xl text-foreground safe-title">
            Observe, release, then integrate.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed safe-copy">
            Use this as a gentle reflection rhythm. It is not a diagnosis, therapy replacement, or advanced practice instruction.
          </p>
        </div>

        <div
          role="tablist"
          aria-label={`Stage ${stageNum} contemplation steps`}
          className="grid grid-cols-1 gap-2 sm:grid-cols-3 min-w-0"
        >
          {tabs.map((tab) => {
            const selected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[tab.id] = node;
                }}
                type="button"
                id={`stage-contemplation-tab-${stageNum}-${tab.id}`}
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={handleKeyDown}
                className={`rounded-2xl border p-4 text-left transition safe-tap-target min-w-0 ${
                  selected
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-white/10 bg-white/[0.025] text-muted-foreground hover:border-primary/25 hover:text-foreground"
                }`}
              >
                <span className="block text-[10px] uppercase tracking-widest text-primary/55 font-semibold safe-copy">
                  {tab.eyebrow}
                </span>
                <span className="mt-2 block font-serif text-base sm:text-lg safe-title">{tab.title}</span>
              </button>
            );
          })}
        </div>

        <div
          id={panelId}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`stage-contemplation-tab-${stageNum}-${activePanel.id}`}
          className="mt-4 rounded-2xl border border-white/10 bg-background/55 p-5 sm:p-6 min-w-0"
        >
          <div className="text-primary/55 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
            {activePanel.eyebrow} · {activePanel.title}
          </div>
          <p className="font-serif text-lg sm:text-xl text-foreground/85 leading-relaxed safe-copy">
            {activePanel.body}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 min-w-0">
            <div className="text-primary/50 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
              Daily micro-practice
            </div>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed safe-copy">
              {protocol.dailyMicroPractice}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-600/25 bg-amber-900/10 p-5 min-w-0">
            <div className="text-amber-300/70 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
              Safety reminder
            </div>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed safe-copy">
              {protocol.safetyReminder}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-primary/15 bg-primary/[0.055] p-5 min-w-0">
          <div className="text-primary/60 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
            Journal prompt
          </div>
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed safe-copy">
            {protocol.journalPrompt}
          </p>
        </div>
      </div>
    </section>
  );
}
