import { motion } from "framer-motion";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import type { Project } from "../../data/content";
import { AnimatedStat } from "./AnimatedStat";

interface DetailHeroProps {
  project: Project;
}

export function DetailHero({ project }: DetailHeroProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const cs = project.caseStudy;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  }

  return (
    <section id="hero" className="detail-hero">
      <div className="detail-hero-backdrop" aria-hidden="true">
        <span className="detail-volumetric detail-volumetric-red" />
        <span className="detail-volumetric detail-volumetric-ice" />
        <span className="detail-particles">
          {Array.from({ length: 22 }, (_, i) => (
            <i key={i} style={{ "--p": i, "--p-x": `${(i * 43) % 100}%`, "--p-y": `${(i * 29) % 100}%` } as CSSProperties} />
          ))}
        </span>
      </div>

      <div className="detail-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label detail-hero-eyebrow">{project.bay} · CASE STUDY</span>
          <h1 className="detail-hero-title">{project.name}</h1>
          <p className="detail-hero-value">{cs?.valueProposition ?? project.tagline}</p>
        </motion.div>

        {cs && (
          <motion.div
            className="detail-hero-metrics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {cs.heroMetrics.map((metric) => (
              <div key={metric.label} className="detail-hero-metric">
                <strong>
                  <AnimatedStat value={metric.value} suffix={metric.suffix} />
                </strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <motion.div
        ref={stageRef}
        className="detail-laptop-stage"
        onMouseMove={handleMove}
        onMouseLeave={() => setPointer({ x: 0, y: 0 })}
        style={{ "--px": pointer.x, "--py": pointer.y } as CSSProperties}
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="detail-laptop-glow" aria-hidden="true" />
        <div className="detail-laptop">
          <div className="detail-laptop-topbar">
            <span /><span /><span />
          </div>
          <img src={project.image} alt={`${project.name} live dashboard`} />
          <div className="detail-laptop-reflection" aria-hidden="true" />
        </div>
        <div className="detail-laptop-shadow" aria-hidden="true" />
      </motion.div>

      <span className="detail-scroll-cue mono-label">SCROLL TO EXPLORE ↓</span>
    </section>
  );
}
