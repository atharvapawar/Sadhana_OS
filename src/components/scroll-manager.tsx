import { useEffect } from "react";
import { useLocation } from "wouter";

const HEADER_OFFSET = 96;

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = id ? document.getElementById(id) : null;

  if (!target) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return;
  }

  const top = Math.max(
    target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    0
  );

  window.scrollTo({ top, left: 0, behavior: "auto" });
}

export function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const run = window.requestAnimationFrame(() => {
      if (window.location.hash) {
        scrollToHash(window.location.hash);
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(run);
  }, [location]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return null;
}
