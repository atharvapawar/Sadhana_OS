import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ADVANCED_VAULT, KNOWLEDGE_ROOMS, PRACTICE_STACKS, PRINCIPLES, SAFETY_GATES, SOURCE_STREAMS, type SafetyLevel } from "@/data/sacred-architecture";

const levelStyles: Record<SafetyLevel, string> = {
  safe: "border-emerald-400/20 bg-emerald-400/5 text-emerald-200",
  guided: "border-amber-400/25 bg-amber-400/5 text-amber-100",
  "teacher-only": "border-red-400/30 bg-red-400/5 text-red-100",
};

export default function Experience() {
  const [readiness, setReadiness] = useState<keyof typeof PRACTICE_STACKS>("beginner");
  const [filter, setFilter] = useState<"all" | SafetyLevel>("all");

  const rooms = useMemo(() => {
    return filter === "all" ? KNOWLEDGE_ROOMS : KNOWLEDGE_ROOMS.filter((room) => room.level === filter);
  }, [filter]);

  const stack = PRACTICE_STACKS[readiness];

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-x-hidden">
      <section className="container mx-auto px-4 sm:px-6 max-w-7xl min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12 sm:mb-16 rounded-[1.5rem] sm:rounded-[2rem] border border-primary/15 bg-card/30 p-5 sm:p-8 md:p-12 temple-glass safe-card"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(201,168,76,.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(43,61,79,.28),transparent_34%)]" />
          <div className="relative z-10 max-w-4xl">
            <div className="text-primary/70 uppercase tracking-[0.16em] sm:tracking-[0.3em] text-xs mb-6 safe-copy">Elite Experience Layer · Intelligence Map · Safety-Gated Practice</div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-tight mb-8 safe-title">Sadhana OS Command Temple</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-serif leading-relaxed max-w-3xl safe-copy">
              A more interactive sacred dashboard that tells a visitor where they are, what to study next, what to practice safely, and what must remain teacher-guided.
            </p>
          </div>
        </motion.div>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 sm:mb-16 min-w-0">
          {PRINCIPLES.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 sm:p-6 hover:border-primary/30 transition-colors safe-card"
            >
              <div className="text-primary/70 text-xs uppercase tracking-widest mb-4">Principle {i + 1}</div>
              <h2 className="text-xl font-serif mb-3">{item.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </motion.article>
          ))}
        </section>

        <section className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-6 lg:gap-8 mb-16 sm:mb-20 min-w-0">
          <div className="rounded-3xl border border-white/8 bg-[#090909] p-5 sm:p-6 md:p-8 safe-card">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <div className="text-primary/70 text-xs uppercase tracking-[0.24em] mb-3">Knowledge rooms</div>
                <h2 className="text-3xl font-serif">Connected, non-repeating architecture</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["all", "safe", "guided", "teacher-only"] as const).map((value) => (
                  <button
                    key={value}
                    onClick={() => setFilter(value)}
                    className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${filter === value ? "border-primary/70 bg-primary text-background" : "border-white/10 text-muted-foreground hover:border-primary/40 hover:text-primary"}`}
                  >
                    {value.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 min-w-0">
              {rooms.map((room) => (
                <Link key={room.title} href={room.route} className="group rounded-2xl border border-white/8 bg-white/[0.025] p-5 hover:border-primary/35 transition-all safe-card">
                  <div className={`inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest mb-4 ${levelStyles[room.level]}`}>{room.level.replace("-", " ")}</div>
                  <h3 className="text-xl font-serif mb-2 group-hover:text-primary transition-colors">{room.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{room.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {room.includes.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-primary/15 bg-primary/[0.045] p-5 sm:p-6 md:p-8 h-fit lg:sticky lg:top-28 safe-card">
            <div className="text-primary/70 text-xs uppercase tracking-[0.24em] mb-3">Daily practice builder</div>
            <h2 className="text-2xl sm:text-3xl font-serif mb-6 safe-title">Choose the honest level</h2>
            <div className="grid gap-2 mb-6">
              {Object.entries(PRACTICE_STACKS).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setReadiness(key as keyof typeof PRACTICE_STACKS)}
                  className={`text-left rounded-2xl border p-4 transition-colors safe-card safe-tap-target ${readiness === key ? "border-primary/60 bg-primary/10" : "border-white/8 bg-background/30 hover:border-primary/30"}`}
                >
                  <span className="block text-sm font-serif text-foreground">{value.title}</span>
                  <span className="text-xs text-muted-foreground">{value.duration}</span>
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-white/8 bg-background/35 p-5">
              <h3 className="text-xl sm:text-2xl font-serif text-primary mb-2 safe-title">{stack.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 safe-copy">{stack.aim}</p>
              <ol className="space-y-3 text-sm text-foreground/85">
                {stack.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 safe-copy"><span className="text-primary/70">{String(i + 1).padStart(2, "0")}</span>{step}</li>
                ))}
              </ol>
              <div className="mt-5 border-t border-white/8 pt-4 text-xs leading-relaxed text-amber-100/80 safe-copy">{stack.warning}</div>
            </div>
          </aside>
        </section>

        <section className="grid lg:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20 min-w-0" id="safety-gates">
          {SAFETY_GATES.map((gate) => (
            <article key={gate.gate} className={`rounded-3xl border p-5 sm:p-7 safe-card ${levelStyles[gate.level]}`}>
              <div className="text-xs uppercase tracking-[0.22em] opacity-70 mb-3">{gate.level.replace("-", " ")}</div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-4 safe-title">{gate.gate}</h2>
              <p className="text-sm leading-relaxed opacity-90 safe-copy">{gate.rule}</p>
            </article>
          ))}
        </section>

        <section id="advanced-vault" className="rounded-3xl border border-red-400/20 bg-red-950/10 p-5 sm:p-6 md:p-10 mb-16 sm:mb-20 safe-card">
          <div className="max-w-3xl mb-8">
            <div className="text-red-200/70 text-xs uppercase tracking-[0.24em] mb-3">Advanced Vault</div>
            <h2 className="text-3xl sm:text-4xl font-serif mb-5 safe-title">Visible as knowledge, protected from misuse</h2>
            <p className="text-muted-foreground font-serif text-base sm:text-lg leading-relaxed safe-copy">A complete site should not pretend advanced practices do not exist. It should show they exist, explain why they are powerful, and clearly prevent unsafe self-experimentation.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 min-w-0">
            {ADVANCED_VAULT.map((item) => (
              <div key={item} className="rounded-2xl border border-red-400/15 bg-background/35 p-4 text-sm text-red-50/80 safe-card">{item}</div>
            ))}
          </div>
        </section>

        <section id="living-dharma" className="grid lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] gap-6 lg:gap-8 items-start min-w-0">
          <div>
            <div className="text-primary/70 text-xs uppercase tracking-[0.24em] mb-3">Source streams</div>
            <h2 className="text-3xl sm:text-4xl font-serif mb-5 safe-title">Many maps, one river</h2>
            <p className="text-muted-foreground leading-relaxed safe-copy">The site becomes world-class when it prevents overlap: different traditions are not dumped as separate repeated pages; they are connected by purpose, sequence, safety, and direct realization.</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/[0.025] p-5 sm:p-6 safe-card">
            <div className="grid gap-3">
              {SOURCE_STREAMS.map((source) => (
                <div key={source} className="rounded-2xl border border-white/8 bg-background/35 p-4 text-sm text-foreground/85 safe-card">{source}</div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
