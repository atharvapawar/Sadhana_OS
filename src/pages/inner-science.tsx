import { motion } from "framer-motion";
import {
  INNER_SCIENCE_NORTH_STAR,
  INNER_SCIENCE_RELATIONSHIPS,
  INNER_SCIENCE_SAFETY_GATES,
  INNER_SCIENCE_STAGE_LANES,
  INNER_SCIENCE_SYSTEMS,
} from "@/data/inner-science-map";

const gateClasses = {
  green: "border-emerald-400/25 bg-emerald-400/5 text-emerald-200",
  amber: "border-amber-400/25 bg-amber-400/5 text-amber-200",
  red: "border-rose-400/25 bg-rose-400/5 text-rose-200",
};

export default function InnerScience() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-20"
        >
          <div className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-5 safe-copy">
            The Human Instrument
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight safe-title">
            Inner Science <span className="text-primary italic">— Concept Map</span>
          </h1>
          <div className="w-24 h-[1px] bg-primary/40 mb-8" />
          <p className="text-lg sm:text-xl text-muted-foreground font-serif max-w-3xl leading-relaxed safe-copy">
            {INNER_SCIENCE_NORTH_STAR.subtitle}
          </p>
          <div className="mt-8 p-5 sm:p-6 border border-primary/20 bg-primary/5 rounded-sm text-sm sm:text-base text-foreground/80 leading-relaxed safe-card">
            {INNER_SCIENCE_NORTH_STAR.principle}
          </div>
        </motion.div>

        <section className="mb-20 sm:mb-28">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-primary mb-3 safe-title">River-to-Instrument Alignment</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl safe-copy">
              Each arc refines a different part of the human instrument. This keeps the site sequence-wise: no concept floats alone, and no advanced practice appears before its foundation.
            </p>
          </div>
          <div className="grid lg:grid-cols-5 gap-4 min-w-0">
            {INNER_SCIENCE_STAGE_LANES.map((lane, i) => (
              <motion.div
                key={lane.arc}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-5 border border-white/5 bg-card/30 rounded-sm safe-card min-w-0"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-primary/70 mb-3 safe-copy">Stages {lane.stages}</div>
                <h3 className="font-serif text-lg text-foreground mb-3 leading-snug safe-title">{lane.arc}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 safe-copy">{lane.instrumentFocus}</p>
                <div className="text-xs text-primary/85 leading-relaxed border-t border-white/5 pt-4 safe-copy">
                  {lane.innerScience}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20 sm:mb-28">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-primary mb-3 safe-title">Six Integrated Maps</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl safe-copy">
              These maps support one river. They should be read as complementary lenses: body, energy, mind, constitution, subtle channeling, and witness-recognition.
            </p>
          </div>

          <div className="space-y-6 min-w-0">
            {INNER_SCIENCE_SYSTEMS.map((system, i) => (
              <motion.article
                key={system.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05 }}
                className="border border-white/5 bg-card/30 rounded-sm overflow-hidden safe-card min-w-0"
              >
                <div className="p-5 sm:p-6 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 min-w-0">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-2 safe-copy">{system.subtitle}</div>
                      <h3 className="text-2xl font-serif text-primary leading-tight safe-title">{system.title}</h3>
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-primary/70 md:text-right shrink-0 safe-copy">
                      Active: {system.stages}
                    </div>
                  </div>
                  <p className="mt-4 text-sm sm:text-base text-foreground/80 leading-relaxed safe-copy">{system.essence}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed safe-copy">{system.riverRole}</p>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-white/5 min-w-0">
                  {system.items.map((item) => (
                    <div key={item.name} className="p-5 bg-background/80 min-w-0">
                      <h4 className="font-serif text-lg text-foreground mb-1 leading-snug safe-title">{item.name}</h4>
                      <div className="text-xs uppercase tracking-[0.2em] text-primary/70 mb-3 safe-copy">{item.meaning}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed safe-copy">{item.function}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5 sm:p-6 border-t border-primary/10 bg-primary/5 text-sm text-primary/90 leading-relaxed safe-copy">
                  <span className="uppercase tracking-[0.2em] text-[10px] text-primary/60 mr-2">Safety note</span>
                  {system.safety}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-20 sm:mb-28">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-primary mb-3 safe-title">Overlap Resolver</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl safe-copy">
              Many traditions use different words for connected realities. This resolver prevents the user from confusing related terms as either identical or completely separate.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 min-w-0">
            {INNER_SCIENCE_RELATIONSHIPS.map((rel, i) => (
              <motion.div
                key={`${rel.from}-${rel.to}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="p-5 border border-white/5 bg-card/30 rounded-sm safe-card min-w-0"
              >
                <div className="font-serif text-lg text-foreground mb-3 leading-snug safe-title">
                  <span className="text-primary">{rel.from}</span>
                  <span className="text-muted-foreground mx-2">↔</span>
                  <span>{rel.to}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed safe-copy">{rel.relationship}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-primary mb-3 safe-title">Safety Gates for Inner Science</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl safe-copy">
              The site may reveal that advanced maps exist, but practice depth must be sequenced. Knowledge can be visible; unsafe procedure must not be casualized.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 min-w-0">
            {INNER_SCIENCE_SAFETY_GATES.map((gate) => (
              <div key={gate.gate} className={`p-5 border rounded-sm safe-card min-w-0 ${gateClasses[gate.gate]}`}>
                <div className="text-[10px] uppercase tracking-[0.25em] opacity-70 mb-2 safe-copy">{gate.gate} gate</div>
                <h3 className="font-serif text-xl mb-3 leading-snug safe-title">{gate.label}</h3>
                <p className="text-sm leading-relaxed opacity-90 safe-copy">{gate.appliesTo}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
