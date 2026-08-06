import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects, type Project } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { DetailNav, type DetailNavSection } from "./project-detail/DetailNav";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { DetailHero } from "./project-detail/DetailHero";
import { DetailSummary } from "./project-detail/DetailSummary";
import { MissionControl } from "./project-detail/MissionControl";
import { ArchitectureDiagram } from "./project-detail/ArchitectureDiagram";
import { DatabaseDiagram } from "./project-detail/DatabaseDiagram";
import { ApiConsole } from "./project-detail/ApiConsole";
import { AuthFlowDiagram } from "./project-detail/AuthFlowDiagram";
import { DeployPipeline } from "./project-detail/DeployPipeline";
import { PerformancePanel, DecisionsPanel, LessonsPanel } from "./project-detail/EngineeringNotes";
import { DetailFooter } from "./project-detail/DetailFooter";
import "./project-detail/ProjectDetailPage.css";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

const BASE_SECTIONS: DetailNavSection[] = [
  { id: "hero", label: "Overview" },
  { id: "summary", label: "Summary" },
];
const CASE_STUDY_SECTIONS: DetailNavSection[] = [
  { id: "mission-control", label: "Mission Control" },
  { id: "architecture", label: "Architecture" },
  { id: "database", label: "Database" },
  { id: "api", label: "API Layer" },
  { id: "auth", label: "Authentication" },
  { id: "deployment", label: "Deployment" },
  { id: "performance", label: "Performance" },
  { id: "decisions", label: "Decisions" },
  { id: "lessons", label: "Lessons" },
];
const FOOTER_SECTION: DetailNavSection = { id: "status", label: "Status" };

export function ProjectDetail({ project, onClose, onSelectProject }: ProjectDetailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(project);
  const cs = current.caseStudy;

  const sections = useMemo(
    () => [...BASE_SECTIONS, ...(cs ? CASE_STUDY_SECTIONS : []), FOOTER_SECTION],
    [cs]
  );

  const currentIndex = projects.findIndex((p) => p.name === current.name);
  const nextProject = projects[(currentIndex + 1) % projects.length] ?? null;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useBodyScrollLock(true);

  // Cinematic scroll transitions per section: fade + scale + blur, scoped
  // to this page's own scroll container so it never touches the window
  // scrollTrigger the rest of the site doesn't use.
  useEffect(() => {
    if (reducedMotion) return;
    const root = scrollRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const sectionEls = root.querySelectorAll<HTMLElement>(".detail-section, .detail-hero");
      sectionEls.forEach((el, i) => {
        if (i === 0) return; // hero plays its own entrance via Framer Motion
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, scale: 0.97, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              scroller: root,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [current, reducedMotion]);

  function handleSelectNext(nextProj: Project) {
    setCurrent(nextProj);
    onSelectProject?.(nextProj);
    scrollRef.current?.scrollTo(0, 0);
  }

  return (
    <motion.div
      className="project-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button className="detail-close-btn" onClick={onClose} aria-label="Close case study">
        <i className="fas fa-xmark" />
      </button>

      <DetailNav sections={sections} scrollRootRef={scrollRef} />

      <div className="detail-scroll-root" ref={scrollRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DetailHero project={current} />
            <DetailSummary project={current} />
            {cs && (
              <>
                <MissionControl projectName={current.name} />
                <ArchitectureDiagram cs={cs} />
                <DatabaseDiagram cs={cs} />
                <ApiConsole cs={cs} />
                <AuthFlowDiagram cs={cs} />
                <DeployPipeline cs={cs} />
                <PerformancePanel cs={cs} />
                <DecisionsPanel cs={cs} />
                <LessonsPanel cs={cs} />
              </>
            )}
            <DetailFooter project={current} nextProject={nextProject} onSelectNext={handleSelectNext} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
