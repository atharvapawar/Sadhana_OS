import { motion } from "framer-motion";
import {
  DAILY_RHYTHM,
  PRACTICE_LANES,
  PROTECTED_PRACTICES,
  SAFETY_GATES,
} from "@/data/practice-safety";
import { SafetyScopeNotice } from "@/components/safety-scope-notice";

const laneTone: Record<string, string> = {
  beginner: "border-white/5 bg-card/30",
  steady: "border-primary/20 bg-card/40",
  "teacher-guided": "teacher-guided-border bg-primary/5",
  "do-not-diy": "border-destructive/30 bg-destructive/5",
};

export default function Practice() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-24 text-center max-w-3xl mx-auto"
        >
          <div className="text-primary/60 uppercase tracking-[0.16em] sm:tracking-[0.2em] text-xs sm:text-sm mb-6 safe-copy">
            Sadhana Marga & Daily Abhyasa
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight safe-title">
            Path & Practice
          </h1>
          <div className="w-24 h-[1px] bg-primary/40 mx-auto mb-8" />
          <p className="text-lg sm:text-xl text-muted-foreground font-serif leading-relaxed safe-copy">
            Safe daily practice guidance for different readiness levels. Sadhana OS maps the territory; the teacher holds the fire.
          </p>
        </motion.div>

        <section className="mb-16 sm:mb-24">
          <SafetyScopeNotice variant="full" id="practice-safety-scope" />
        </section>

        <section className="mb-16 sm:mb-24">
          <SectionHeading eyebrow="Practice Lanes" title="Choose the correct depth, not the most dramatic method" />
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 min-w-0">
            {PRACTICE_LANES.map((lane, index) => (
              <motion.article
                key={lane.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.06 }}
                className={`p-5 sm:p-6 border flex flex-col min-w-0 safe-card ${laneTone[lane.id]}`}
              >
                <div className="flex items-start justify-between gap-3 mb-4 min-w-0">
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-primary/80 mb-2 safe-copy">
                      {lane.label}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif text-foreground safe-title">
                      {lane.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-primary/70 uppercase tracking-wider mb-3 safe-copy">
                  {lane.readiness}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 safe-copy">
                  {lane.purpose}
                </p>

                <div className="space-y-5 flex-1 min-w-0">
                  <PracticeList title="Safe focus" items={lane.safeFocus} tone="text-primary" />
                  <PracticeList title="Avoid" items={lane.avoid} tone="text-destructive/80" />
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 text-xs text-foreground/65 italic leading-relaxed safe-copy">
                  {lane.nextGate}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-16 sm:mb-24">
          <SectionHeading eyebrow="Daily Rhythm" title="A simple day that keeps the river clean" />
          <div className="grid lg:grid-cols-3 gap-5 min-w-0">
            {DAILY_RHYTHM.map((block, index) => (
              <motion.article
                key={block.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.06 }}
                className="p-5 sm:p-6 border border-white/5 bg-card/30 min-w-0 safe-card"
              >
                <div className="text-xs uppercase tracking-widest text-primary/70 mb-3 safe-copy">{block.period}</div>
                <p className="font-serif text-lg text-foreground mb-5 leading-relaxed safe-copy">{block.intention}</p>
                <PracticeList title="Practice" items={block.practices} tone="text-primary" />
                <div className="mt-5 pt-5 border-t border-white/10 text-xs text-foreground/60 italic leading-relaxed safe-copy">
                  {block.safety}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-16 sm:mb-24">
          <SectionHeading eyebrow="Safety Gates" title="Advance only when the instrument becomes steadier" />
          <div className="grid lg:grid-cols-3 gap-5 min-w-0">
            {SAFETY_GATES.map((gate, index) => (
              <motion.article
                key={gate.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.06 }}
                className="p-5 sm:p-6 border border-primary/15 bg-primary/5 min-w-0 safe-card"
              >
                <h3 className="font-serif text-2xl text-foreground mb-3 safe-title">{gate.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 safe-copy">{gate.principle}</p>
                <SignalList label="Green" items={gate.green} className="border-primary/20 text-primary/80" />
                <SignalList label="Yellow" items={gate.yellow} className="border-amber-400/20 text-amber-300/80" />
                <SignalList label="Red" items={gate.red} className="border-destructive/25 text-destructive/85" />
              </motion.article>
            ))}
          </div>
        </section>

        <section id="protected-zone" className="mb-16 sm:mb-24 scroll-mt-28">
          <SectionHeading eyebrow="Protected Practices" title="Visible as knowledge, protected as practice" />
          <div className="grid md:grid-cols-2 gap-5 min-w-0">
            {PROTECTED_PRACTICES.map((practice, index) => (
              <motion.article
                key={practice.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.05 }}
                className="p-5 sm:p-6 border border-destructive/20 bg-destructive/[0.03] min-w-0 safe-card"
              >
                <div className="text-[10px] uppercase tracking-widest text-destructive/80 mb-3 safe-copy">
                  {practice.lane === "do-not-diy" ? "Do Not DIY" : "Teacher-Guided"}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-4 safe-title">{practice.name}</h3>
                <InfoLine label="Exists for" value={practice.existsFor} />
                <InfoLine label="Why protected" value={practice.whyProtected} />
                <InfoLine label="Prerequisite" value={practice.prerequisite} />
                <InfoLine label="Safe alternative" value={practice.safeAlternative} />
              </motion.article>
            ))}
          </div>
        </section>

        <section className="relative p-6 sm:p-10 md:p-14 border border-white/10 bg-[#0a0a0a] overflow-hidden safe-card">
          <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 min-w-0">
            <div className="min-w-0">
              <div className="text-primary/60 uppercase tracking-[0.18em] text-xs mb-4 safe-copy">Karma Yoga Integration</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-6 safe-title">
                The practice is proven by ordinary life.
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed safe-copy">
                <p>
                  Meditation on a cushion is essential, but it is only one chamber of the day. The rest of life must become continuous sadhana, otherwise the mud cleared in the morning returns by evening.
                </p>
                <p>
                  Karma Yoga is not merely volunteering or performing goodness. It is an internal architectural shift: action continues, but ownership, display, and clinging soften.
                </p>
              </div>
            </div>
            <div className="space-y-4 min-w-0">
              <KarmaPoint title="Every action as mind-emptying" body="The action itself becomes a field of awareness." />
              <KarmaPoint title="No result ownership" body="The effort is offered; the outcome is released into the whole." />
              <KarmaPoint title="No spiritual performance" body="Ordinary action, clean speech, and responsibility matter more than appearing awake." />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8 sm:mb-10 min-w-0">
      <div className="text-primary/60 uppercase tracking-[0.18em] text-xs mb-3 safe-copy">{eyebrow}</div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground safe-title">{title}</h2>
    </div>
  );
}

function PracticeList({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-widest text-foreground/45 mb-3 safe-copy">{title}</div>
      <ul className="space-y-3 min-w-0">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed safe-copy min-w-0">
            <span className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${tone.includes("destructive") ? "bg-destructive/70" : "bg-primary/60"}`} />
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SignalList({ label, items, className }: { label: string; items: string[]; className: string }) {
  return (
    <div className={`mt-4 pt-4 border-t ${className} min-w-0`}>
      <div className="text-[10px] uppercase tracking-widest mb-2 safe-copy">{label}</div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-xs text-muted-foreground leading-relaxed safe-copy">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4 last:mb-0 min-w-0">
      <div className="text-[10px] uppercase tracking-widest text-primary/50 mb-1 safe-copy">{label}</div>
      <p className="text-sm text-muted-foreground leading-relaxed safe-copy">{value}</p>
    </div>
  );
}

function KarmaPoint({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-4 bg-white/5 border-l-2 border-primary/40 min-w-0 safe-card">
      <span className="font-medium text-foreground block mb-1 safe-copy">{title}</span>
      <span className="text-sm text-muted-foreground safe-copy">{body}</span>
    </div>
  );
}
