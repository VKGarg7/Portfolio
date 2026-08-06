import { motion } from "framer-motion";
import type { CaseStudy } from "../../data/content";
import { DetailSectionHeading } from "./DetailSectionHeading";
import { pad2 } from "../../lib/format";

export function AuthFlowDiagram({ cs }: { cs: CaseStudy }) {
  return (
    <section id="auth" className="detail-section">
      <DetailSectionHeading label="AUTHENTICATION FLOW" title="Dual JWT + Google OAuth2, enforced at the edge." />

      <div className="auth-flow">
        {cs.authFlow.map((step, i) => (
          <motion.div
            key={step.action}
            className="auth-step"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="auth-step-index">{pad2(i + 1)}</span>
            <div className="auth-step-body">
              <span className="auth-step-actor mono-label">{step.actor}</span>
              <p>{step.action}</p>
            </div>
            {i < cs.authFlow.length - 1 && <span className="auth-step-arrow" aria-hidden="true" />}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
