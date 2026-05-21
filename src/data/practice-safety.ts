export type PracticeLaneId = "beginner" | "steady" | "teacher-guided" | "do-not-diy";

export interface PracticeLane {
  id: PracticeLaneId;
  label: string;
  title: string;
  readiness: string;
  purpose: string;
  safeFocus: string[];
  avoid: string[];
  nextGate: string;
}

export interface DailyRhythmBlock {
  period: string;
  intention: string;
  practices: string[];
  safety: string;
}

export interface SafetyGate {
  title: string;
  principle: string;
  green: string[];
  yellow: string[];
  red: string[];
}

export interface ProtectedPractice {
  name: string;
  existsFor: string;
  whyProtected: string;
  prerequisite: string;
  safeAlternative: string;
  lane: PracticeLaneId;
}

export const PRACTICE_LANES: PracticeLane[] = [
  {
    id: "beginner",
    label: "Lane I",
    title: "Beginner-Safe Foundation",
    readiness: "New, inconsistent, restless, or rebuilding from zero.",
    purpose: "Build the container before intensity: ethics, lifestyle, gentle body stability, natural breath, and simple awareness.",
    safeFocus: [
      "Right View reflection and one honest journal line",
      "Yama/Niyama awareness in speech, food, sleep, and desire",
      "Gentle asana or mobility without pain performance",
      "Natural breath observation and soft lengthening without retention",
      "Short mantra, silence, or witness-noticing",
    ],
    avoid: [
      "Forced kumbhaka, aggressive breath ratios, or breath-holding contests",
      "Kundalini activation attempts, chakra forcing, or energy chasing",
      "Strong cleansing, extreme fasting, or advanced mudra/bandha practice",
    ],
    nextGate: "Move forward only when practice is steady, sleep and mood are stable, and intensity is not being used to escape life.",
  },
  {
    id: "steady",
    label: "Lane II",
    title: "Steady Practitioner",
    readiness: "Consistent for weeks or months, grounded in daily life, and not chasing dramatic experiences.",
    purpose: "Deepen continuity: steadier sitting, sattvic lifestyle, safe pranayama, mantra, pratyahara, and karma yoga.",
    safeFocus: [
      "Longer sitting with calm preparation and calm closing",
      "Nadi shodhana-style balancing without strain or long retention",
      "Mantra japa with one chosen mantra rather than collecting many",
      "Sense restraint through silence, screen discipline, mindful eating, and simplicity",
      "Action as offering: duty without clinging to personal fruit",
    ],
    avoid: [
      "Increasing practice because of pride, fear, comparison, or spiritual ambition",
      "Mixing many intense methods at once",
      "Confusing dissociation, blankness, or emotional numbness with meditation",
    ],
    nextGate: "Seek guidance when breath, energy, mantra, or concentration begins to intensify beyond ordinary steadiness.",
  },
  {
    id: "teacher-guided",
    label: "Lane III",
    title: "Teacher-Guided Depth",
    readiness: "Stable lifestyle, steady practice, humility, and access to a qualified teacher or mature lineage context.",
    purpose: "Approach powerful traditional technologies through preparation, supervision, and integration rather than curiosity.",
    safeFocus: [
      "Pranayama sequencing chosen for constitution and readiness",
      "Bandha and mudra taught progressively and gently",
      "Mantra depth with lineage context where relevant",
      "Subtle concentration only after grounding and psychological stability",
      "Integration through service, responsibility, and ordinary duties",
    ],
    avoid: [
      "DIY advanced kriya, kundalini triggering, or secret techniques from random sources",
      "Practicing through warning signs to prove strength",
      "Treating visions, bliss, or power as proof of realization",
    ],
    nextGate: "Depth is permitted by maturity, not by curiosity. If humility, health, and grounding weaken, return to foundation.",
  },
  {
    id: "do-not-diy",
    label: "Protected Zone",
    title: "Do Not DIY",
    readiness: "Not a practice lane. This is a boundary for advanced or destabilizing techniques.",
    purpose: "Make advanced territory visible as traditional knowledge while clearly preventing unsafe self-experimentation.",
    safeFocus: [
      "Understand that these methods exist in tradition",
      "Study their purpose at a conceptual level",
      "Strengthen Yama, Niyama, lifestyle, asana, gentle breath, mantra, and grounding",
      "Find qualified guidance instead of imitating techniques",
    ],
    avoid: [
      "Forced kundalini practices or chakra activation attempts",
      "Long retention, strong locks, or intense cleansing without guidance",
      "Any practice that destabilizes sleep, mood, breath, digestion, or daily functioning",
    ],
    nextGate: "The safe alternative is always to return to foundation and seek qualified in-person guidance when depth is truly appropriate.",
  },
];

export const DAILY_RHYTHM: DailyRhythmBlock[] = [
  {
    period: "Morning — Clean Beginning",
    intention: "Start the river before the world pulls the senses outward.",
    practices: [
      "One minute of Right View remembrance: I am not merely the body-mind story.",
      "Gentle body opening or steady seat preparation.",
      "Natural breath observation or simple balanced breathing without retention.",
      "Short mantra, prayer, or witness-based silence.",
    ],
    safety: "Keep it calm enough that you can repeat it daily without strain.",
  },
  {
    period: "Daytime — Karma Yoga Field",
    intention: "Turn ordinary action into purification instead of adding new mud.",
    practices: [
      "Before action: clarify duty and intention.",
      "During action: return to breath, posture, speech, and non-grasping.",
      "After action: release result ownership and correct mistakes honestly.",
    ],
    safety: "Non-attachment never means irresponsibility, avoidance, or emotional coldness.",
  },
  {
    period: "Evening — Integration Review",
    intention: "Digest the day so impressions do not silently harden into samskara.",
    practices: [
      "Review one moment of reactivity without self-hatred.",
      "Review one moment of clarity with gratitude, not pride.",
      "Soften the body, breath, and speech before sleep.",
    ],
    safety: "End with grounding, not self-criticism or spiritual pressure.",
  },
];

export const SAFETY_GATES: SafetyGate[] = [
  {
    title: "Breath Gate",
    principle: "Pranayama should harmonize prana, not dominate the nervous system.",
    green: ["Breath feels smooth", "Face and jaw stay relaxed", "Practice improves steadiness after closing"],
    yellow: ["Mild agitation", "Heat or pressure", "Compulsion to increase ratios"],
    red: ["Panic, dizziness, chest pain, faintness, or breath struggle", "Stop and seek qualified support"],
  },
  {
    title: "Energy Gate",
    principle: "Subtle force must be contained by ethics, lifestyle, humility, and grounding.",
    green: ["More calm in ordinary duties", "Less reactivity", "Better sleep and digestion"],
    yellow: ["Spiritual superiority", "Experience chasing", "Unusual intensity without integration"],
    red: ["Insomnia, destabilized mood, fear, dissociation, or loss of daily functioning", "Return to grounding and seek help"],
  },
  {
    title: "Meditation Gate",
    principle: "Meditation should clarify identification, not create a new spiritual identity.",
    green: ["More simplicity", "More honesty", "More capacity for responsibility"],
    yellow: ["Blankness mistaken for wisdom", "Avoiding relationships", "Judging others as less awake"],
    red: ["Detachment from reality, inability to function, or extreme withdrawal", "Stop intensifying practice and seek guidance"],
  },
];

export const PROTECTED_PRACTICES: ProtectedPractice[] = [
  {
    name: "Forced Kumbhaka & Strong Ratios",
    existsFor: "Traditional breath refinement, concentration, and pranic containment.",
    whyProtected: "Retention and strong ratios can destabilize breath, pressure, anxiety, sleep, and the nervous system when forced.",
    prerequisite: "Stable health, gentle breath mastery, mature guidance, and gradual progression.",
    safeAlternative: "Natural breath awareness, relaxed exhale lengthening, and gentle balanced breathing without retention.",
    lane: "do-not-diy",
  },
  {
    name: "Advanced Bandha-Mudra Combinations",
    existsFor: "Redirecting and sealing pranic movement in mature Hatha/Kriya contexts.",
    whyProtected: "Locks and seals amplify practice; used too early, they often become tension, pressure, or egoic energy manipulation.",
    prerequisite: "Ethics, lifestyle, asana stability, safe pranayama, and direct teacher instruction.",
    safeAlternative: "Gentle posture-root awareness and simple hand mudras as symbolic supports.",
    lane: "teacher-guided",
  },
  {
    name: "Kundalini / Chakra Activation Attempts",
    existsFor: "Traditional inner transformation language around subtle-force awakening and purification.",
    whyProtected: "Activation-seeking can create fear, fantasy, imbalance, dissociation, or spiritual pride.",
    prerequisite: "Long preparation, grounding, teacher oversight, mental stability, and mature integration.",
    safeAlternative: "Study the map, practice Yama/Niyama, stabilize breath, and use grounded mantra or devotion.",
    lane: "do-not-diy",
  },
  {
    name: "Strong Shatkarma & Extreme Fasting",
    existsFor: "Traditional cleansing and preparation of the body-prana system.",
    whyProtected: "Intense cleansing or fasting can be physically risky and can become purification obsession.",
    prerequisite: "Medical common sense, teacher guidance, constitution awareness, and no forceful extremes.",
    safeAlternative: "Clean food rhythm, sleep discipline, hydration, simplicity, and gentle hygiene-level practices.",
    lane: "teacher-guided",
  },
];
