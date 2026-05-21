import { motion } from "framer-motion";
import { Link } from "wouter";
import { useStageProgress } from "@/hooks/use-stage-progress";

const STATUS_DOT: Record<string, { bg: string; glow: string }> = {
  none: { bg: "", glow: "" },
  studying:    { bg: "bg-amber-500",   glow: "shadow-amber-500/50" },
  integrating: { bg: "bg-violet-500",  glow: "shadow-violet-500/50" },
  complete:    { bg: "bg-emerald-500", glow: "shadow-emerald-500/50" },
};

const ARC_ACCENT: Record<string, string> = {
  "I. Right Seeing":                "from-amber-400/20 to-transparent",
  "II. Purification & Foundation":  "from-blue-400/12 to-transparent",
  "III. Body-Prana Stabilization":  "from-amber-500/15 to-transparent",
  "IV. Interiorization & Meditation": "from-violet-400/12 to-transparent",
  "V. Living Realization":          "from-emerald-400/12 to-transparent",
};

const arcs = [
  {
    title: "I. Right Seeing",
    subtitle: "Right view and map literacy before technique",
    description: "The seeker first sees the problem clearly: bondage is misidentification with body, mind, memory, desire, fear, expectation, and egoic knowing.",
    stages: [
      {
        num: 1,
        title: "Right View",
        sanskrit: "Samyak Darshana",
        teaching: "Practice does not create the Self. Practice removes covering.",
        mud: "false identification",
        practices: "Svadhyaya, listening to correct teaching, study of Yoga Sutra, discrimination",
        labels: ["Conceptual Knowledge"]
      },
      {
        num: 2,
        title: "Human Architecture",
        sanskrit: "Sharira, Prana & Chitta",
        teaching: "I am not merely the body. I am not merely the mind. Body, prana, senses, and mind are instruments. The witness is deeper.",
        content: "Pancha Kosha, koshas, nadis, chakras, gunas, samskaras, vasanas, Atman/Sakshi — introduced as traditional Yogic Science map",
        labels: ["Traditional Yogic Science — not established as modern medical fact"]
      }
    ]
  },
  {
    title: "II. Purification & Foundation",
    subtitle: "Stop adding mud and establish the base",
    description: "Yama, Niyama, lifestyle, and Shatkarma purify action, rhythm, body, and the gross foundations before deeper practice intensifies.",
    stages: [
      {
        num: 3,
        title: "Yama",
        sanskrit: "Ethical Purification",
        teaching: "Without ethical purification, advanced energy work becomes dangerous ego fuel.",
        mud: "violence, falsehood, greed, leakage, grasping",
        practices: "Ahimsa, Satya, Asteya, Brahmacharya, Aparigraha — Karma Yoga begins here",
        labels: ["Safe Practice"]
      },
      {
        num: 4,
        title: "Niyama",
        sanskrit: "Sacred Alignment",
        teaching: "Do not chase mystical experience before the inner climate is clean.",
        practices: "Shaucha, Santosha, Tapas, Svadhyaya, Ishvara Pranidhana — Bhakti enters as surrender",
        labels: ["Safe Practice"]
      },
      {
        num: 5,
        title: "Lifestyle Foundation",
        sanskrit: "Ahara, Nidra & Brahmacharya",
        teaching: "Sattvic food, proper sleep, energy preservation, dinacharya, Ayurveda rhythm.",
        content: "Food is understood in Yogic Science as elemental nourishment. Sadhana OS teaches lightness, digestion clarity, sattvic food, and safe fasting awareness — not rejection of nutrition.",
        kosha: "Annamaya",
        elements: "Prithvi + Jala",
        labels: ["Safe Practice"]
      },
      {
        num: 6,
        title: "Shatkarma",
        sanskrit: "Yogic Cleansing",
        teaching: "The body-prana channel must be cleared before subtler energy is refined.",
        practices: "Neti (safe), Trataka (intermediate), Dhauti/Basti/Nauli (teacher-guided), Kapalabhati (with guidance)",
        safety: "Do not self-experiment with intense cleansing. Forceful practices require proper instruction.",
        labels: ["Beginner-Safe", "Intermediate — Seek Guidance", "Teacher-Only"]
      }
    ]
  },
  {
    title: "III. Body-Prana Stabilization",
    subtitle: "Stabilize the body, breath, prana, and inner circuitry",
    description: "Asana, Pranayama, Bandha, Mudra, and Antar Kriya stabilize and direct the current. Advanced technologies remain visible but protected.",
    stages: [
      {
        num: 7,
        title: "Asana",
        sanskrit: "The Steady Body-Temple",
        teaching: "Asana is successful when the body stops disturbing meditation.",
        content: "Focus: steady posture, healthy spine, calm nerves, grounded body, capacity to sit",
        kosha: "Annamaya",
        labels: ["Safe Practice"]
      },
      {
        num: 8,
        title: "Pranayama",
        sanskrit: "Pranic Harmonization",
        teaching: "Pranayama is not breath domination. It is pranic refinement.",
        practices: "Nadi Shodhana (safe), Bhramari (safe), Ujjayi (safe guidance), Kumbhaka / Bhastrika / Surya Bhedana [Teacher-Guided]",
        safety: "Notice the natural pause only if it appears by itself. Do not hold, extend, suppress, or chase the gap.",
        kosha: "Pranamaya",
        elements: "Vayu",
        labels: ["Safe Practice", "Teacher-Guided"]
      },
      {
        num: 9,
        title: "Bandha",
        sanskrit: "Energetic Lock",
        teaching: "Bandhas are not physical locks only — they contain and redirect pranic current.",
        practices: "Mula Bandha, Uddiyana Bandha, Jalandhara Bandha, Maha Bandha",
        labels: ["Conceptual Knowledge", "Teacher-Guided"]
      },
      {
        num: 10,
        title: "Mudra",
        sanskrit: "Conscious Energy Seal",
        teaching: "Mudra changes the inner circuit of attention and prana.",
        practices: "Shambhavi (teacher-guided), Viparita Karani, Maha Mudra, Yoga Mudra",
        safety: "Khechari is treated in traditional Hatha and Tantra as an advanced mudra. Sadhana OS does not teach the procedure as modern medical fact.",
        labels: ["Teacher-Only", "Traditional Yogic Science — not established as modern medical fact"]
      },
      {
        num: 11,
        title: "Antar Kriya",
        sanskrit: "Inner Yogic Technology",
        teaching: "Advanced practice is not fake because modern science has not mapped it. But it belongs to teacher-guided sadhana after the instrument is ready.",
        content: "Kundalini Kriya [Teacher-Only], Sushumna Activation Maps [Traditional Map], Granthi knowledge, Shakti Chalana, Laya Yoga, Nada Yoga",
        labels: ["Teacher-Guided", "Traditional Yogic Science — not established as modern medical fact"]
      }
    ]
  },
  {
    title: "IV. Interiorization & Meditation",
    subtitle: "Turn sound, senses, and attention inward",
    description: "Mantra and Pratyahara draw the current inward; Dharana gathers it, Dhyana makes it continuous, and Samadhi clarifies absorption beyond the separate knower.",
    stages: [
      {
        num: 12,
        title: "Mantra",
        sanskrit: "Sacred Sound Current",
        teaching: "Mantra is not only chanting — it can purify chitta, stabilize attention, open Bhakti, and support Dharana.",
        practices: "Om, Soham/Hamsa (accessible), Nama Japa, Bija Mantra knowledge, Guru Mantra/Diksha [Teacher-Guided]",
        labels: ["Safe Practice", "Teacher-Guided"]
      },
      {
        num: 13,
        title: "Pratyahara",
        sanskrit: "Return of the Senses",
        teaching: "The river is no longer pulled outward by every sense-object.",
        content: "Inner space, silence, non-feeding of senses, freedom from sensory dependence, emptiness without suppression",
        safety: "Inner emptiness is not starvation, dissociation, or forced isolation.",
        kosha: "Manomaya",
        elements: "Akash",
        labels: ["Safe Practice"]
      },
      {
        num: 14,
        title: "Dharana",
        sanskrit: "One-Pointed Holding",
        teaching: "The mind is not fully dissolved, but it is no longer scattered.",
        practices: "One-pointed attention, mantra focus, breath focus, inner light/sound [teacher-guided]",
        labels: ["Safe Practice", "Teacher-Guided"]
      },
      {
        num: 15,
        title: "Dhyana",
        sanskrit: "Unbroken Meditation",
        teaching: "Dhyana is not thinking about awareness. It is awareness becoming continuous.",
        content: "Gap reduces between meditator, meditation, and object",
        labels: ["Safe Practice"]
      },
      {
        num: 16,
        title: "Samadhi",
        sanskrit: "Absorption Beyond the Separate Knower",
        teaching: "Samadhi is not fantasy, not sleep, not blankness. It is where the ordinary egoic knower becomes transparent.",
        content: "Gradations: Seeded samadhi, subtle object remains, bliss/I-sense may remain, deeper absorption, objectless language",
        safety: "Samadhi may be an experience on the path, but liberation is not a memory of an experience.",
        labels: ["Safe Practice"]
      }
    ]
  },
  {
    title: "V. Living Realization",
    subtitle: "Realization becomes ordinary life, action, humility, and non-clinging",
    description: "Sacred Integration and Sahaja Karma Yoga test whether realization becomes speech, action, relationship, service, responsibility, and non-clinging.",
    stages: [
      {
        num: 17,
        title: "Sacred Integration",
        sanskrit: "Samadhi in Life",
        teaching: "After deep experience, integration determines whether it becomes wisdom or becomes ego fuel.",
        content: "Body grounding, prana smoothing, humility, speech restraint, karma return, no display, no spiritual superiority",
        labels: ["Safe Practice"]
      },
      {
        num: 18,
        title: "Sahaja Karma Yoga",
        sanskrit: "Life as Living Awareness",
        teaching: "The river does not announce that it became the ocean.",
        content: "Action without bondage, awareness in ordinary life, no spiritual trophy, no need to claim.",
        labels: ["Safe Practice"]
      }
    ]
  }
];

function StageSigil({ num, statusDot }: { num: number; statusDot: typeof STATUS_DOT[string] }) {
  return (
    <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-primary/25" />
      {/* Inner fill */}
      <div className="absolute inset-[3px] rounded-full bg-background border border-primary/15" style={{
        boxShadow: "inset 0 0 10px rgba(204,168,78,0.06)"
      }} />
      {/* Number */}
      <span className="relative font-serif text-primary text-base sm:text-lg font-semibold"
        style={{ textShadow: "0 0 12px rgba(204,168,78,0.4)" }}>
        {num}
      </span>
      {/* Status indicator */}
      {statusDot.bg && (
        <span
          className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${statusDot.bg} shadow-sm ${statusDot.glow}`}
        />
      )}
    </div>
  );
}

export default function Roadmap() {
  const { getStageStatus } = useStageProgress();

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-x-hidden">

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl mb-16 sm:mb-24 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-6 bg-primary/40" />
            <span className="text-primary/60 uppercase tracking-[0.22em] text-[10px] sm:text-xs safe-copy">
              The 18-Stage Sadhana Krama
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-8 leading-tight safe-title">
            The Yogic River from Misidentification to{" "}
            <span className="text-primary italic text-glow-subtle">Living Awareness.</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-20 bg-gradient-to-r from-primary/40 to-transparent" />
            <div className="w-1 h-1 rounded-full bg-primary/50" />
          </div>
        </motion.div>
      </div>

      {/* Roadmap body */}
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative min-w-0">
        {/* River spine line */}
        <div
          className="absolute left-[28px] sm:left-[34px] md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(204,168,78,0.20) 15%, rgba(204,168,78,0.35) 50%, rgba(204,168,78,0.20) 85%, transparent 100%)"
          }}
        />

        {arcs.map((arc, arcIndex) => (
          <div key={arcIndex} className="mb-24 sm:mb-32 relative z-10 min-w-0">

            {/* Arc header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="arc-header rounded-xl py-6 sm:py-8 px-5 sm:px-8 text-center mb-12 sm:mb-16 mx-auto max-w-3xl safe-card relative overflow-hidden"
            >
              {/* Arc glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${ARC_ACCENT[arc.title] ?? "from-primary/8 to-transparent"} pointer-events-none rounded-xl`}
              />
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-serif text-primary mb-2 uppercase tracking-[0.12em] safe-title"
                  style={{ textShadow: "0 0 20px rgba(204,168,78,0.25)" }}>
                  {arc.title}
                </h2>
                <p className="text-foreground/80 italic font-serif text-lg sm:text-xl mb-3 safe-title">{arc.subtitle}</p>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto safe-copy">{arc.description}</p>
              </div>
            </motion.div>

            {/* Stages */}
            <div className="space-y-10 sm:space-y-14 min-w-0">
              {arc.stages.map((stage, stageIndex) => {
                const isTeacherGuided = stage.labels?.includes("Teacher-Guided") || stage.labels?.includes("Teacher-Only");
                const stageStatus = getStageStatus(stage.num);
                const dot = STATUS_DOT[stageStatus] ?? STATUS_DOT.none;

                return (
                  <motion.div
                    key={stage.num}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.65,
                      delay: stageIndex * 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`relative min-w-0 md:w-[calc(50%-44px)] ${stage.num % 2 === 0 ? "md:ml-auto" : "md:mr-auto"} ml-14 sm:ml-16 md:ml-0`}
                  >
                    {/* Sigil connector dot */}
                    <div className="absolute top-5 sm:top-7 -left-[52px] sm:-left-[60px] md:left-auto md:right-[-68px] z-20">
                      <StageSigil num={stage.num} statusDot={dot} />
                    </div>

                    <Link
                      href={`/stage/${stage.num}`}
                      data-testid={`link-stage-${stage.num}`}
                      className={`group block safe-card relative overflow-hidden rounded-xl transition-all
                        ${isTeacherGuided
                          ? "teacher-guided-border bg-card/35 hover:bg-primary/[0.06]"
                          : "border border-white/8 bg-card/30 hover:border-primary/28 hover:bg-card/55"
                        }
                        hover:shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_0_1px_rgba(204,168,78,0.10)]
                        hover:-translate-y-1 duration-300
                      `}
                      style={{ transition: "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease, border-color 280ms ease, background 280ms ease" }}
                    >
                      {/* Shimmer sweep */}
                      <div
                        className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[200%] duration-700"
                        style={{
                          background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.04) 50%, transparent 80%)",
                          transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                      />

                      <div className="relative z-10 p-5 sm:p-6 md:p-8">
                        {/* Labels */}
                        <div className="flex flex-wrap gap-2 mb-5 min-w-0">
                          {stage.labels?.map((label) => (
                            <span
                              key={label}
                              className={`text-[10px] px-2.5 py-1 uppercase tracking-[0.14em] rounded-sm ${
                                label.includes("Teacher")
                                  ? "bg-primary/10 text-primary/85 border border-primary/22"
                                  : "bg-white/[0.04] text-muted-foreground border border-white/8"
                              }`}
                            >
                              {label}
                            </span>
                          ))}
                        </div>

                        {/* Stage name */}
                        <h3 className="text-xl sm:text-2xl font-serif text-foreground mb-1 group-hover:text-primary transition-colors duration-280 safe-title">
                          {stage.title}
                        </h3>
                        <div className="text-primary/65 font-serif italic text-base sm:text-lg mb-5 safe-copy">
                          {stage.sanskrit}
                        </div>

                        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed safe-copy">
                          {/* Teaching quote */}
                          <div className="pl-4 border-l-2 border-primary/30 text-foreground/88 italic font-serif">
                            "{stage.teaching}"
                          </div>

                          {stage.mud && (
                            <div>
                              <span className="text-primary/75 uppercase tracking-[0.14em] text-[10px] font-semibold">Mud Cleared:</span>
                              <p className="mt-1">{stage.mud}</p>
                            </div>
                          )}
                          {stage.practices && (
                            <div>
                              <span className="text-primary/75 uppercase tracking-[0.14em] text-[10px] font-semibold">Practices:</span>
                              <p className="mt-1">{stage.practices}</p>
                            </div>
                          )}
                          {stage.content && (
                            <div>
                              <span className="text-primary/75 uppercase tracking-[0.14em] text-[10px] font-semibold">Content:</span>
                              <p className="mt-1">{stage.content}</p>
                            </div>
                          )}

                          {(stage.kosha || stage.elements) && (
                            <div className="pt-4 border-t border-white/[0.05] flex flex-col sm:flex-row gap-4 sm:gap-8 min-w-0">
                              {stage.kosha && (
                                <div>
                                  <span className="text-primary/45 uppercase tracking-[0.18em] text-[9px]">Kosha</span>
                                  <div className="text-foreground/75 mt-0.5">{stage.kosha}</div>
                                </div>
                              )}
                              {stage.elements && (
                                <div>
                                  <span className="text-primary/45 uppercase tracking-[0.18em] text-[9px]">Element</span>
                                  <div className="text-foreground/75 mt-0.5">{stage.elements}</div>
                                </div>
                              )}
                            </div>
                          )}

                          {stage.safety && (
                            <div className="mt-3 p-4 bg-primary/[0.05] border border-primary/18 rounded-md text-primary/85 text-xs leading-relaxed">
                              {stage.safety}
                            </div>
                          )}

                          <div className="pt-2 flex items-center gap-2 text-primary/35 text-[10px] uppercase tracking-[0.2em] group-hover:text-primary/65 transition-colors duration-280">
                            <span>Explore this stage</span>
                            <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-280">→</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
