export type SeekerSignal =
  | "new"
  | "confused"
  | "unstable"
  | "practice"
  | "advanced";

export interface StartGuidancePath {
  id: SeekerSignal;
  label: string;
  signal: string;
  warning?: string;
  startWith: {
    title: string;
    href: string;
    reason: string;
  };
  nextSteps: Array<{
    title: string;
    href: string;
    reason: string;
  }>;
  avoid: string[];
  dailyAnchor: string;
}

export const START_GUIDANCE_PATHS: StartGuidancePath[] = [
  {
    id: "new",
    label: "I am new to the whole map",
    signal: "You need orientation before technique.",
    startWith: {
      title: "Right View — Samyak Darshana",
      href: "/stage/1",
      reason: "Begin by seeing that the problem is misidentification, not lack of exotic technique.",
    },
    nextSteps: [
      {
        title: "Human Architecture",
        href: "/stage/2",
        reason: "Learn the body-prana-mind instrument before trying to purify or control it.",
      },
      {
        title: "Knowledge Roadmap",
        href: "/roadmap",
        reason: "See the full 18-stage river so the journey feels sequential instead of random.",
      },
    ],
    avoid: [
      "Jumping directly into kundalini, strong kumbhaka, or chakra activation",
      "Collecting spiritual terms without understanding the sequence",
    ],
    dailyAnchor: "Observe one moment of identification each day: body, emotion, thought, role, desire, or fear.",
  },
  {
    id: "confused",
    label: "I know many terms but feel confused",
    signal: "You need relationship clarity, not more information.",
    startWith: {
      title: "Glossary Relationship System",
      href: "/glossary",
      reason: "Clarify related terms, not-the-same-as distinctions, and which stage each term belongs to.",
    },
    nextSteps: [
      {
        title: "Inner Science",
        href: "/inner-science",
        reason: "Connect kosha, sharira, prana, chitta, tattva, vayu, nadi, and chakra language without overlap.",
      },
      {
        title: "Stage 2 — Human Architecture",
        href: "/stage/2",
        reason: "Return all maps to one instrument: body, prana, senses, mind, memory, ego, intellect, witness.",
      },
    ],
    avoid: [
      "Treating every tradition word as a separate final truth",
      "Mixing maps without knowing their purpose",
    ],
    dailyAnchor: "Pick one term and ask: what is it, what is it not, and where does it belong in the river?",
  },
  {
    id: "unstable",
    label: "My routine, sleep, food, or emotions are unstable",
    signal: "You need foundation before deeper intensity.",
    startWith: {
      title: "Lifestyle Foundation",
      href: "/stage/5",
      reason: "Food, sleep, rhythm, and energy use shape the body-prana-mind field that practice depends on.",
    },
    nextSteps: [
      {
        title: "Path & Practice Safety Lanes",
        href: "/practice",
        reason: "Use the beginner-safe lane instead of forcing advanced practice into an unstable vessel.",
      },
      {
        title: "Yama & Niyama",
        href: "/stage/3",
        reason: "Stop adding new disturbance and establish sacred alignment before body-prana intensity.",
      },
    ],
    avoid: [
      "Strong fasting, harsh self-control, or guilt-based purity obsession",
      "Using advanced breath/energy work to escape emotional instability",
    ],
    dailyAnchor: "Protect one small rhythm: same wake time, lighter evening input, or ten minutes of quiet sitting.",
  },
  {
    id: "practice",
    label: "I want a safe practical starting routine",
    signal: "You need simple, repeatable practice that does not bypass foundations.",
    startWith: {
      title: "Path & Practice",
      href: "/practice",
      reason: "Choose a readiness lane and keep advanced practices visible but protected.",
    },
    nextSteps: [
      {
        title: "Asana — The Steady Body-Temple",
        href: "/stage/7",
        reason: "Stabilize posture and the nervous system before deeper pranic refinement.",
      },
      {
        title: "Pranayama — Pranic Harmonization",
        href: "/stage/8",
        reason: "Use gentle breath awareness and avoid forced retention unless properly guided.",
      },
    ],
    avoid: [
      "Changing practices every day",
      "Confusing intensity with progress",
    ],
    dailyAnchor: "One steady sequence: clean space, gentle body practice, natural breathing, short mantra or quiet sitting.",
  },
  {
    id: "advanced",
    label: "I am attracted to advanced kriya, chakra, kundalini, bandha, or mudra",
    signal: "You need protection, prerequisites, and qualified guidance.",
    warning: "Advanced does not mean hidden entertainment. It means higher responsibility and stronger safety gates.",
    startWith: {
      title: "Protected Zone — Do Not DIY",
      href: "/practice#protected-zone",
      reason: "See which methods require teacher guidance and what safer alternatives exist first.",
    },
    nextSteps: [
      {
        title: "Antar Kriya — Inner Yogic Technology",
        href: "/stage/11",
        reason: "Understand the purpose of inner yogic technology without turning it into casual internet experimentation.",
      },
      {
        title: "Integrated Yogic Ascent Matrix",
        href: "/stage/11#integrated-yogic-ascent-matrix",
        reason: "Connect kosha, vayu, element, chakra language, and safety instead of forcing energy upward.",
      },
    ],
    avoid: [
      "Forced kumbhaka, strong bandha-mudra combinations, and chakra activation attempts",
      "Claiming spiritual attainment from temporary experiences",
    ],
    dailyAnchor: "Return to Yama, Niyama, lifestyle, steady posture, gentle breath, humility, and qualified guidance.",
  },
];
