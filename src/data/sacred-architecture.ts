export type SafetyLevel = "safe" | "guided" | "teacher-only";

export const PRINCIPLES = [
  {
    title: "Understand first, practice second",
    body: "The portal starts with orientation: Atman is not created by practice; practice clarifies the instrument so direct seeing becomes possible.",
  },
  {
    title: "Gross to subtle, never random jumping",
    body: "Ethics, lifestyle, body, breath, senses, concentration, meditation, samadhi, and living integration are kept in sequence.",
  },
  {
    title: "Safety gates before power practices",
    body: "Kumbhaka, bandha, mudra, kriya, kundalini, and advanced pranayama are visible as knowledge but marked as teacher-guided or teacher-only where needed.",
  },
  {
    title: "One truth, many maps",
    body: "Koshas, tattvas, chakras, pranas, gunas, Vedanta, Bhakti, Tantra, and Raja Yoga are woven as connected maps instead of repeated isolated topics.",
  },
];

export const KNOWLEDGE_ROOMS = [
  {
    title: "Orientation Chamber",
    subtitle: "What is being purified? Who is the witness?",
    route: "/stage/1",
    level: "safe" as SafetyLevel,
    includes: ["Atman vs instrument", "Chitta vritti", "Viveka", "suffering diagnosis"],
  },
  {
    title: "Human Instrument Atlas",
    subtitle: "Koshas, tattvas, pranas, gunas, antahkarana, sharira traya.",
    route: "/inner-science",
    level: "safe" as SafetyLevel,
    includes: ["Pancha kosha", "Pancha prana", "Avastha traya", "three bodies"],
  },
  {
    title: "Practice Builder",
    subtitle: "Choose a safe daily track without pretending advanced readiness.",
    route: "/practice",
    level: "safe" as SafetyLevel,
    includes: ["beginner", "intermediate", "teacher-guided", "daily integration"],
  },
  {
    title: "Advanced Vault",
    subtitle: "Know that advanced methods exist, but do not self-initiate them.",
    route: "/experience#advanced-vault",
    level: "teacher-only" as SafetyLevel,
    includes: ["kumbhaka", "bandha", "mudra", "kriya", "kundalini", "khechari"],
  },
  {
    title: "Living Dharma Lab",
    subtitle: "Convert daily action into mind-emptying karma yoga.",
    route: "/experience#living-dharma",
    level: "safe" as SafetyLevel,
    includes: ["non-ownership", "presence", "work as sadhana", "relationship purification"],
  },
  {
    title: "Liberation Map",
    subtitle: "Samadhi is direct experience; mature freedom is lived awareness.",
    route: "/stage/18",
    level: "guided" as SafetyLevel,
    includes: ["dhyana", "samadhi", "jnana", "sahaja", "moksha"],
  },
];

export const SAFETY_GATES = [
  {
    gate: "Green Gate",
    level: "safe" as SafetyLevel,
    rule: "Study, reflection, gentle asana, normal breathing awareness, yama-niyama, japa, gratitude, and daily karma yoga are generally safe for normal healthy adults.",
  },
  {
    gate: "Amber Gate",
    level: "guided" as SafetyLevel,
    rule: "Long sittings, intensified pranayama, mantra discipline, pratyahara, chakra contemplation, and extended tapas need maturity, stability, and preferably a teacher.",
  },
  {
    gate: "Red Gate",
    level: "teacher-only" as SafetyLevel,
    rule: "Forced kumbhaka, strong bandhas, kundalini activation, khechari attempts, intense kriyas, extreme fasting, and energy manipulation are not DIY practices.",
  },
];

export const PRACTICE_STACKS = {
  beginner: {
    title: "Foundation Track",
    duration: "25–45 min/day",
    aim: "Make the river less muddy without creating strain.",
    steps: ["3 min still sitting", "8–12 min light mobility/asana", "5 min natural breath observation", "5–10 min mantra or witness meditation", "2 min yama-niyama reflection"],
    warning: "Do not add retention, bandha, or kundalini methods. Build stability first.",
  },
  steady: {
    title: "Steady Practitioner Track",
    duration: "45–75 min/day",
    aim: "Deepen concentration and regulate prana without aggression.",
    steps: ["Short purification routine", "20 min asana", "gentle nadi-shodhana without strain", "japa or dharana", "karma-yoga review"],
    warning: "Increase time slowly. Any anxiety, heat, pressure, insomnia, or dissociation means reduce intensity.",
  },
  guided: {
    title: "Teacher-Guided Track",
    duration: "Variable",
    aim: "Refine subtle practice only under real guidance.",
    steps: ["Teacher assessment", "lineage-specific method", "careful progression", "integration in ordinary life", "no spiritual performance"],
    warning: "This site gives orientation, not initiation. Advanced method details are intentionally gated.",
  },
};

export const ADVANCED_VAULT = [
  "Forced or long kumbhaka",
  "Mula, Uddiyana, Jalandhara and Maha Bandha as power practice",
  "Kundalini activation attempts",
  "Khechari mudra attempts",
  "Intense kriya systems without initiation",
  "Extreme fasting or sleep deprivation",
  "Chakra forcing, visualization pressure, or energy manipulation",
  "Claims of guaranteed siddhi, instant awakening, or secret shortcuts",
];

export const SOURCE_STREAMS = [
  "Patanjali Yoga Sutra — mind, discipline, samadhi, kaivalya",
  "Bhagavad Gita — karma yoga, bhakti, jnana, equanimity in action",
  "Upanishadic Vedanta — Atman, witness, neti-neti, liberation knowledge",
  "Hatha Yoga Pradipika / Gheranda Samhita — body-prana technologies with caution",
  "Ayurveda and Yogic lifestyle — ahara, nidra, brahmacharya, sattva",
  "Modern safety lens — nervous-system regulation, gradual progression, medical caution",
];
