import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { PRINCIPLES, SAFETY_GATES } from "@/data/sacred-architecture";
import { RiverCompass } from "@/components/river-compass";
import { StartingGuidance } from "@/components/starting-guidance";

const springConfig = { stiffness: 200, damping: 28, mass: 0.8 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};

function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Radial crown glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-24 w-[900px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(ellipse at center, #cca84e 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      {/* Animated river paths */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <motion.path
          d="M0,420 C200,370 400,480 720,400 C1040,320 1240,450 1440,400"
          stroke="url(#gold-river)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="1200"
          strokeDashoffset="1200"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3.5, ease: "easeOut", delay: 0.4 }}
        />
        <motion.path
          d="M0,460 C180,490 380,380 720,440 C1060,500 1280,380 1440,450"
          stroke="url(#gold-river)"
          strokeWidth="0.6"
          fill="none"
          strokeDasharray="1200"
          strokeDashoffset="1200"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 4, ease: "easeOut", delay: 0.8 }}
        />
        <motion.path
          d="M0,500 C240,460 480,530 720,490 C960,450 1200,520 1440,490"
          stroke="#2b3d4f"
          strokeWidth="0.4"
          fill="none"
          strokeDasharray="1200"
          strokeDashoffset="1200"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 4.5, ease: "easeOut", delay: 1.2 }}
          opacity={0.5}
        />
        <defs>
          <linearGradient id="gold-river" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cca84e" stopOpacity="0" />
            <stop offset="30%" stopColor="#cca84e" stopOpacity="1" />
            <stop offset="70%" stopColor="#cca84e" stopOpacity="1" />
            <stop offset="100%" stopColor="#cca84e" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {/* Sacred grid overlay */}
      <div className="absolute inset-0 sacred-grid opacity-[0.35]" />
      {/* Scan-line shimmer */}
      <div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none"
        style={{ top: "60%", filter: "blur(1px)" }}
      />
    </div>
  );
}

function SigilOrb({ num }: { num: number }) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      <div className="absolute inset-0 rounded-full border border-primary/30 sigil-glow" />
      <div
        className="absolute inset-0 rounded-full border border-primary/10"
        style={{ transform: "scale(1.5)", opacity: 0.3 }}
      />
      <span className="relative font-serif text-primary text-lg font-semibold">{num}</span>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const springY = useSpring(yParallax, springConfig);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="w-full">

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 overflow-hidden"
        style={{ position: "relative" }}
      >
        <HeroBackground />

        <motion.div
          style={{ y: springY, opacity: opacityHero }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-0"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="mb-7">
              <span className="inline-flex items-center gap-3 text-primary/70 text-[10px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.36em] safe-copy">
                <span className="h-[1px] w-8 bg-primary/40" />
                Yogic Science · 18-Stage Sadhana Krama · Mind Mastery
                <span className="h-[1px] w-8 bg-primary/40" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-foreground leading-[1.05] mb-6 safe-title"
            >
              The complete science of
              <br />
              <span className="text-primary italic text-glow-subtle">mastering your mind.</span>
            </motion.h1>

            {/* Separator */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60" style={{ boxShadow: "0 0 8px rgba(204,168,78,0.6)" }} />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/40" />
            </motion.div>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl md:text-2xl font-serif text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed mb-10 safe-copy"
            >
              Sadhana OS does not ask you to believe. It asks you to understand, purify, observe, verify,{" "}
              <em>and integrate direct awareness into ordinary life.</em>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto"
            >
              <Link
                href="/roadmap"
                className="btn-primary px-7 sm:px-9 py-4 rounded-full text-center uppercase tracking-[0.14em] text-xs sm:text-sm font-semibold safe-tap-target"
              >
                Enter the 18-Stage Krama
              </Link>
              <Link
                href="/experience"
                className="btn-outline px-7 sm:px-9 py-4 rounded-full text-center uppercase tracking-[0.14em] text-xs sm:text-sm font-semibold safe-tap-target"
              >
                Open Command Temple
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom gradient veil */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ── RIVER COMPASS ─────────────────────────────────────────── */}
      <RiverCompass />
      <StartingGuidance />

      {/* ── PRINCIPLES GRID ───────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#060606] border-y border-white/[0.04] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.04]"
            style={{
              background: "radial-gradient(ellipse at center, #cca84e 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[1px] w-6 bg-primary/40" />
              <span className="text-primary/60 uppercase tracking-[0.26em] text-[10px]">
                What changed in this elite build
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-5">
              From beautiful portal to intelligent{" "}
              <span className="text-primary/85 italic">sacred operating system.</span>
            </h2>
            <p className="text-muted-foreground font-serif text-lg leading-relaxed">
              The upgrade adds a command temple, safety gates, readiness-based practice builder,
              connected knowledge rooms, and clearer non-overlap between traditional maps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-0">
            {PRINCIPLES.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="elite-card shimmer-card rounded-2xl p-6 safe-card"
              >
                <div className="flex items-center gap-3 mb-5">
                  <SigilOrb num={i + 1} />
                  <span className="text-primary/50 text-[10px] uppercase tracking-[0.22em]">Rule {i + 1}</span>
                </div>
                <h3 className="text-lg font-serif text-foreground mb-3 leading-tight safe-title">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed safe-copy">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY GATES ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-background relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-[1px] w-6 bg-primary/40" />
              <span className="text-primary/60 uppercase tracking-[0.26em] text-[10px]">
                Protection without hiding knowledge
              </span>
              <div className="h-[1px] w-6 bg-primary/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-5">
              Advanced practices are visible,{" "}
              <span className="text-primary/85 italic">but gated.</span>
            </h2>
            <p className="text-muted-foreground font-serif text-lg leading-relaxed">
              A serious Yogic Science portal should mention higher practices, but it should not turn
              dangerous teacher-only methods into casual DIY instructions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 min-w-0">
            {SAFETY_GATES.map((gate, i) => (
              <motion.div
                key={gate.gate}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="elite-card shimmer-card rounded-2xl p-7 safe-card"
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/70" style={{ boxShadow: "0 0 6px rgba(204,168,78,0.7)" }} />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-primary/70">{gate.level.replace("-", " ")}</span>
                </div>
                <h3 className="text-2xl font-serif mb-4 safe-title">{gate.gate}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed safe-copy">{gate.rule}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/experience#safety-gates"
              className="btn-outline inline-flex rounded-full px-7 py-3 uppercase tracking-[0.18em] text-xs"
            >
              Explore the safety system
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ORIENTATION TRIPTYCH ──────────────────────────────────── */}
      <section
        id="what-is-this"
        className="py-24 sm:py-32 px-4 sm:px-6 border-t border-white/[0.04] bg-[#070707] relative overflow-hidden"
      >
        <div className="absolute inset-0 sacred-grid opacity-20 pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 min-w-0">
            {[
              {
                label: "What It Is",
                copy: "A structured taxonomy of traditional Yogic Science, spanning fundamental ethics to advanced inner alchemy. Not a modern wellness philosophy — a precise map for dismantling the egoic structure.",
              },
              {
                label: "Who It's For",
                copy: "Serious practitioners, scholars of the mind, and those disillusioned by superficial spirituality. For those ready to treat inner life with the exactitude of an absolute science.",
              },
              {
                label: "What You'll Find",
                copy: "Clear demarcations between accessible practices and those requiring a qualified teacher. Honest labeling of traditional maps. The raw, unfiltered river of sadhana.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="elite-card shimmer-card rounded-2xl p-6 sm:p-8 safe-card"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-5 w-[2px] bg-primary/60 rounded-full" style={{ boxShadow: "0 0 8px rgba(204,168,78,0.4)" }} />
                  <h3 className="font-serif text-2xl text-primary safe-title">{item.label}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed safe-copy">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPINE: RAJA + KARMA ───────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="river-arc-bg absolute inset-0 pointer-events-none" />
        <div className="container mx-auto max-w-4xl space-y-24 relative z-10">

          {[
            {
              label: "The Primary Spine",
              title: "Raja Yoga",
              body: "The royal path of concentration. The mind is a muddy water. Raja Yoga is the process of stilling the turbulence until the water becomes perfectly transparent, revealing the ocean floor of pure awareness.",
            },
            {
              label: "The Daily Architecture",
              title: "Karma Yoga",
              body: "Action without ego-residue. The river cannot be stopped; it must flow. But the flow can be cleansed of the desire to possess the ocean. Every ordinary action becomes a mechanism for self-emptying.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/30" />
                <span className="text-primary/55 uppercase tracking-[0.22em] text-xs">{item.label}</span>
                <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/30" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-8 text-foreground text-glow-subtle">
                {item.title}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-serif leading-relaxed max-w-2xl mx-auto safe-copy">
                {item.body}
              </p>
            </motion.div>
          ))}

          {/* River connector */}
          <div className="w-px h-20 bg-gradient-to-b from-primary/0 via-primary/25 to-primary/0 mx-auto" />
        </div>
      </section>
    </div>
  );
}
