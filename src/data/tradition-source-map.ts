export type SourceStreamKey =
  | "yoga-sutra"
  | "gita-karma-yoga"
  | "vedanta-upanishad"
  | "hatha-yoga"
  | "ayurveda-inner-science"
  | "safety-modern";

export type SourceStream = {
  key: SourceStreamKey;
  label: string;
  role: string;
  guardrail: string;
};

export type StageSourceLens = {
  stage: number;
  primaryStreams: SourceStreamKey[];
  sourceLogic: string;
  integrationRule: string;
  guardrail: string;
  notAClaim: string;
};

export const SOURCE_STREAMS: Record<SourceStreamKey, SourceStream> = {
  "yoga-sutra": {
    key: "yoga-sutra",
    label: "Patanjali / Raja Yoga",
    role: "Gives the outer-to-inner practice spine: restraint, observance, posture, breath, sense return, concentration, meditation, and samadhi.",
    guardrail: "Use as the sequence spine, not as a license to jump into absorption practices without preparation.",
  },
  "gita-karma-yoga": {
    key: "gita-karma-yoga",
    label: "Bhagavad Gita / Karma Yoga",
    role: "Completes realization in action: duty, non-clinging, humility, offering, and freedom from fruit-obsession.",
    guardrail: "Use to integrate realization into life, not to justify passivity, fatalism, or spiritual bypassing.",
  },
  "vedanta-upanishad": {
    key: "vedanta-upanishad",
    label: "Vedanta / Upanishadic Self-Knowledge",
    role: "Clarifies Self, witness, kosha, misidentification, and the distinction between instrument and awareness.",
    guardrail: "Use for right seeing and discrimination; do not reduce realization to intellectual agreement.",
  },
  "hatha-yoga": {
    key: "hatha-yoga",
    label: "Hatha Yoga / Body-Prana Technology",
    role: "Explains cleansing, posture, breath, bandha, mudra, and protected inner techniques as preparation and refinement.",
    guardrail: "Keep powerful practices safety-gated; do not turn advanced methods into casual DIY instructions.",
  },
  "ayurveda-inner-science": {
    key: "ayurveda-inner-science",
    label: "Ayurveda & Inner Science Lens",
    role: "Maps body, lifestyle, guna, dosha, bhuta, kosha, prana, vayu, nadi, and constitution as practical support systems.",
    guardrail: "Use as traditional framework language, not as medical diagnosis or replacement for professional care.",
  },
  "safety-modern": {
    key: "safety-modern",
    label: "Modern Safety & Accessibility Lens",
    role: "Keeps the site practical, trauma-aware, mobile-readable, beginner-safe, and clear about teacher-guided practices.",
    guardrail: "Use to protect users from forcing, over-practice, medical confusion, and spiritual grandiosity.",
  },
};

export const STAGE_SOURCE_LENS: Record<number, StageSourceLens> = {
  1: {
    stage: 1,
    primaryStreams: ["vedanta-upanishad", "yoga-sutra", "safety-modern"],
    sourceLogic: "Right View begins with discrimination: the seeker notices false identity and the movement of chitta before technique becomes central.",
    integrationRule: "Use Vedantic orientation to name misidentification, then use Yoga discipline to make that seeing practical.",
    guardrail: "Do not present Right View as belief, ideology, or intellectual superiority.",
    notAClaim: "This stage introduces Self-knowledge language; it does not claim the user has direct realization yet.",
  },
  2: {
    stage: 2,
    primaryStreams: ["vedanta-upanishad", "ayurveda-inner-science", "yoga-sutra"],
    sourceLogic: "Human Architecture gathers the maps of body, prana, mind, kosha, guna, dosha, and witness so practice has a clear instrument-map.",
    integrationRule: "Treat every map as functional: it clarifies what is being purified, stabilized, observed, or transcended.",
    guardrail: "Do not confuse the map with realization or present subtle maps as modern anatomy.",
    notAClaim: "Kosha, chakra, vayu, and tattva language is presented as traditional inner-science mapping, not laboratory measurement.",
  },
  3: {
    stage: 3,
    primaryStreams: ["yoga-sutra", "gita-karma-yoga", "safety-modern"],
    sourceLogic: "Yama is where conduct stops feeding turbulence; ethics become purification of action, speech, relationship, and impulse.",
    integrationRule: "Connect restraint with energy conservation and karmic hygiene, not mere social morality.",
    guardrail: "Do not turn ethics into shame, superiority, or fear-based purity obsession.",
    notAClaim: "Ethical purification supports yoga; it is not a badge of spiritual rank.",
  },
  4: {
    stage: 4,
    primaryStreams: ["yoga-sutra", "gita-karma-yoga", "vedanta-upanishad"],
    sourceLogic: "Niyama turns practice into sacred daily alignment through purity, contentment, discipline, study, and surrender.",
    integrationRule: "Let discipline soften ego and build steadiness; connect study and surrender to right seeing.",
    guardrail: "Do not make tapas harsh, performative, or self-punishing.",
    notAClaim: "Sacred alignment is a rhythm of life, not a guarantee of mystical experience.",
  },
  5: {
    stage: 5,
    primaryStreams: ["ayurveda-inner-science", "gita-karma-yoga", "safety-modern"],
    sourceLogic: "Lifestyle Foundation stabilizes food, sleep, routine, and energy use so body and prana stop resisting practice.",
    integrationRule: "Use ahara, nidra, and brahmacharya as intelligent conservation, not extreme control.",
    guardrail: "Avoid extreme fasting, guilt-based purity, sleep deprivation, or forced celibacy obsession.",
    notAClaim: "Lifestyle refinement supports clarity; it is not medical treatment or moral ranking.",
  },
  6: {
    stage: 6,
    primaryStreams: ["hatha-yoga", "ayurveda-inner-science", "safety-modern"],
    sourceLogic: "Shatkarma belongs to the cleansing current: traditional purification is acknowledged but strongly safety-gated.",
    integrationRule: "Present the purpose and prerequisites; keep strong cleansing methods protected.",
    guardrail: "No aggressive DIY dhauti, basti, nauli, strong kapalabhati, or extreme cleansing protocols.",
    notAClaim: "Cleansing language is traditional preparation, not a universal prescription.",
  },
  7: {
    stage: 7,
    primaryStreams: ["yoga-sutra", "hatha-yoga", "safety-modern"],
    sourceLogic: "Asana makes the body-temple stable enough for breath, sitting, and inner attention.",
    integrationRule: "Use posture as steadiness and availability, not body-performance identity.",
    guardrail: "Do not imply advanced postures or inversions are required spiritual milestones.",
    notAClaim: "Asana supports meditation; it is not the whole of yoga.",
  },
  8: {
    stage: 8,
    primaryStreams: ["yoga-sutra", "hatha-yoga", "ayurveda-inner-science", "safety-modern"],
    sourceLogic: "Pranayama bridges body and subtle practice by harmonizing breath and pranic rhythm after basic stability exists.",
    integrationRule: "Start with natural regulation and gentle awareness before any stronger pranic technique.",
    guardrail: "No forced kumbhaka, aggressive ratios, hyperventilation, or bandha-combined retention without guidance.",
    notAClaim: "Pranic language is traditional functional mapping, not a substitute for respiratory or medical care.",
  },
  9: {
    stage: 9,
    primaryStreams: ["hatha-yoga", "ayurveda-inner-science", "safety-modern"],
    sourceLogic: "Bandha is treated as a protected energetic lock that redirects pranic movement only after steadiness and breath safety.",
    integrationRule: "Explain purpose and respect prerequisites; keep forceful locks teacher-guided.",
    guardrail: "Do not teach strong locks, retention-plus-bandha, or kriya-bandha combinations as DIY.",
    notAClaim: "Bandha is not muscular squeezing or a shortcut to awakening.",
  },
  10: {
    stage: 10,
    primaryStreams: ["hatha-yoga", "vedanta-upanishad", "safety-modern"],
    sourceLogic: "Mudra is framed as conscious sealing of prana, attention, and intention rather than a magic gesture.",
    integrationRule: "Separate simple symbolic mudras from advanced body-prana mudras.",
    guardrail: "Protect advanced mudras involving tongue, retention, locks, or intense kundalini pressure.",
    notAClaim: "Mudra supports inwardness; it does not mechanically produce realization.",
  },
  11: {
    stage: 11,
    primaryStreams: ["hatha-yoga", "yoga-sutra", "safety-modern"],
    sourceLogic: "Antar Kriya acknowledges inner yogic technology while protecting it from casual technique-chasing.",
    integrationRule: "Describe purpose, prerequisites, and safer alternatives; do not publish secret-sequence instructions.",
    guardrail: "No DIY kundalini activation, chakra forcing, formal kriya sequences, or intense subtle-body manipulations.",
    notAClaim: "The site recognizes advanced kriya traditions but does not initiate or authorize practice.",
  },
  12: {
    stage: 12,
    primaryStreams: ["vedanta-upanishad", "gita-karma-yoga", "yoga-sutra"],
    sourceLogic: "Mantra becomes the sound current that steadies chitta, purifies intention, and can bridge devotion, attention, and inner silence.",
    integrationRule: "Use mantra as sacred repetition with meaning and humility, not mechanical accumulation.",
    guardrail: "Keep bija/intense/initiated mantra practices teacher-guided where appropriate.",
    notAClaim: "Mantra supports purification; repetition count alone is not realization.",
  },
  13: {
    stage: 13,
    primaryStreams: ["yoga-sutra", "safety-modern", "ayurveda-inner-science"],
    sourceLogic: "Pratyahara returns the senses inward so attention stops leaking through compulsion and stimulation.",
    integrationRule: "Teach inward return as freedom from compulsion, not hatred of the world.",
    guardrail: "Avoid suppression, isolation, dissociation, or anti-body spirituality.",
    notAClaim: "Sense return is a training of attention, not social withdrawal or denial of life.",
  },
  14: {
    stage: 14,
    primaryStreams: ["yoga-sutra", "vedanta-upanishad", "safety-modern"],
    sourceLogic: "Dharana gathers attention into one-pointed holding after the senses have become less scattered.",
    integrationRule: "Clarify concentration as trained steadiness, not blankness or strain.",
    guardrail: "Do not push rigid concentration that creates tension, dissociation, or headache-like forcing.",
    notAClaim: "Dharana is a doorway to meditation, not the same as samadhi.",
  },
  15: {
    stage: 15,
    primaryStreams: ["yoga-sutra", "vedanta-upanishad", "safety-modern"],
    sourceLogic: "Dhyana is unbroken flow: attention becomes continuous rather than repeatedly reassembled.",
    integrationRule: "Present meditation as continuity of awareness, not entertainment, visions, or spiritual drama.",
    guardrail: "Do not encourage chasing blankness, dissociation, or extraordinary experiences.",
    notAClaim: "Meditative continuity may arise gradually; temporary calm is not final realization.",
  },
  16: {
    stage: 16,
    primaryStreams: ["yoga-sutra", "vedanta-upanishad", "safety-modern"],
    sourceLogic: "Samadhi points to absorption beyond the separate knower, while the site guards against premature final claims.",
    integrationRule: "Distinguish deep absorption from ego identity around special states.",
    guardrail: "Do not teach state-chasing, kundalini forcing, long-retreat intensity, or final-realization claims.",
    notAClaim: "The stage describes traditional language for absorption; it does not certify anyone's enlightenment.",
  },
  17: {
    stage: 17,
    primaryStreams: ["gita-karma-yoga", "vedanta-upanishad", "safety-modern"],
    sourceLogic: "Sacred Integration tests whether insight reshapes ordinary speech, conduct, relationship, service, and responsibility.",
    integrationRule: "Bring stillness into ordinary life before claiming maturity.",
    guardrail: "Do not use spiritual experience to avoid work, family, ethics, mental health, or accountability.",
    notAClaim: "Integration is ongoing embodiment, not a public declaration of attainment.",
  },
  18: {
    stage: 18,
    primaryStreams: ["gita-karma-yoga", "vedanta-upanishad", "yoga-sutra", "safety-modern"],
    sourceLogic: "Sahaja Karma Yoga closes the river by showing living awareness as humble action without clinging to fruits.",
    integrationRule: "Let awareness express as duty, service, non-claiming, and ordinary responsibility.",
    guardrail: "Do not frame realization as passivity, superiority, or escape from embodied life.",
    notAClaim: "The final stage describes the mature direction of the path, not a label the site grants to the user.",
  },
};
