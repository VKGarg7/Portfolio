import { motion } from "framer-motion";
import type { Project } from "../../data/content";

interface DetailFooterProps {
  project: Project;
  nextProject: Project | null;
  onSelectNext: (project: Project) => void;
}

export function DetailFooter({ project, nextProject, onSelectNext }: DetailFooterProps) {
  return (
    <section id="status" className="detail-section detail-footer">
      <motion.div
        className="status-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="status-panel-header">
          <span className="mono-label">PROJECT STATUS PANEL</span>
          <div className="detail-status-badge">
            <i className="detail-status-dot" /> {project.status}
          </div>
        </div>

        <div className="status-panel-grid">
          <div><span className="mono-label">VERSION</span><span>1.0.0</span></div>
          <div><span className="mono-label">LAST UPDATE</span><span>{project.timeline.at(-1)?.date ?? "—"}</span></div>
          <div><span className="mono-label">TECH STACK</span><span>{project.engine}</span></div>
          <div><span className="mono-label">SYSTEMS</span><span>{project.systems}</span></div>
        </div>

        <div className="status-panel-actions">
          <a href={project.liveHref} target="_blank" rel="noreferrer" className="bay-cta-primary">
            <span className="bay-cta-edge" aria-hidden="true" />
            <span className="bay-cta-light" aria-hidden="true" />
            <span className="bay-cta-content">
              <i className="fas fa-external-link-alt" aria-hidden="true" />
              {project.liveLabel}
            </span>
          </a>
          <a href={project.githubHref} target="_blank" rel="noreferrer" className="bay-cta-secondary">
            <i className="fab fa-github" aria-hidden="true" /> GitHub
          </a>
        </div>
      </motion.div>

      {nextProject && (
        <motion.button
          className="next-project-panel"
          onClick={() => onSelectNext(nextProject)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label">NEXT PROJECT</span>
          <strong>{nextProject.name}</strong>
          <span className="next-project-arrow"><i className="fas fa-arrow-right" /></span>
        </motion.button>
      )}
    </section>
  );
}
