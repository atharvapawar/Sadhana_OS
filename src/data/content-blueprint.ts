export type SectionKey = "doctrine" | "roadmap" | "inner-science" | "practice" | "glossary";
export type Gate = "green" | "amber" | "red";

export const CONTENT_BLUEPRINT = {
  northStar: "The Yogic River from Misidentification to Living Awareness",
  movement: [
    "Misidentification",
    "Right Seeing",
    "Purification & Foundation",
    "Body-Prana Stabilization",
    "Interiorization & Meditation",
    "Living Realization",
  ],
  sections: [
    {
      key: "doctrine" as SectionKey,
      title: "Doctrine",
      question: "What is the real problem, what is liberation, and what view protects the path?",
      role: "Holds the highest view: Self, misidentification, bondage, liberation, karma, dharma, moksha, kaivalya, jivanmukti, and living awareness.",
    },
    {
      key: "roadmap" as SectionKey,
      title: "Knowledge Roadmap",
      question: "What is the sequence of transformation?",
      role: "Holds the 18-stage river sequence and explains why each stage comes before the next.",
    },
    {
      key: "inner-science" as SectionKey,
      title: "Inner Science",
      question: "What is the human instrument?",
      role: "Holds the maps of sharira, kosha, tattva, prana, vayu, nadi, chakra, guna, dosha, antahkarana, and witness distinction.",
    },
    {
      key: "practice" as SectionKey,
      title: "Path & Practice",
      question: "What should a seeker safely do now?",
      role: "Holds safe routines, readiness levels, sequencing, practice lanes, integration, warnings, and teacher-only gates.",
    },
    {
      key: "glossary" as SectionKey,
      title: "Glossary",
      question: "What does this term mean, what is it related to, and what is it not?",
      role: "Holds definitions, distinctions, related terms, stage usage, and overlap resolution.",
    },
  ],
} as const;

export const STAGE_INTELLIGENCE_TEMPLATE = [
  "Essence",
  "Why this stage comes here",
  "What it purifies or stabilizes",
  "Connected concepts",
  "Beginner-safe practice",
  "Common mistake",
  "Teacher-guided depth",
  "How it supports the next stage",
] as const;

export const SAFETY_GATE_RULES = [
  {
    gate: "green" as Gate,
    title: "Beginner-Safe",
    rule: "Study, reflection, yama, niyama, gentle asana, natural breath awareness, simple japa, gratitude, normal meditation, and karma yoga reflection.",
  },
  {
    gate: "amber" as Gate,
    title: "Guided",
    rule: "Long sittings, intensified pranayama, mantra discipline, chakra contemplation, extended tapas, deeper pratyahara, and prolonged silence need maturity and guidance.",
  },
  {
    gate: "red" as Gate,
    title: "Teacher-Only",
    rule: "Forced kumbhaka, strong bandha stacks, kundalini activation, khechari attempts, intense kriyas, extreme fasting, sleep deprivation, chakra forcing, and energy manipulation are not DIY.",
  },
] as const;

export const OVERLAP_RESOLVER = [
  { term: "Atman", distinction: "Self / pure awareness; not personality, memory, mood, or blissful experience." },
  { term: "Sakshi", distinction: "Witness aspect recognized in experience; not a mental function." },
  { term: "Purusha", distinction: "Consciousness principle in Yoga/Sankhya language; related to but not always used identically to Vedantic Atman." },
  { term: "Chitta", distinction: "Mind-field, memory/impression field; not the Self." },
  { term: "Manas", distinction: "Sensory mind / coordinator; not the whole mind-system by itself." },
  { term: "Buddhi", distinction: "Discriminating intelligence; the faculty that can recognize the path clearly." },
  { term: "Ahamkara", distinction: "I-maker / ego-function; the claim of ownership over experience." },
  { term: "Kosha", distinction: "Sheath/layer of experience; even the bliss sheath is observed and is not final Self." },
  { term: "Sharira", distinction: "Body-level framework: gross, subtle, causal." },
  { term: "Tattva", distinction: "Principle/category of manifestation; not simply a body part." },
  { term: "Prana", distinction: "Life-force principle in Yogic Science; not merely oxygen or breathing mechanics." },
  { term: "Vayu", distinction: "Pranic function/direction within the traditional map." },
  { term: "Nadi", distinction: "Subtle channel map; not a one-to-one modern anatomical nerve claim." },
  { term: "Chakra", distinction: "Subtle center map; not a casual visualization toy or guaranteed activation system." },
  { term: "Dharana", distinction: "Held one-pointedness; the attention is gathered." },
  { term: "Dhyana", distinction: "Continuous meditation flow; the gap in attention reduces." },
  { term: "Samadhi", distinction: "Absorption beyond the normal separate-knower structure; not merely a remembered experience." },
  { term: "Moksha / Kaivalya / Jivanmukti / Sahaja", distinction: "Related liberation languages; explain distinctions without turning them into competing goals." },
] as const;
