import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_TERMS,
  type GlossaryCategory,
} from "@/data/glossary-relationships";
import { STAGES } from "@/data/stages";
import { glossaryHash } from "@/lib/slug";

const filters = ["All", ...GLOSSARY_CATEGORIES] as const;
type GlossaryFilter = (typeof filters)[number];

function stageLabel(num: number) {
  const stage = STAGES.find((item) => item.num === num);
  return stage ? `${String(num).padStart(2, "0")} ${stage.title}` : `Stage ${num}`;
}

function safetyClass(safety: string) {
  if (safety === "Teacher-Guided") return "border-amber-500/30 bg-amber-500/10 text-amber-100";
  if (safety === "Practice with Care") return "border-orange-400/25 bg-orange-400/10 text-orange-100";
  if (safety === "Beginner-Safe") return "border-emerald-400/25 bg-emerald-400/10 text-emerald-100";
  return "border-white/10 bg-white/[0.04] text-muted-foreground";
}

export default function Glossary() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<GlossaryFilter>("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("q");
    if (queryParam) setQuery(queryParam);
  }, []);

  const filteredTerms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return GLOSSARY_TERMS.filter((item) => {
      const matchesFilter = activeFilter === "All" || item.category === activeFilter;
      const searchableText = [
        item.term,
        item.category,
        item.meaning,
        item.beginner,
        item.deeper,
        ...item.related,
        ...item.notSameAs,
        ...item.stages.map(stageLabel),
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeFilter, query]);

  const featuredResolvers = [
    {
      title: "Self-language resolver",
      flow: "Atman → Sakshi → Purusha → Turiya",
      note: "Different doors toward consciousness language. Do not reduce them to ego, personality, or emotion.",
    },
    {
      title: "Mind-instrument resolver",
      flow: "Manas → Chitta → Ahamkara → Buddhi",
      note: "These are functions of the inner instrument; they are observed and therefore not the final Self.",
    },
    {
      title: "Practice-depth resolver",
      flow: "Asana → Pranayama → Bandha → Mudra → Antar Kriya",
      note: "The river becomes more subtle step by step. Advanced energetic work stays teacher-guided.",
    },
  ];

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 max-w-4xl"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 safe-title">
            Relationship System
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight safe-title">
            Sacred Glossary
          </h1>
          <div className="w-24 h-[1px] bg-primary/40 mb-8" />
          <p className="text-lg sm:text-xl text-muted-foreground font-serif leading-relaxed safe-copy">
            The vocabulary of the inner science — not isolated definitions, but connected terms that show what each word means, what it is not, where it appears in the river, and how safely it should be approached.
          </p>
        </motion.div>

        <section className="mb-10 sm:mb-12 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 temple-glass min-w-0">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr] min-w-0">
            <div className="min-w-0">
              <h2 className="text-2xl font-serif text-foreground mb-3 safe-title">How to read the glossary</h2>
              <p className="text-sm text-muted-foreground leading-relaxed safe-copy">
                Each term now has a beginner meaning, a deeper meaning, related terms, terms it should not be confused with, stage links, and a safety label. This keeps the site from becoming a scattered encyclopedia.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 min-w-0">
              {featuredResolvers.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-black/20 p-4 min-w-0">
                  <h3 className="text-sm font-serif text-primary mb-2 safe-title">{item.title}</h3>
                  <p className="text-xs text-foreground/80 mb-2 safe-copy">{item.flow}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed safe-copy">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5 min-w-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between min-w-0">
            <label className="relative block w-full lg:max-w-md min-w-0">
              <span className="sr-only">Search glossary terms</span>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search term, stage, relation..."
                className="w-full min-w-0 rounded-full border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/50"
              />
            </label>

            <div className="flex flex-wrap gap-2 min-w-0" aria-label="Glossary category filters">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-3 py-2 text-xs transition min-h-10 ${
                    activeFilter === filter
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground safe-copy">
            Showing {filteredTerms.length} of {GLOSSARY_TERMS.length} connected terms.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2 min-w-0">
          {filteredTerms.map((item, i) => (
            <motion.article
              key={item.term}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 8) * 0.035 }}
              id={glossaryHash(item.term)}
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6 safe-card min-w-0"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between min-w-0">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-primary/60 mb-2 safe-title">{item.category}</p>
                  <h3 className="text-xl sm:text-2xl font-serif text-primary leading-tight safe-title">{item.term}</h3>
                </div>
                <span className={`inline-flex w-fit shrink-0 rounded-full border px-3 py-1 text-[11px] ${safetyClass(item.safety)}`}>
                  {item.safety}
                </span>
              </div>

              <p className="mt-4 text-sm text-muted-foreground leading-relaxed safe-copy">{item.meaning}</p>

              <div className="mt-5 grid gap-4 min-w-0">
                <div>
                  <h4 className="mb-1 text-xs uppercase tracking-[0.22em] text-foreground/60 safe-title">Beginner meaning</h4>
                  <p className="text-sm text-foreground/85 leading-relaxed safe-copy">{item.beginner}</p>
                </div>
                <div>
                  <h4 className="mb-1 text-xs uppercase tracking-[0.22em] text-foreground/60 safe-title">Deeper meaning</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed safe-copy">{item.deeper}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 min-w-0">
                <div className="min-w-0">
                  <h4 className="mb-2 text-xs uppercase tracking-[0.22em] text-foreground/60 safe-title">Related terms</h4>
                  <div className="flex flex-wrap gap-2 min-w-0">
                    {item.related.map((term) => (
                      <Link key={term} href={`/glossary#${glossaryHash(term)}`} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/30 hover:text-primary safe-copy">
                        {term}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="min-w-0">
                  <h4 className="mb-2 text-xs uppercase tracking-[0.22em] text-foreground/60 safe-title">Not the same as</h4>
                  <div className="flex flex-wrap gap-2 min-w-0">
                    {item.notSameAs.map((term) => (
                      <span key={term} className="rounded-full border border-red-400/10 bg-red-400/[0.04] px-3 py-1 text-xs text-muted-foreground safe-copy">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4 min-w-0">
                <h4 className="mb-2 text-xs uppercase tracking-[0.22em] text-foreground/60 safe-title">Used in the river</h4>
                <div className="flex flex-wrap gap-2 min-w-0">
                  {item.stages.map((stageNum) => (
                    <Link
                      key={stageNum}
                      href={`/stage/${stageNum}`}
                      className="rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-2 text-xs text-primary transition hover:border-primary/50 hover:bg-primary/[0.12] safe-copy"
                    >
                      {stageLabel(stageNum)}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-muted-foreground safe-copy">
            No glossary terms match this search yet. Try a broader term like “Self,” “Prana,” “Mind,” “Practice,” or “Samadhi.”
          </div>
        )}
      </div>
    </div>
  );
}
