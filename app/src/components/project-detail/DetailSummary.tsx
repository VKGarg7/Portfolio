import { motion } from "framer-motion";
import type { Project } from "../../data/content";

interface DetailSummaryProps {
  project: Project;
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function DetailSummary({ project }: DetailSummaryProps) {
  const cs = project.caseStudy;

  return (
    <section id="summary" className="detail-section detail-summary">
      <motion.div className="detail-section-heading" {...fadeUp}>
        <span className="mono-label">PROJECT SUMMARY</span>
        <h2>Built to run like production, not a demo.</h2>
      </motion.div>

      <div className="detail-summary-grid">
        <motion.div className="detail-summary-card" {...fadeUp}>
          <span className="mono-label">STATUS</span>
          <div className="detail-status-badge">
            <i className="detail-status-dot" /> {project.status}
          </div>
          <p>{project.engine}</p>
        </motion.div>

        <motion.div className="detail-summary-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
          <span className="mono-label">TIMELINE</span>
          <ul className="detail-summary-timeline">
            {project.timeline.map((step) => (
              <li key={step.label}>
                <span>{step.label}</span>
                <b>{step.date}</b>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="detail-summary-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
          <span className="mono-label">BACKEND STATS</span>
          <div className="detail-summary-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="detail-summary-card detail-summary-card-wide" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <span className="mono-label">DEPLOYMENT</span>
          <div className="detail-summary-deploy-badges">
            <span className="detail-deploy-badge"><i className="fas fa-docker" /> Docker</span>
            <span className="detail-deploy-badge"><i className="fas fa-cloud" /> Render</span>
            <span className="detail-deploy-badge"><i className="fas fa-bolt" /> Vercel</span>
          </div>
        </motion.div>
      </div>

      {cs && (
        <motion.div className="detail-chip-cloud" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
          <span className="mono-label">TECH STACK</span>
          <div className="detail-chip-row">
            {cs.stackChips.map((chip) => (
              <span key={chip.label} className={`detail-chip chip-${chip.category}`}>
                {chip.label}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
