import { motion } from "framer-motion";
import type { CaseStudy } from "../../data/content";
import { DetailSectionHeading } from "./DetailSectionHeading";

const ICONS: Record<string, string> = {
  GitHub: "fa-github",
  "GitHub Actions": "fa-github",
  Render: "fa-cloud",
  Vercel: "fa-bolt",
  "Render / Vercel": "fa-satellite-dish",
};

export function DeployPipeline({ cs }: { cs: CaseStudy }) {
  return (
    <section id="deployment" className="detail-section">
      <DetailSectionHeading label="DEPLOYMENT PIPELINE" title="Push to main. Live minutes later." />

      <div className="deploy-pipeline">
        {cs.deployPipeline.map((step, i) => (
          <motion.div
            key={step.label}
            className={`deploy-step ${step.status}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="deploy-step-icon">
              <i className={`fab ${ICONS[step.system] ?? "fas fa-server"}`} />
              {step.status === "active" && <span className="deploy-step-pulse" />}
            </div>
            <span className="deploy-step-label">{step.label}</span>
            <span className="deploy-step-system mono-label">{step.system}</span>
            {i < cs.deployPipeline.length - 1 && (
              <span className="deploy-step-track" aria-hidden="true">
                <span className="deploy-step-flow" />
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
