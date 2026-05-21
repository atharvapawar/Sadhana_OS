export type InnerScienceGate = "green" | "amber" | "red";

export const INNER_SCIENCE_NORTH_STAR = {
  title: "Inner Science Concept Map",
  subtitle: "How the human instrument becomes transparent to living awareness.",
  principle:
    "These maps are traditional contemplative frameworks. They guide self-understanding and safe practice sequencing; they are not one-to-one modern anatomy claims and not an invitation to force advanced techniques.",
} as const;

export const INNER_SCIENCE_SYSTEMS = [
  {
    title: "Sharira Traya",
    subtitle: "Three Bodies",
    essence: "The seeker learns that experience operates through gross, subtle, and causal layers, while awareness itself is not limited to any layer.",
    riverRole: "Gives map literacy before technique becomes important.",
    stages: "01–02, 16–18",
    items: [
      { name: "Sthula Sharira", meaning: "Gross body", function: "Physical embodiment, food-based structure, action in the world." },
      { name: "Sukshma Sharira", meaning: "Subtle body", function: "Prana, senses, mind, ego-function, memory patterns, and subtle experience." },
      { name: "Karana Sharira", meaning: "Causal body", function: "Seed layer of ignorance, deep tendencies, and unmanifest impressions." },
      { name: "Sakshi / Atman", meaning: "Witness / Self", function: "The aware principle that knows the bodies but is not reduced to them." },
    ],
    safety: "Do not use subtle-body language to ignore physical health, emotions, relationships, or responsibility.",
  },
  {
    title: "Pancha Kosha",
    subtitle: "Five Sheaths",
    essence: "The koshas show how identity moves from gross body to energy, mind, discernment, and bliss — yet even bliss is witnessed.",
    riverRole: "Prevents the seeker from mistaking refined experience for final realization.",
    stages: "02–18",
    items: [
      { name: "Annamaya", meaning: "Food sheath", function: "Body, nourishment, posture, sleep, and grounded health." },
      { name: "Pranamaya", meaning: "Pranic sheath", function: "Breath, vitality, vayu movement, energetic balance." },
      { name: "Manomaya", meaning: "Mental sheath", function: "Senses, emotion, thought, reaction, and ordinary mental processing." },
      { name: "Vijnanamaya", meaning: "Wisdom sheath", function: "Discernment, self-inquiry, right seeing, and dharmic clarity." },
      { name: "Anandamaya", meaning: "Bliss sheath", function: "Deep peace, causal ease, and subtle attachment to spiritual comfort." },
    ],
    safety: "Bliss, silence, and spaciousness are still experiences. The path does not end with clinging to pleasant inner states.",
  },
  {
    title: "Antahkarana",
    subtitle: "Inner Instrument",
    essence: "The mind is not one single thing. It has functions: sensory coordination, memory-field, I-making, and discrimination.",
    riverRole: "Shows where misidentification happens and where right seeing begins.",
    stages: "01–04, 13–16",
    items: [
      { name: "Manas", meaning: "Sensory mind", function: "Receives, compares, doubts, reacts, and coordinates sense data." },
      { name: "Chitta", meaning: "Mind-field", function: "Stores impressions, memories, samskaras, and recurring patterns." },
      { name: "Ahamkara", meaning: "I-maker", function: "Claims experience as mine, me, and my story." },
      { name: "Buddhi", meaning: "Discernment", function: "Recognizes the real from the unreal and guides ethical direction." },
      { name: "Sakshi", meaning: "Witness", function: "Not a mind-function; the knowing presence in which the mind is seen." },
    ],
    safety: "Witnessing should not become emotional numbness. Real clarity increases humility, care, and responsibility.",
  },
  {
    title: "Prana, Vayu & Nadi",
    subtitle: "Life-Current Map",
    essence: "Prana is the living current; vayus describe its major functional directions; nadis describe subtle-channel language.",
    riverRole: "Explains why lifestyle, cleansing, asana, pranayama, bandha, mudra, and kriya must be sequenced safely.",
    stages: "05–13",
    items: [
      { name: "Prana Vayu", meaning: "Inward / heart-lung current", function: "Receiving, breathing, vitality, sensory intake." },
      { name: "Apana Vayu", meaning: "Downward current", function: "Elimination, grounding, stability, release." },
      { name: "Samana Vayu", meaning: "Assimilating current", function: "Digestion, integration, inner balance, transformative fire." },
      { name: "Udana Vayu", meaning: "Upward current", function: "Speech, growth, upliftment, subtle ascent, clarity." },
      { name: "Vyana Vayu", meaning: "Pervasive current", function: "Circulation, coordination, whole-system distribution." },
      { name: "Ida / Pingala / Sushumna", meaning: "Primary channel language", function: "Lunar, solar, and centralizing principles in subtle practice maps." },
    ],
    safety: "Do not force prana. Strong breath retention, bandha stacks, and kundalini-style manipulation belong in teacher-guided territory.",
  },
  {
    title: "Tattva, Guna & Dosha",
    subtitle: "Constitution & Manifestation",
    essence: "Tattvas explain principles of manifestation; gunas describe qualities of nature; doshas describe constitutional tendencies.",
    riverRole: "Prevents one-size-fits-all practice and supports intelligent self-regulation.",
    stages: "02–08, 17–18",
    items: [
      { name: "Pancha Mahabhuta", meaning: "Five elements", function: "Earth, water, fire, air, and space as experiential qualities." },
      { name: "Sattva", meaning: "Clarity", function: "Harmony, luminosity, balance, and purity of perception." },
      { name: "Rajas", meaning: "Agitation", function: "Motion, craving, restlessness, heat, and outward drive." },
      { name: "Tamas", meaning: "Inertia", function: "Heaviness, dullness, concealment, stability when purified." },
      { name: "Vata / Pitta / Kapha", meaning: "Dosha language", function: "Movement, transformation, and structure as practical lifestyle tendencies." },
    ],
    safety: "Constitutional maps support wise adjustment; they should not become rigid identity labels or medical replacement advice.",
  },
  {
    title: "Chakra & Granthi Language",
    subtitle: "Subtle Center Map",
    essence: "Chakras and granthis are used as symbolic-subtle maps of energy, psychology, and spiritual maturation.",
    riverRole: "Belongs after grounding and purification, not before basic ethics and stability.",
    stages: "09–16",
    items: [
      { name: "Chakra", meaning: "Subtle center", function: "A contemplative map of embodied energy, attention, and maturation." },
      { name: "Granthi", meaning: "Knot", function: "A knot of identity, fear, desire, conditioning, or energetic contraction." },
      { name: "Sushumna Orientation", meaning: "Centralization", function: "The inward movement of scattered energy toward stillness and clarity." },
      { name: "Kundalini Language", meaning: "Awakening map", function: "A powerful traditional framework that must be treated with humility and safety." },
    ],
    safety: "Avoid chakra forcing, kundalini chasing, sensational claims, and DIY activation practices.",
  },
] as const;

export const INNER_SCIENCE_RELATIONSHIPS = [
  {
    from: "Atman",
    to: "Sakshi",
    relationship: "Sakshi is the witness-recognition in experience; Atman points to the Self beyond all changing layers.",
  },
  {
    from: "Kosha",
    to: "Sharira",
    relationship: "Koshas describe experiential sheaths; sharira describes body-level frameworks. They overlap but are not identical labels.",
  },
  {
    from: "Chitta",
    to: "Ahamkara",
    relationship: "Chitta holds impressions; ahamkara claims those impressions as identity.",
  },
  {
    from: "Prana",
    to: "Breath",
    relationship: "Breath is a gateway to prana, but prana is not merely oxygen or respiration mechanics.",
  },
  {
    from: "Nadi",
    to: "Nerve",
    relationship: "Nadi is a subtle-channel map; it should not be reduced to a one-to-one modern nerve claim.",
  },
  {
    from: "Dharana",
    to: "Dhyana",
    relationship: "Dharana gathers attention; dhyana becomes an unbroken stream of attention.",
  },
  {
    from: "Samadhi",
    to: "Living Realization",
    relationship: "Samadhi clarifies absorption; living realization tests whether clarity becomes action, humility, and non-clinging.",
  },
] as const;

export const INNER_SCIENCE_STAGE_LANES = [
  {
    arc: "I. Right Seeing",
    stages: "01–02",
    instrumentFocus: "Misidentification, body-mind map literacy, witness distinction.",
    innerScience: "Sharira, kosha, antahkarana, sakshi, Atman.",
  },
  {
    arc: "II. Purification & Foundation",
    stages: "03–06",
    instrumentFocus: "Ethics, lifestyle rhythm, gross purification, reduction of turbulence.",
    innerScience: "Guna, dosha, annamaya, pranamaya, samskara patterns.",
  },
  {
    arc: "III. Body-Prana Stabilization",
    stages: "07–11",
    instrumentFocus: "Steady body, balanced breath, pranic containment, protected inner technology.",
    innerScience: "Prana, vayu, nadi, bandha, mudra, kriya language.",
  },
  {
    arc: "IV. Interiorization & Meditation",
    stages: "12–16",
    instrumentFocus: "Sound, sense-return, one-pointedness, continuous meditation, absorption.",
    innerScience: "Mantra, pratyahara, manas, chitta, buddhi, samadhi distinction.",
  },
  {
    arc: "V. Living Realization",
    stages: "17–18",
    instrumentFocus: "Integration into speech, relationship, service, duty, and non-clinging action.",
    innerScience: "Sahaja, karma yoga, dharma, jivanmukti, transparent instrument.",
  },
] as const;

export const INNER_SCIENCE_SAFETY_GATES = [
  {
    gate: "green" as InnerScienceGate,
    label: "Beginner-Safe Study",
    appliesTo: "Sharira, kosha, antahkarana, yama-niyama, simple breath awareness, mantra meaning, and witness reflection.",
  },
  {
    gate: "amber" as InnerScienceGate,
    label: "Guided Deepening",
    appliesTo: "Long meditations, intensified pranayama, chakra contemplation, extended silence, and stronger mantra discipline.",
  },
  {
    gate: "red" as InnerScienceGate,
    label: "Teacher-Only Territory",
    appliesTo: "Forced kumbhaka, bandha combinations, advanced mudra, kundalini activation, intense kriyas, and energy manipulation.",
  },
] as const;
