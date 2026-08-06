import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import type { Project } from "../data/content";
import { pad2 } from "../lib/format";
import { makeParticles } from "../lib/particles";
import "./GarageBayCard.css";

const STATUS_META: Record<Project["status"], { label: string; tone: string }> = {
  LIVE: { label: "LIVE", tone: "status-live" },
  PRODUCTION: { label: "PRODUCTION", tone: "status-production" },
  PROTOTYPE: { label: "PROTOTYPE", tone: "status-prototype" },
};

const PARTICLES = makeParticles(16);

interface GarageBayCardProps {
  project: Project;
  reducedMotion: boolean;
  onEnterGarage: () => void;
}

export function GarageBayCard({ project, reducedMotion, onEnterGarage }: GarageBayCardProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const status = STATUS_META[project.status];

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  }

  const style = {
    "--px": pointer.x,
    "--py": pointer.y,
  } as CSSProperties;

  return (
    <article
      ref={stageRef}
      className="bay-card"
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={() => setPointer({ x: 0, y: 0 })}
    >
      {/* animated neon edge + glow border — always faintly present, intensifies on hover */}
      <span className="bay-card-edge" aria-hidden="true" />
      <span className="bay-card-glow" aria-hidden="true" />

      {/* cursor-reactive background light */}
      <span className="bay-card-light" aria-hidden="true" />

      {/* floating particles drifting inside the bay */}
      <span className="bay-card-particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <i key={p} style={{ "--p": p, "--p-x": `${(p * 61) % 100}%`, "--p-y": `${(p * 37) % 100}%` } as CSSProperties} />
        ))}
      </span>

      {/* animated scan lines, revealed on hover */}
      <span className="bay-card-scanlines" aria-hidden="true" />
      {/* animated light sweep */}
      <span className="bay-card-sweep" aria-hidden="true" />

      <div className="bay-card-inner">
        <div className="bay-card-header">
          <span className="bay-tag mono-label">{project.bay}</span>
          <span className={`bay-status ${status.tone}`}>
            <i className="bay-status-dot" /> {status.label}
          </span>
        </div>

        {/* large floating device mockup — rotates in 3D on hover, tracking cursor */}
        <div className="bay-device-wrap">
          <div className="bay-device-shadow" />
          <div className="bay-device">
            <div className="bay-device-topbar">
              <span /><span /><span />
            </div>
            <img src={project.image} alt={`${project.name} interface preview`} loading="lazy" />
            <div className="bay-device-sheen" />
          </div>
        </div>

        <div className="bay-card-info">
          <h3 className="bay-card-title">{project.name}</h3>
          <p className="bay-card-tagline">{project.tagline}</p>

          <div className="bay-chip-row">
            {project.techStack.map((tech) => (
              <span key={tech} className="bay-chip">{tech}</span>
            ))}
          </div>

          <div className="bay-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bay-metric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="bay-timeline">
            {project.timeline.map((step, i) => (
              <div key={step.label} className="bay-timeline-step">
                <span className="bay-timeline-index">{pad2(i + 1)}</span>
                <span className="bay-timeline-label">{step.label}</span>
                <span className="bay-timeline-date">{step.date}</span>
              </div>
            ))}
          </div>

          <div className="bay-actions">
            <button className="bay-cta-primary" onClick={onEnterGarage}>
              <span className="bay-cta-edge" aria-hidden="true" />
              <span className="bay-cta-light" aria-hidden="true" />
              <span className="bay-cta-content">
                <i className="fas fa-warehouse" aria-hidden="true" />
                Enter Garage
                <i className="fas fa-arrow-right bay-cta-arrow" aria-hidden="true" />
              </span>
            </button>
            <a href={project.liveHref} target="_blank" rel="noreferrer" className="bay-cta-secondary">
              <i className="fas fa-external-link-alt" aria-hidden="true" /> Live Demo
            </a>
            <a href={project.githubHref} target="_blank" rel="noreferrer" className="bay-cta-secondary">
              <i className="fab fa-github" aria-hidden="true" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
