import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { chapters } from "../data/chapters";
import { projects } from "../data/content";
import { setScrollCapture, useChapterStore } from "../hooks/useChapterNav";
import { pad2 } from "../lib/format";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { GarageBayCard } from "./GarageBayCard";
import { ProjectDetail } from "./ProjectDetail";
import "./ProjectsSection.css";

const PROJECTS_CHAPTER_INDEX = chapters.findIndex((c) => c.id === "projects");
const STEP_LOCK_MS = 850;

export function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [detailProject, setDetailProject] = useState<number | null>(null);
  const isChapterActive = useChapterStore((s) => s.index === PROJECTS_CHAPTER_INDEX);
  const reducedMotion = useReducedMotion();
  const locked = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  // Register this section's internal step sequence as the scroll owner while
  // its chapter is active. Returning false at the first/last project hands
  // the gesture back to the global chapter navigator (see useChapterNav) so
  // scrolling past either end moves to the neighboring site chapter instead
  // of getting stuck.
  useEffect(() => {
    if (!isChapterActive || detailProject !== null) {
      setScrollCapture(null);
      return;
    }
    setScrollCapture((delta) => {
      if (locked.current) return true;
      const next = activeRef.current + delta;
      if (next < 0 || next >= projects.length) return false;
      locked.current = true;
      setActive(next);
      window.setTimeout(() => { locked.current = false; }, STEP_LOCK_MS);
      return true;
    });
    return () => setScrollCapture(null);
  }, [isChapterActive, detailProject]);

  const project = projects[active];

  return (
    <div className="scene projects-scene" id="projects">
      <div className="garage-bay-backdrop" aria-hidden="true">
        <div className="bay-floor-grid" />
        <div className="bay-glow bay-glow-red" />
        <div className="bay-glow bay-glow-ice" />
      </div>

      <div className="projects-chrome">
        <p className="eyebrow">CHAPTER 03 · THE GARAGE — PROJECTS</p>
        <h2 className="big-title">Engineered Builds</h2>
        <p className="projects-subhead">Scroll to walk the bay. Each build is a different machine — inspect one.</p>
      </div>

      <div className="bay-index" role="tablist" aria-label="Jump to project">
        {projects.map((p, i) => (
          <button
            key={p.name}
            className={`bay-index-dot ${i === active ? "is-active" : ""}`}
            onClick={() => { if (!locked.current) setActive(i); }}
            aria-label={`Jump to ${p.name}`}
          >
            <span className="bay-index-number">{pad2(i + 1)}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.name}
          className="bay-card-stage"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 60, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -50, filter: "blur(14px)" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <GarageBayCard
            project={project}
            reducedMotion={reducedMotion}
            onEnterGarage={() => setDetailProject(active)}
          />
        </motion.div>
      </AnimatePresence>

      <p className="bay-scroll-hint mono-label">
        {active < projects.length - 1 ? "SCROLL TO NEXT BUILD ↓" : "SCROLL TO CONTINUE →"}
      </p>

      <AnimatePresence>
        {detailProject !== null && (
          <ProjectDetail project={projects[detailProject]} onClose={() => setDetailProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
