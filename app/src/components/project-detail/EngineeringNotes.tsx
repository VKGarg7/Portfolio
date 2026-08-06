import { motion } from "framer-motion";
import type { CaseStudy } from "../../data/content";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" } as const,
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

export function PerformancePanel({ cs }: { cs: CaseStudy }) {
  return (
    <section id="performance" className="detail-section">
      <motion.div className="detail-section-heading" {...fadeUp}>
        <span className="mono-label">PERFORMANCE METRICS</span>
        <h2>Numbers that hold up at scale.</h2>
      </motion.div>
      <div className="perf-grid">
        {cs.performance.map((stat, i) => (
          <motion.div key={stat.label} className="perf-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
            <strong>{stat.value}</strong>
            <span className="mono-label">{stat.label}</span>
            <p>{stat.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function DecisionsPanel({ cs }: { cs: CaseStudy }) {
  return (
    <section id="decisions" className="detail-section">
      <motion.div className="detail-section-heading" {...fadeUp}>
        <span className="mono-label">ENGINEERING DECISIONS</span>
        <h2>Trade-offs made on purpose.</h2>
      </motion.div>
      <div className="decision-list">
        {cs.decisions.map((decision, i) => (
          <motion.div key={decision.title} className="decision-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
            <span className="decision-index mono-label">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <strong>{decision.title}</strong>
              <p>{decision.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function LessonsPanel({ cs }: { cs: CaseStudy }) {
  return (
    <section id="lessons" className="detail-section">
      <motion.div className="detail-section-heading" {...fadeUp}>
        <span className="mono-label">LESSONS LEARNED</span>
        <h2>What I'd carry into the next build.</h2>
      </motion.div>
      <div className="lessons-list">
        {cs.lessons.map((lesson, i) => (
          <motion.div key={lesson} className="lesson-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
            <i className="fas fa-lightbulb" aria-hidden="true" />
            <p>{lesson}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
