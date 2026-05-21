import { ReactNode, useEffect, useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ProgressTracker } from "@/components/progress-tracker";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { BackToTop } from "@/components/back-to-top";
import { RiverCompass } from "@/components/river-compass";
import { SafetyScopeNotice } from "@/components/safety-scope-notice";

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 group ${
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      {/* Magnetic underline */}
      <span
        className="absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300"
        style={{
          width: active ? "100%" : "0%",
          opacity: active ? 0.8 : 0,
          boxShadow: active ? "0 0 8px rgba(204,168,78,0.6)" : "none",
        }}
      />
      <span
        className="absolute -bottom-1 left-0 h-[1px] bg-primary/50 w-0 group-hover:w-full transition-all duration-300"
        style={{ display: active ? "none" : "block" }}
      />
    </Link>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const navItems = [
    { href: "/roadmap",      label: "Knowledge Roadmap" },
    { href: "/experience",   label: "Command Temple" },
    { href: "/inner-science", label: "Inner Science" },
    { href: "/practice",     label: "Path & Practice" },
    { href: "/glossary",     label: "Glossary" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-background"
      >
        Skip to main content
      </a>

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <motion.header
        className="sticky top-0 z-50 w-full border-b transition-colors duration-400"
        animate={{
          borderColor: scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
          backgroundColor: scrolled ? "rgba(10,10,10,0.92)" : "rgba(10,10,10,0.70)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ backdropFilter: "blur(20px)" }}
      >
        {/* Top gold accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(204,168,78,0.30) 35%, rgba(204,168,78,0.50) 50%, rgba(204,168,78,0.30) 65%, transparent 100%)",
            opacity: scrolled ? 1 : 0,
            transition: "opacity 400ms ease",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4 min-w-0">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl sm:text-2xl text-primary tracking-wide flex items-center gap-3 min-w-0 shrink-0 group"
            onClick={() => setMobileOpen(false)}
          >
            {/* Pulsing orb */}
            <span className="relative inline-flex items-center justify-center w-3 h-3 shrink-0">
              <span
                className="absolute inset-0 rounded-full bg-primary/25 group-hover:scale-[2.5] group-hover:opacity-0 transition-all duration-600"
              />
              <span
                className="relative w-2 h-2 rounded-full bg-primary"
                style={{ boxShadow: "0 0 12px rgba(204,168,78,0.75), 0 0 24px rgba(204,168,78,0.25)" }}
              />
            </span>
            <span className="group-hover:text-primary/90 transition-colors duration-200">Sadhana OS</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 min-w-0">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={location === item.href}
              />
            ))}
          </nav>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] group safe-tap-target shrink-0"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={`block w-6 h-[1.5px] bg-primary/80 transition-all duration-300 origin-center ${mobileOpen ? "translate-y-[7.5px] rotate-45" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-primary/80 transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-primary/80 transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-[7.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.nav
              id="mobile-navigation"
              key="mobile-nav"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 left-0 right-0 z-50 border-b border-white/8 px-4 sm:px-6 py-6 md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
              style={{ background: "rgba(8,8,8,0.97)", backdropFilter: "blur(24px)" }}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={location === item.href ? "page" : undefined}
                      className={`flex items-center gap-3 py-4 border-b border-white/[0.05] text-xs font-medium tracking-[0.16em] uppercase transition-colors ${
                        location === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {location === item.href && (
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0"
                          style={{ boxShadow: "0 0 6px rgba(204,168,78,0.8)" }} />
                      )}
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-6 pb-2">
                  <p className="font-serif italic text-xs text-muted-foreground/35 text-center tracking-wider">
                    The river does not announce that it became the ocean.
                  </p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN ─────────────────────────────────────────────────── */}
      <main id="main-content" className="flex-1 min-w-0" tabIndex={-1}>
        {children}
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.04] bg-[#060606] px-4 py-14 text-muted-foreground sm:px-6 mt-24 relative overflow-hidden">
        <div className="absolute inset-0 sacred-grid opacity-[0.18] pointer-events-none" />
        <div className="relative z-10">
          <RiverCompass compact />
          <SafetyScopeNotice variant="compact" id="global-safety-scope" />
          <div className="mx-auto mt-10 max-w-6xl border-t border-white/[0.05] pt-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/25" />
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/25" />
            </div>
            <p className="font-serif italic tracking-wider text-foreground/50">The river does not announce that it became the ocean.</p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.22em] opacity-35">
              Sadhana OS · Sacred Content Edition · Safety-Gated Yogic Science
            </p>
          </div>
        </div>
      </footer>

      <BackToTop />
      <ProgressTracker />
    </div>
  );
}
