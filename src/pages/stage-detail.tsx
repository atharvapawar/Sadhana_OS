import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { STAGES, LABEL_STYLES, ARC_COLORS } from "@/data/stages";
import { StageStatusControl } from "@/components/stage-status-control";
import { STAGE_INTELLIGENCE } from "@/data/stage-intelligence";
import { STAGE_DEPTH_ASCENT } from "@/data/stage-depth-ascent";
import { STAGE_CROSS_LINKS } from "@/data/cross-linking";
import { glossaryHash } from "@/lib/slug";
import { StageStudyLayers } from "@/components/stage-study-layers";
import { StageContemplationProtocol } from "@/components/stage-contemplation-protocol";
import { StageRiverNavigator } from "@/components/stage-river-navigator";
import { StageSourceLens } from "@/components/stage-source-lens";

export default function StageDetail() {
  const { num } = useParams<{ num: string }>();
  const stageNum = parseInt(num ?? "1", 10);
  const stage = STAGES.find((s) => s.num === stageNum);

  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground font-serif text-xl">
        Stage not found.
      </div>
    );
  }

  const prev = STAGES.find((s) => s.num === stageNum - 1);
  const next = STAGES.find((s) => s.num === stageNum + 1);

  const arcColor = ARC_COLORS[stage.arc] ?? "text-primary";
  const intelligence = STAGE_INTELLIGENCE[stage.num];
  const depthAscent = STAGE_DEPTH_ASCENT[stage.num];
  const crossLink = STAGE_CROSS_LINKS[stage.num];

  return (
    <div className="min-h-screen pt-20 pb-28 sm:pb-40 overflow-x-hidden">
      {/* Back breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl pt-8 sm:pt-10 mb-6 min-w-0">
        <Link
          href="/roadmap"
          className="text-muted-foreground/60 uppercase tracking-widest text-xs hover:text-primary transition-colors"
          data-testid="link-back-roadmap"
        >
          ← Knowledge Roadmap
        </Link>
      </div>

      {/* Arc context */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-2 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.25em] font-medium safe-copy ${arcColor}`}
        >
          {stage.arc} · {stage.arcStages}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-muted-foreground/50 text-xs uppercase tracking-wider mt-1 safe-copy"
        >
          {stage.arcMeaning}
        </motion.p>
      </div>

      {/* Stage hero */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-10 sm:mb-12 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mt-6 min-w-0">
            {/* Number glyph */}
            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-primary/40 flex items-center justify-center font-serif text-2xl sm:text-3xl text-primary/90">
              {stage.num}
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight safe-title">
                {stage.title}
              </h1>
              <p className="text-primary/70 font-serif italic text-xl sm:text-2xl mt-2 safe-copy">
                {stage.sanskrit}
              </p>
            </div>
          </div>

          <div className="w-24 h-[1px] bg-primary/30 mt-8 mb-6" />

          {/* Headline */}
          <p className="text-muted-foreground text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.2em] safe-copy">
            {stage.headline}
          </p>
        </motion.div>
      </div>

      {/* Doctrine pull-quote */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 min-w-0">
        <motion.blockquote
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border-l-2 border-primary/50 pl-5 sm:pl-8 py-2 safe-card"
        >
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed safe-copy">
            "{stage.doctrine}"
          </p>
        </motion.blockquote>
      </div>

      {/* Metadata strip */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 min-w-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 min-w-0"
        >
          {stage.element && (
            <div className="p-4 bg-card/40 border border-white/5 safe-card">
              <div className="text-primary/40 uppercase tracking-widest text-[10px] mb-1">Element</div>
              <div className="text-foreground/80 text-sm font-medium safe-copy">{stage.element}</div>
            </div>
          )}
          {stage.kosha && (
            <div className="p-4 bg-card/40 border border-white/5 safe-card">
              <div className="text-primary/40 uppercase tracking-widest text-[10px] mb-1">Kosha Layer</div>
              <div className="text-foreground/80 text-sm font-medium safe-copy">{stage.kosha}</div>
            </div>
          )}
          <div className="p-4 bg-card/40 border border-white/5 safe-card">
            <div className="text-primary/40 uppercase tracking-widest text-[10px] mb-1">River Arc</div>
            <div className={`text-sm font-medium ${arcColor}`}>{stage.arc}</div>
          </div>
          <div className="p-4 bg-card/40 border border-white/5 safe-card">
            <div className="text-primary/40 uppercase tracking-widest text-[10px] mb-1">Stage</div>
            <div className="text-foreground/80 text-sm font-medium safe-copy">{stage.num} of 18</div>
          </div>
        </motion.div>
      </div>


      <StageRiverNavigator stageNum={stageNum} />

      <StageStudyLayers stageNum={stageNum} />

      <StageContemplationProtocol stageNum={stageNum} />

      {/* Stage intelligence */}
      {intelligence && (
        <div id="stage-intelligence" className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 scroll-mt-28 min-w-0">
          <SectionHeading>Stage Intelligence</SectionHeading>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0"
          >
            <IntelligenceCard label="Essence" value={intelligence.essence} />
            <IntelligenceCard label="Why this stage comes here" value={intelligence.whyHere} />
            <IntelligenceCard label="What it purifies or stabilizes" value={intelligence.purifiesOrStabilizes} />
            <IntelligenceCard label="Beginner-safe practice" value={intelligence.beginnerSafePractice} />
            <IntelligenceCard label="Common mistake" value={intelligence.commonMistake} />
            <IntelligenceCard label="Teacher-guided depth" value={intelligence.teacherGuidedDepth} />
            <div className="md:col-span-2 p-5 sm:p-6 border border-primary/15 bg-primary/5 safe-card">
              <div className="text-primary/60 uppercase tracking-widest text-[10px] mb-3 font-semibold">
                How it supports the next stage
              </div>
              <p className="text-foreground/75 text-sm sm:text-base leading-relaxed safe-copy">
                {intelligence.supportsNext}
              </p>
            </div>
          </motion.div>

          {intelligence.connectedConcepts.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2 min-w-0">
              {intelligence.connectedConcepts.map((concept) => (
                <span
                  key={concept}
                  className="text-[11px] px-3 py-1.5 border border-white/10 bg-white/[0.03] text-muted-foreground safe-copy"
                >
                  {concept}
                </span>
              ))}
            </div>
          )}
        </div>
      )}



      {/* Deep stage architecture and integrated ascent matrix */}
      {depthAscent && (
        <div id="deep-stage-architecture" className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 scroll-mt-28 min-w-0">
          <SectionHeading>Deep Stage Architecture</SectionHeading>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5 min-w-0"
          >
            <div className="p-5 sm:p-6 border border-primary/15 bg-primary/5 safe-card min-w-0">
              <div className="text-primary/60 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
                Stage Identity
              </div>
              <div className="space-y-3 text-foreground/75 text-sm sm:text-base leading-relaxed safe-copy">
                <p>{depthAscent.stageIdentity.sanskritMeaning}</p>
                <p>{depthAscent.stageIdentity.oneSentenceEssence}</p>
                <p className="font-serif italic text-primary/75">{depthAscent.stageIdentity.riverMetaphor}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
              <IntelligenceCard label="Why this comes here" value={depthAscent.depth.whyThisComesHere} />
              <IntelligenceCard label="If skipped" value={depthAscent.depth.whatWouldGoWrongIfSkipped} />
              <IntelligenceCard label="Doctrine connection" value={depthAscent.depth.doctrineConnection} />
              <IntelligenceCard label="Inner Science connection" value={depthAscent.depth.innerScienceConnection} />
              <IntelligenceCard label="Practice connection" value={depthAscent.depth.practiceConnection} />
              <IntelligenceCard label="Common mistake" value={depthAscent.depth.commonMistake} />
              <div className="md:col-span-2 p-5 sm:p-6 border border-white/8 bg-card/25 safe-card min-w-0">
                <div className="text-primary/45 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
                  Bridge to the next stage
                </div>
                <p className="text-foreground/75 text-sm sm:text-base leading-relaxed safe-copy">
                  {depthAscent.depth.nextBridge}
                </p>
              </div>
            </div>
          </motion.div>

          <div id="integrated-yogic-ascent-matrix" className="mt-10 scroll-mt-28">
            <SectionHeading>Integrated Yogic Ascent Matrix</SectionHeading>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0"
            >
              <MatrixCard label="Primary Kosha" value={depthAscent.ascentMatrix.primaryKosha} />
              {depthAscent.ascentMatrix.secondaryKosha && (
                <MatrixCard label="Secondary Kosha" value={depthAscent.ascentMatrix.secondaryKosha} />
              )}
              <MatrixCard label="Bhuta / Element" value={depthAscent.ascentMatrix.bhutaElement} />
              <MatrixCard label="Chakra Language" value={depthAscent.ascentMatrix.chakraLanguage} />
              <MatrixCard label="Vayu Relation" value={depthAscent.ascentMatrix.vayuRelation} />
              <MatrixCard label="Body-Practice Direction" value={depthAscent.ascentMatrix.bodyPracticeDirection} />
              <MatrixCard label="Purification Target" value={depthAscent.ascentMatrix.purificationTarget} />
              <MatrixCard label="Healing Meaning" value={depthAscent.ascentMatrix.healingMeaning} />
              <div className="sm:col-span-2 p-5 sm:p-6 border border-amber-700/25 bg-amber-900/10 safe-card min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 min-w-0">
                  <div className="text-amber-400/70 uppercase tracking-widest text-[10px] font-semibold safe-copy">
                    Safety Gate
                  </div>
                  <span className="text-[10px] px-2.5 py-1 border border-amber-500/20 bg-amber-500/10 text-amber-200 uppercase tracking-wider self-start safe-copy">
                    {depthAscent.ascentMatrix.safetyLevel}
                  </span>
                </div>
                <p className="text-foreground/75 text-sm sm:text-base leading-relaxed safe-copy">
                  {depthAscent.ascentMatrix.safetyNote}
                </p>
              </div>
            </motion.div>
          </div>

          {depthAscent.glossaryTerms.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2 min-w-0">
              {depthAscent.glossaryTerms.map((term) => (
                <Link
                  key={term}
                  href={`/glossary#${glossaryHash(term)}`}
                  className="text-[11px] px-3 py-1.5 border border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/30 hover:text-primary transition-all safe-copy"
                >
                  {term}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}



      {/* Cross-linking intelligence */}
      {crossLink && (
        <div id="cross-linking-intelligence" className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 scroll-mt-28 min-w-0">
          <SectionHeading>Cross-Linking Intelligence</SectionHeading>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5 min-w-0"
          >
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6 safe-card min-w-0">
              <div className="text-primary/60 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
                Stage Signal
              </div>
              <p className="font-serif text-lg sm:text-xl text-foreground/85 leading-relaxed safe-copy">
                {crossLink.stageSignal}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
              {[crossLink.doctrine, crossLink.innerScience, crossLink.practice].map((item) => (
                <Link
                  key={item.section}
                  href={item.href}
                  className="group rounded-2xl border border-white/10 bg-card/30 p-5 transition hover:border-primary/35 hover:bg-primary/5 safe-card min-w-0"
                >
                  <div className="text-primary/55 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
                    {item.section}
                  </div>
                  <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition safe-title">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed safe-copy">
                    {item.connection}
                  </p>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-4 min-w-0">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6 safe-card min-w-0">
                <div className="text-primary/55 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
                  Related River Stages
                </div>
                <div className="flex flex-wrap gap-2 min-w-0">
                  {crossLink.relatedStages.map((relatedStageNum) => {
                    const relatedStage = STAGES.find((item) => item.num === relatedStageNum);
                    return (
                      <Link
                        key={relatedStageNum}
                        href={`/stage/${relatedStageNum}`}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-muted-foreground transition hover:border-primary/30 hover:text-primary safe-copy"
                      >
                        {String(relatedStageNum).padStart(2, "0")} {relatedStage?.title ?? "Stage"}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6 safe-card min-w-0">
                <div className="text-primary/55 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
                  Glossary Bridges
                </div>
                <div className="flex flex-wrap gap-2 min-w-0">
                  {crossLink.glossaryTerms.map((term) => (
                    <Link
                      key={term}
                      href={`/glossary#${glossaryHash(term)}`}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-muted-foreground transition hover:border-primary/30 hover:text-primary safe-copy"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-600/25 bg-amber-900/10 p-5 sm:p-6 safe-card min-w-0">
              <div className="text-amber-300/70 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
                Integration Prompt
              </div>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed safe-copy">
                {crossLink.integrationPrompt}
              </p>
            </div>
          </motion.div>
        </div>
      )}

      <StageSourceLens stageNum={stageNum} />

      {/* Overview */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 min-w-0">
        <SectionHeading>Overview</SectionHeading>
        <div className="space-y-5">
          {stage.overview.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="text-foreground/80 leading-relaxed safe-copy"
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Mud cleared */}
      {stage.mudCleared && stage.mudCleared.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 min-w-0">
          <SectionHeading>What mud is cleared here</SectionHeading>
          <ul className="space-y-3">
            {stage.mudCleared.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-start gap-3 text-foreground/70 safe-copy"
                data-testid={`mud-item-${i}`}
              >
                <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/50" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Instrument refined */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 min-w-0">
        <SectionHeading>What instrument is refined</SectionHeading>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-foreground/80 leading-relaxed font-serif italic text-base sm:text-lg border-l border-primary/20 pl-5 sm:pl-6 py-1 safe-copy"
        >
          {stage.instrumentRefined}
        </motion.p>
      </div>

      {/* Practices */}
      <div id="practice-safety-gate" className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 scroll-mt-28 min-w-0">
        <SectionHeading>Practices</SectionHeading>
        <div className="space-y-4">
          {stage.practices.map((practice, i) => {
            const labelStyle = LABEL_STYLES[practice.label];
            const isTeacher = practice.label === "Teacher-Guided" || practice.label === "Teacher-Only";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className={`p-5 sm:p-6 border safe-card ${isTeacher ? "teacher-guided-border bg-primary/5" : "border-white/8 bg-card/30"}`}
                data-testid={`practice-card-${i}`}
              >
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-3 mb-3 min-w-0">
                  <h3 className="font-serif text-lg text-foreground/90 safe-title">{practice.name}</h3>
                  <span className={`text-[10px] px-2 py-1 uppercase tracking-wider shrink-0 self-start ${labelStyle}`}>
                    {practice.label}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed safe-copy">{practice.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Advanced note */}
      {stage.advancedNote && (
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-5 sm:p-6 border border-violet-700/25 bg-violet-900/10 safe-card"
          >
            <div className="text-violet-400/70 uppercase tracking-widest text-[10px] mb-3 font-semibold">
              Traditional Yogic Science — Advanced Knowledge
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">{stage.advancedNote}</p>
          </motion.div>
        </div>
      )}

      {/* Safety note */}
      {stage.safetyNote && (
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-5 sm:p-6 border border-amber-700/25 bg-amber-900/10 safe-card"
          >
            <div className="text-amber-400/70 uppercase tracking-widest text-[10px] mb-3 font-semibold">
              Safety & Integrity Note
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">{stage.safetyNote}</p>
          </motion.div>
        </div>
      )}

      {/* Cross-references */}
      {stage.crossReferences.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 min-w-0">
          <SectionHeading>Sacred Terminology</SectionHeading>
          <div className="flex flex-wrap gap-2 min-w-0">
            {stage.crossReferences.map((term) => (
              <Link
                key={term}
                href={`/glossary#${glossaryHash(term)}`}
                className="text-xs px-3 py-1.5 border border-white/10 text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                data-testid={`term-${term}`}
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Progress tracker control */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 min-w-0">
        <StageStatusControl stageNum={stageNum} />
      </div>

      {/* River position */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-14 sm:mb-20 min-w-0">
        <div className="py-8 border-t border-b border-primary/10 text-center space-y-4">
          <div className="text-primary/40 uppercase tracking-widest text-[10px]">The River at This Stage</div>
          <p className="font-serif italic text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed safe-copy">
            {stage.riverPosition}
          </p>
        </div>
      </div>

      {/* Final line */}
      <div className="container mx-auto px-6 max-w-4xl mb-24 text-center">
        <p className="font-serif italic text-lg sm:text-xl text-primary/80 leading-relaxed safe-copy">
          "{stage.finalLine}"
        </p>
      </div>

      {/* Prev / Next navigation */}
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row gap-4 justify-between min-w-0">
          {prev ? (
            <Link
              href={`/stage/${prev.num}`}
              className="flex-1 group p-5 border border-white/8 bg-card/20 hover:border-primary/25 transition-all text-left safe-card"
              data-testid="link-prev-stage"
            >
              <div className="text-muted-foreground/50 uppercase tracking-widest text-[10px] mb-2">← Previous Stage</div>
              <div className="font-serif text-foreground/80 group-hover:text-foreground transition-colors safe-title">
                {prev.num}. {prev.title}
              </div>
              <div className="text-primary/50 text-sm italic safe-copy">{prev.sanskrit}</div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/stage/${next.num}`}
              className="flex-1 group p-5 border border-white/8 bg-card/20 hover:border-primary/25 transition-all text-left sm:text-right safe-card"
              data-testid="link-next-stage"
            >
              <div className="text-muted-foreground/50 uppercase tracking-widest text-[10px] mb-2">Next Stage →</div>
              <div className="font-serif text-foreground/80 group-hover:text-foreground transition-colors safe-title">
                {next.num}. {next.title}
              </div>
              <div className="text-primary/50 text-sm italic safe-copy">{next.sanskrit}</div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </div>
  );
}


function IntelligenceCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 sm:p-6 border border-white/8 bg-card/25 safe-card min-w-0">
      <div className="text-primary/45 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
        {label}
      </div>
      <p className="text-foreground/75 text-sm sm:text-base leading-relaxed safe-copy">
        {value}
      </p>
    </div>
  );
}

function MatrixCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 sm:p-6 border border-white/8 bg-card/20 safe-card min-w-0">
      <div className="text-primary/45 uppercase tracking-widest text-[10px] mb-3 font-semibold safe-copy">
        {label}
      </div>
      <p className="text-foreground/75 text-sm leading-relaxed safe-copy">{value}</p>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6 min-w-0">
      <h2 className="text-primary/60 uppercase tracking-[0.16em] sm:tracking-[0.2em] text-xs font-semibold safe-copy">{children}</h2>
      <div className="flex-1 h-[1px] bg-white/5" />
    </div>
  );
}
