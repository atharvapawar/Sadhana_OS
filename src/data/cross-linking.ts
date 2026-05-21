export type CrossLinkTarget = {
  section: "Doctrine" | "Inner Science" | "Path & Practice" | "Glossary";
  href: string;
  title: string;
  connection: string;
};

export type StageCrossLink = {
  stage: number;
  stageSignal: string;
  doctrine: CrossLinkTarget;
  innerScience: CrossLinkTarget;
  practice: CrossLinkTarget;
  glossaryTerms: string[];
  relatedStages: number[];
  integrationPrompt: string;
};

function stageHref(num: number) {
  return `/stage/${num}`;
}

export const STAGE_CROSS_LINKS: Record<number, StageCrossLink> = {
  1: {
    stage: 1,
    stageSignal: "Begin by seeing the false center before adding stronger methods.",
    doctrine: { section: "Doctrine", href: "/", title: "Misidentification and Self-knowledge", connection: "Right View keeps the whole river aimed at freedom from false identity, not spiritual decoration." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Witness and mind-field distinction", connection: "The seeker learns that chitta is observed, while awareness is the knower of the field." },
    practice: { section: "Path & Practice", href: "/practice", title: "Beginner-safe observation", connection: "Start with self-observation, study, and reflection rather than energy techniques." },
    glossaryTerms: ["Avidya", "Asmita", "Sakshi", "Atman", "Viveka", "Chitta"],
    relatedStages: [2, 16, 18],
    integrationPrompt: "What am I calling ‘I’ right now: body, emotion, memory, role, fear, or awareness?",
  },
  2: {
    stage: 2,
    stageSignal: "Map the instrument before trying to transform it.",
    doctrine: { section: "Doctrine", href: "/", title: "The instrument is not the Self", connection: "Human Architecture protects the doctrine from becoming vague by showing what is observed and refined." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Sharira, kosha, prana, chitta maps", connection: "This is the main bridge into all body-prana-mind models used throughout Sadhana OS." },
    practice: { section: "Path & Practice", href: "/practice", title: "Practice by observation first", connection: "Before correcting anything, notice body sensation, breath movement, thought, emotion, and witness separately." },
    glossaryTerms: ["Sharira Traya", "Pancha Kosha", "Antahkarana", "Prana", "Vayu", "Nadi", "Chakra", "Guna", "Dosha", "Tattva"],
    relatedStages: [1, 5, 8],
    integrationPrompt: "Which layer is active: body, breath, emotion, thought, ego, discernment, or witnessing?",
  },
  3: {
    stage: 3,
    stageSignal: "Stop adding new mud through action, speech, grasping, and harm.",
    doctrine: { section: "Doctrine", href: "/", title: "Karma and purification of action", connection: "Yama shows that liberation is not separate from the way one acts in relationship." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Manomaya and Vijnanamaya purification", connection: "Impulse and discernment are refined so prana is not wasted by reactive conduct." },
    practice: { section: "Path & Practice", href: "/practice", title: "Beginner-safe ethical practice", connection: "Practice one yama in daily speech, money, desire, food, or digital behavior." },
    glossaryTerms: ["Ahimsa", "Satya", "Asteya", "Brahmacharya", "Aparigraha", "Karma", "Samskara"],
    relatedStages: [4, 17, 18],
    integrationPrompt: "Which action today will stop feeding agitation in the river?",
  },
  4: {
    stage: 4,
    stageSignal: "Build a sacred rhythm after reducing harmful patterns.",
    doctrine: { section: "Doctrine", href: "/", title: "Discipline, study, surrender", connection: "Niyama turns right view into daily purification, self-study, and surrender." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Sattvic impressions in chitta", connection: "Repeated clean rhythm reshapes mental grooves and strengthens discrimination." },
    practice: { section: "Path & Practice", href: "/practice", title: "Daily rhythm and sacred alignment", connection: "Use simple cleanliness, gratitude, svadhyaya, tapas, and surrender without harshness." },
    glossaryTerms: ["Shaucha", "Santosha", "Tapas", "Svadhyaya", "Ishvara Pranidhana", "Sattva"],
    relatedStages: [3, 5, 12],
    integrationPrompt: "What one small observance will make this day more sattvic and less scattered?",
  },
  5: {
    stage: 5,
    stageSignal: "Stabilize food, sleep, and energy so practice stops fighting the body.",
    doctrine: { section: "Doctrine", href: "/", title: "Ordinary life as spiritual foundation", connection: "Lifestyle Foundation shows that realization is not built on neglect of the vessel." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Annamaya, Pranamaya, guna rhythm", connection: "Food, rest, and energy use shape the body-prana field and mental qualities." },
    practice: { section: "Path & Practice", href: "/practice", title: "Beginner daily rhythm", connection: "Regular sleep, simple nourishment, digital restraint, and steadier routine come before intensity." },
    glossaryTerms: ["Ahara", "Nidra", "Brahmacharya", "Ojas", "Rajas", "Tamas", "Sattva"],
    relatedStages: [4, 6, 7, 8],
    integrationPrompt: "Is my lifestyle making meditation easier or forcing practice to repair avoidable disturbance?",
  },
  6: {
    stage: 6,
    stageSignal: "Clean the channels safely; do not turn cleansing into spectacle.",
    doctrine: { section: "Doctrine", href: "/", title: "Purification without ego-performance", connection: "Shatkarma reminds the seeker that preparation serves clarity, not identity." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Body-prana channel readiness", connection: "Gross and pranic impurities are approached with safety, not force." },
    practice: { section: "Path & Practice", href: "/practice", title: "Protected cleansing gates", connection: "Gentle hygiene is beginner-safe; strong cleansing remains teacher-guided or protected." },
    glossaryTerms: ["Shatkarma", "Neti", "Dhauti", "Nauli", "Kapalabhati", "Trataka"],
    relatedStages: [5, 7, 8],
    integrationPrompt: "Is this cleansing practice reducing heaviness, or is the ego chasing intensity?",
  },
  7: {
    stage: 7,
    stageSignal: "Make the body a steady temple, not a performance project.",
    doctrine: { section: "Doctrine", href: "/", title: "Embodiment without body-identity", connection: "Asana respects the body while keeping it as instrument, not Self." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Annamaya stability and nervous steadiness", connection: "The gross body becomes less disruptive so breath and attention can refine." },
    practice: { section: "Path & Practice", href: "/practice", title: "Gentle grounding and stable sitting", connection: "Favor steadiness, comfort, relaxation, and safe mobility over display." },
    glossaryTerms: ["Asana", "Sthira", "Sukha", "Annamaya Kosha", "Shavasana"],
    relatedStages: [5, 8, 13],
    integrationPrompt: "Can the body become quiet enough that attention no longer keeps negotiating with it?",
  },
  8: {
    stage: 8,
    stageSignal: "Let breath harmonize prana; do not dominate it.",
    doctrine: { section: "Doctrine", href: "/", title: "Life-current as instrument", connection: "Pranayama shows prana is refined for clarity, not possessed as power." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Pranamaya and five vayus", connection: "Breath becomes a gateway into prana, nadi balance, and vayu harmonization." },
    practice: { section: "Path & Practice", href: "/practice", title: "Breath gate", connection: "Natural breath awareness and gentle lengthening are safe; forced retention is protected." },
    glossaryTerms: ["Pranayama", "Prana", "Apana", "Samana", "Vyana", "Udana", "Nadi", "Kumbhaka"],
    relatedStages: [7, 9, 13],
    integrationPrompt: "Is my breath becoming calmer and more honest, or am I forcing it to produce an experience?",
  },
  9: {
    stage: 9,
    stageSignal: "Locks direct prana only after the body-breath base is steadier.",
    doctrine: { section: "Doctrine", href: "/", title: "Power under discernment", connection: "Bandha warns that subtle force without humility can strengthen ego." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Prana-apana regulation", connection: "Bandha belongs to protected body-prana mapping, especially apana, prana, and udana regulation." },
    practice: { section: "Path & Practice", href: "/practice", title: "Teacher-guided energy gate", connection: "Know the purpose, but do not combine strong locks with retention without guidance." },
    glossaryTerms: ["Bandha", "Mula Bandha", "Uddiyana Bandha", "Jalandhara Bandha", "Prana", "Apana"],
    relatedStages: [8, 10, 11],
    integrationPrompt: "Is there enough ethical, lifestyle, posture, and breath stability for this subtle gate?",
  },
  10: {
    stage: 10,
    stageSignal: "Seal awareness, prana, and intention into a conscious circuit.",
    doctrine: { section: "Doctrine", href: "/", title: "Sacred technique without magic-thinking", connection: "Mudra is honored as traditional technology without turning it into superstition or ego display." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Conscious pranic sealing", connection: "Mudra links posture, breath, prana, sense, and attention in subtle-body language." },
    practice: { section: "Path & Practice", href: "/practice", title: "Simple mudra vs protected mudra", connection: "Simple hand mudras are gentle; advanced mudras with locks, tongue, or retention stay protected." },
    glossaryTerms: ["Mudra", "Maha Mudra", "Khechari", "Prana", "Nadi", "Bandha"],
    relatedStages: [9, 11, 12],
    integrationPrompt: "Is this seal helping attention become reverent, or am I using mudra as a trick?",
  },
  11: {
    stage: 11,
    stageSignal: "Inner technology appears only after the instrument is prepared.",
    doctrine: { section: "Doctrine", href: "/", title: "Protected depth without secrecy-chasing", connection: "Antar Kriya acknowledges advanced tradition while refusing unsafe DIY power-seeking." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Nadi, chakra, mantra, prana integration", connection: "This stage is where maps become highly interlinked and therefore strongly safety-gated." },
    practice: { section: "Path & Practice", href: "/practice", title: "Protected zone", connection: "Formal kriya, kundalini, and chakra-force methods are not given as instructions." },
    glossaryTerms: ["Antar Kriya", "Kriya", "Kundalini", "Sushumna", "Granthi", "Chakra", "Nadi"],
    relatedStages: [8, 9, 10, 12],
    integrationPrompt: "Am I prepared by purification, or am I seeking secret methods to bypass the ordinary path?",
  },
  12: {
    stage: 12,
    stageSignal: "Sound becomes a sacred current that steadies the mind-prana field.",
    doctrine: { section: "Doctrine", href: "/", title: "Name, meaning, devotion, and presence", connection: "Mantra joins knowledge with devotion so the path does not become dry technique." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Chitta purification through sound", connection: "Japa shapes impressions, steadies manomaya, and prepares inwardness." },
    practice: { section: "Path & Practice", href: "/practice", title: "Japa with meaning and humility", connection: "Gentle repetition is safe; initiated or intense mantra discipline needs guidance." },
    glossaryTerms: ["Mantra", "Japa", "Ajapa", "Shabda", "Nada", "Bhakti"],
    relatedStages: [4, 11, 13, 14],
    integrationPrompt: "Is the sound making the mind more present, humble, and inward?",
  },
  13: {
    stage: 13,
    stageSignal: "The senses return inward without hatred of the world.",
    doctrine: { section: "Doctrine", href: "/", title: "Freedom from compulsion", connection: "Pratyahara shows that freedom is not sensory suppression but non-compulsion." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Indriya, manas, and attention", connection: "The outward movement of the senses is recognized and gently collected." },
    practice: { section: "Path & Practice", href: "/practice", title: "Sensory discipline", connection: "Short silence, mindful eating, and digital restraint are safe forms of sense-return." },
    glossaryTerms: ["Pratyahara", "Indriya", "Manas", "Vairagya", "Attention"],
    relatedStages: [8, 12, 14],
    integrationPrompt: "Where are the senses leaking attention today, and how can they return without suppression?",
  },
  14: {
    stage: 14,
    stageSignal: "Attention learns to hold one support without scattering.",
    doctrine: { section: "Doctrine", href: "/", title: "Discrimination becomes attention", connection: "Dharana translates right view into collected inner capacity." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Ekagrata in chitta", connection: "The mind-field becomes less fragmented and more capable of one-pointed holding." },
    practice: { section: "Path & Practice", href: "/practice", title: "One object, gentle steadiness", connection: "Use breath, mantra, flame, or body sensation without aggression." },
    glossaryTerms: ["Dharana", "Ekagrata", "Chitta", "Manas", "Sakshi"],
    relatedStages: [13, 15, 16],
    integrationPrompt: "Can attention return to one support without violence toward the mind?",
  },
  15: {
    stage: 15,
    stageSignal: "Holding becomes continuity; continuity becomes meditation.",
    doctrine: { section: "Doctrine", href: "/", title: "Less doer, more continuity", connection: "Dhyana softens the effortful controller and reveals a more continuous awareness-current." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Chitta becomes sattvic and continuous", connection: "Mental interruption decreases and the witness is less obscured by vritti." },
    practice: { section: "Path & Practice", href: "/practice", title: "Non-forcing meditation", connection: "Sit longer only with steadiness; do not chase visions, blankness, or spiritual identity." },
    glossaryTerms: ["Dhyana", "Vritti", "Sakshi", "Sattva", "Meditation"],
    relatedStages: [14, 16, 17],
    integrationPrompt: "Is meditation becoming a quiet current, or am I still trying to manufacture a state?",
  },
  16: {
    stage: 16,
    stageSignal: "Absorption loosens the separate knower; it is not a performance identity.",
    doctrine: { section: "Doctrine", href: "/", title: "Beyond the separate knower", connection: "Samadhi clarifies why the path is not merely calmness but loosening of egoic centrality." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Chitta, asmita, purusha distinction", connection: "The mind-field grows still enough that the knower-known structure is transformed." },
    practice: { section: "Path & Practice", href: "/practice", title: "Do not chase samadhi", connection: "Prepare through the previous limbs; deep absorption and strong experiences need guidance." },
    glossaryTerms: ["Samadhi", "Asmita", "Purusha", "Kaivalya", "Atman", "Brahman"],
    relatedStages: [1, 15, 17, 18],
    integrationPrompt: "Does this experience reduce egoic claiming, or has it become a new identity?",
  },
  17: {
    stage: 17,
    stageSignal: "The test of inner clarity is speech, action, relationship, and responsibility.",
    doctrine: { section: "Doctrine", href: "/", title: "Jivanmukti and integration", connection: "Sacred Integration prevents state-chasing by bringing realization into ordinary life." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "Samskara transformation in life", connection: "The koshas become less opaque as old reactions soften in relationship and action." },
    practice: { section: "Path & Practice", href: "/practice", title: "Pause, speak truthfully, serve", connection: "Integration is practiced in duty, humility, non-reactivity, and service." },
    glossaryTerms: ["Jivanmukti", "Dharma", "Seva", "Equanimity", "Samskara", "Humility"],
    relatedStages: [3, 15, 16, 18],
    integrationPrompt: "Is inner clarity visible in how I speak, decide, serve, and repair harm?",
  },
  18: {
    stage: 18,
    stageSignal: "Life itself becomes yoga through awareness, duty, service, and non-clinging.",
    doctrine: { section: "Doctrine", href: "/", title: "Karma Yoga as living awareness", connection: "The final stage completes the river through action without selfish ownership of fruits." },
    innerScience: { section: "Inner Science", href: "/inner-science", title: "All koshas transparent to awareness", connection: "No layer is rejected; the whole instrument becomes a vehicle for humble action." },
    practice: { section: "Path & Practice", href: "/practice", title: "Action without clinging", connection: "Do the work carefully, offer results, reduce claiming, and keep serving." },
    glossaryTerms: ["Karma Yoga", "Nishkama Karma", "Sahaja", "Dharma", "Seva", "Jivanmukti"],
    relatedStages: [1, 3, 16, 17],
    integrationPrompt: "Can action happen fully without egoic possession of the result?",
  },
} as const;
